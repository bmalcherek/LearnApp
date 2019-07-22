import React, { Component } from 'react';
import { Card, Button, Popconfirm } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

export class QuestionDetail extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            question: [],
            deleted: false,
        };
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        const collectionID = this.props.match.params.collectionID;
        const questionID = this.props.match.params.questionID;
        const token = localStorage.getItem('token');
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        };
        axios.delete(`http://localhost:8000/api/questions/${collectionID}/${questionID}`);
        this.setState({
            deleted: true,
        });
        this.props.history.push('/');
    }

    componentDidMount() {
        const collectionID = this.props.match.params.collectionID;
        const questionID = this.props.match.params.questionID;
        // fetch(`http://localhost:8000/api/questions/${collectionID}/${questionID}`)
        //     .then(res => res.json())
        //     .then(res => this.setState({
        //         question: res,
        //         loading: false,
        //     }));
        const token = localStorage.getItem('token');
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        };
        axios.get(`http://localhost:8000/api/questions/${collectionID}/${questionID}`)
            .then(res => this.setState({
                question: res.data,
                loading: false,
            }))
            .catch((err) => { console.log(err); });
    }

    render() {
        let redirect;
        if (this.state.deleted) {
            redirect = <Redirect to={`/collections/${this.props.match.params.collectionID}`} />;
        } else {
            redirect = null;
        }

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
                <Link to={`${this.props.match.params.questionID}/edit-question`}>
                    <Button>Edit Question</Button>
                </Link>
                <Popconfirm
                    title="Are you sure delete this question?"
                    onConfirm={this.handleDelete}>
                    <Button type="danger">Delete Question</Button>
                </Popconfirm>
                {card}
                {/* <img alt="" src="https://images.newschoolers.com/images/17/00/76/80/14/768014.jpg" /> */}
                {redirect}
            </div>
        );
    }
}

export default QuestionDetail;
