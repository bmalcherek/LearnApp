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
        const { Meta } = Card;
        let card;
        if (this.state.question.is_image) {
            card = (<Card
                style={{ width: 300 }}
                cover={
                    <img
                        alt="example"
                        src={this.state.question.image_src} />}>
                <Meta title={this.state.question.question} description={this.state.question.answer} />
            </Card>);
        } else {
            card = (<Card title={this.state.question.question}>
                <p>{this.state.question.answer}</p>
            </Card>);
        }

        return (
            <div>
                {card}
            </div>
        );
    }
}

export default QuestionDetail;
