import React, { Component } from 'react';
import { Button, Typography } from 'antd';

export class LearnView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            currentQuestion: 0,
            loaded: false,
            answered: false,
        };
        this.showAnswer = this.showAnswer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
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
        if (name === 'good') {
            console.log('good');
        } else if (name === 'average') {
            console.log('average');
        } else if (name === 'wrong') {
            console.log('wrong');
        }

        this.setState({
            answered: false,
        });
        this.nextQuestion();
    }

    componentDidMount() {
        fetch(`http://localhost:8000/api/questions/${this.props.match.params.collectionID}/`)
            .then(res => res.json())
            .then(res => this.setState({
                questions: res,
                loaded: true,
            }));
    }

    render() {
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
                {questionText}
                {answer}
                {buttons}
            </div>
        );
    }
}

export default LearnView;
