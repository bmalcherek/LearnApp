/* eslint-disable quote-props */
import React, { Component } from 'react';
import { Button, Typography, Progress, Tooltip } from 'antd';
import axios from 'axios';

import LearnSummary from './LearnSummary';
// import SubMenu from 'antd/lib/menu/SubMenu';

export class LearnView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            questionsStats: [],
            currentQuestion: 0,
            loaded: false,
            answered: false,
            finished: false,
        };
        this.showAnswer = this.showAnswer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.addOriginalIndex = this.addOriginalIndex.bind(this);
    }

    showAnswer() {
        this.setState({
            answered: true,
        });
    }

    nextQuestion() {
        if (this.state.currentQuestion + 1 <= this.state.questions.length - 1) {
            this.setState(prevState => ({
                currentQuestion: prevState.currentQuestion + 1,
            }));
        } else {
            this.setState({
                finished: true,
            });
        }
    }

    handleSubmit(event) {
        // TODO: fix finishing learning after wrong or average last answer
        const name = event.target.name;
        const originalIndex = this.state.questions[this.state.currentQuestion].originalIndex;
        const newStats = this.state.questionsStats;
        const collectionID = this.props.match.params.collectionID;
        const questionIndex = this.state.questions[originalIndex].id;
        const token = localStorage.getItem('token');
        let q;

        if (name === 'great') {
            newStats[originalIndex].great += 1;
            q = 5;
        } else if (name === 'good') {
            newStats[originalIndex].good += 1;
            q = 4;
        } else if (name === 'average') {
            newStats[originalIndex].average += 1;
            this.setState(prevState => ({
                questions: [...prevState.questions, prevState.questions[prevState.currentQuestion]],
            }));
            q = 3;
        } else if (name === 'bad') {
            newStats[originalIndex].bad += 1;
            this.setState(prevState => ({
                questions: [...prevState.questions, prevState.questions[prevState.currentQuestion]],
            }));
            q = 2;
        } else if (name === 'veryBad') {
            newStats[originalIndex].veryBad += 1;
            this.setState(prevState => ({
                questions: [...prevState.questions, prevState.questions[prevState.currentQuestion]],
            }));
            q = 1;
        } else if (name === 'wrong') {
            newStats[originalIndex].wrong += 1;
            this.setState(prevState => ({
                questions: [...prevState.questions, prevState.questions[prevState.currentQuestion]],
            }));
            q = 0;
        }
        newStats[originalIndex].sum += 1;

        const data = {
            q,
        };

        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        };
        axios.put(`http://localhost:8000/api/my-questions/${collectionID}/${questionIndex}/`, data);

        this.setState({
            answered: false,
            questionsStats: newStats,
        });

        this.nextQuestion();
    }

    addOriginalIndex(res) {
        const oldQuestions = res;
        const newQuestions = [];
        const stats = [];
        oldQuestions.forEach((element, index) => {
            // eslint-disable-next-line no-param-reassign
            element.originalIndex = index;
            newQuestions.push(element);
            stats.push({
                great: 0,
                good: 0,
                average: 0,
                bad: 0,
                veryBad: 0,
                wrong: 0,
                sum: 0,
            });
        });

        this.setState({
            questions: newQuestions,
            questionsStats: stats,
            loaded: true,
        });
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        const collectionID = this.props.match.params.collectionID;
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        };
        axios.get(`http://localhost:8000/api/my-questions/${collectionID}/`)
            .then(res => this.addOriginalIndex(res.data));
    }

    render() {
        // console.log(this.state);
        let question = null;
        let questionText = null;
        if (this.state.loaded && !this.state.finished) {
            question = this.state.questions[this.state.currentQuestion];
            questionText = <Typography.Title level={2}>{question.question}</Typography.Title>;
        }

        let answer;
        if (this.state.answered && !this.state.finished) {
            answer = <Typography.Title level={3}>{question.answer}</Typography.Title>;
        } else {
            answer = null;
        }

        let buttons = null;
        if (!this.state.answered && !this.state.finished) {
            buttons = <Button onClick={this.showAnswer}>Show Answer</Button>;
        } else if (!this.state.finished) {
            buttons = (
                <div>
                    <Button name="great" onClick={this.handleSubmit}>Great</Button>
                    <Button name="good" onClick={this.handleSubmit}>Good</Button>
                    <Button className="average" name="average" onClick={this.handleSubmit}>Average</Button>
                    <Button name="bad" onClick={this.handleSubmit}>Bad</Button>
                    <Button name="veryBad" onClick={this.handleSubmit}>Very Bad</Button>
                    <Button name="wrong" onClick={this.handleSubmit}>Wrong!</Button>
                </div>
            );
        }

        let learnSummary = null;
        let finishPct = 0;
        let title = null;
        if (this.state.finished) {
            learnSummary = <LearnSummary successPercent={100} questionsStats={this.state.questionsStats} />;
            finishPct = 100;
            title = `${this.state.questions.length} done / ${this.state.questions.length} total`;
        } else {
            finishPct = Number(((this.state.currentQuestion / this.state.questions.length) * 100).toFixed(2));
            title = `${this.state.currentQuestion} done / ${this.state.questions.length} total`;
        }


        return (
            <div>
                <Tooltip title={title}>
                    <Progress
                        strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068' }}
                        percent={finishPct} />
                </Tooltip>
                {questionText}
                {answer}
                {buttons}
                {learnSummary}
            </div>
        );
    }
}

export default LearnView;
