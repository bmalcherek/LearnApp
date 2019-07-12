import React, { Component } from 'react';
import { Button, Typography, Progress } from 'antd';

import LearnSummary from './LearnSummary';

export class LearnView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            questionsStats: [],
            currentQuestion: 0,
            loaded: false,
            answered: false,
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
            console.log('End of questions');
        }
    }

    handleSubmit(event) {
        const name = event.target.name;
        const originalIndex = this.state.questions[this.state.currentQuestion].originalIndex;
        const newStats = this.state.questionsStats;

        if (name === 'good') {
            console.log('good');
            newStats[originalIndex].good += 1;
        } else if (name === 'average') {
            console.log('average');
            newStats[originalIndex].average += 1;
            this.setState(prevState => ({
                questions: [...prevState.questions, prevState.questions[prevState.currentQuestion]],
            }));
        } else if (name === 'wrong') {
            console.log('wrong');
            newStats[originalIndex].wrong += 1;
            this.setState(prevState => ({
                questions: [...prevState.questions, prevState.questions[prevState.currentQuestion]],
            }));
        }

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
                good: 0,
                average: 0,
                wrong: 0,
            });
        });

        this.setState({
            questions: newQuestions,
            questionsStats: stats,
            loaded: true,
        });
    }

    componentDidMount() {
        fetch(`http://localhost:8000/api/questions/${this.props.match.params.collectionID}/`)
            .then(res => res.json())
            .then(res => this.addOriginalIndex(res));
        // fetch(`http://localhost:8000/api/questions/${this.props.match.params.collectionID}/`)
        //     .then(res => res.json())
        //     .then(res => this.setState({
        //         questions: res,
        //         loaded: true,
        //     }));
    }

    render() {
        console.log(this.state);
        let question = null;
        let questionText = null;
        if (this.state.loaded) {
            question = this.state.questions[this.state.currentQuestion];
            questionText = <Typography.Title level={2}>{question.question}</Typography.Title>;
        }

        let answer;
        if (this.state.answered) {
            answer = <Typography.Title level={3}>{question.answer}</Typography.Title>;
        } else {
            answer = null;
        }

        let buttons;
        if (!this.state.answered) {
            buttons = <Button onClick={this.showAnswer}>Show Answer</Button>;
        } else {
            buttons = (
                <div>
                    <Button type="primary" name="good" onClick={this.handleSubmit}>Good</Button>
                    <Button className="average" name="average" onClick={this.handleSubmit}>Average</Button>
                    <Button type="danger" name="wrong" onClick={this.handleSubmit}>Wrong!</Button>
                </div>
            );
        }

        return (
            <div>
                <Progress
                    strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068' }}
                    percent={Number(((this.state.currentQuestion / this.state.questions.length) * 100).toFixed(2))} />
                {questionText}
                {answer}
                {buttons}
                <LearnSummary successPercent={100} />
            </div>
        );
    }
}

export default LearnView;
