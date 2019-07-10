import React, { Component } from 'react';
import { Card } from 'antd';

export class QuestionDetail extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            question: [],
        };
    }

    componentDidMount() {
        const collectionID = this.props.match.params.collectionID;
        const questionID = this.props.match.params.questionID;
        fetch(`http://localhost:8000/api/questions/${collectionID}/${questionID}`)
            .then(res => res.json())
            .then(res => this.setState({
                question: res,
                loading: false,
            }));
    }

    render() {
        return (
            <div>
                <Card title={this.state.question.question}>
                    <p>{this.state.question.answer}</p>
                </Card>
            </div>
        );
    }
}

export default QuestionDetail;
