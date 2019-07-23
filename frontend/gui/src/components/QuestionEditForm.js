import React, { Component } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export class QuestionEditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            isImage: false,
            imageSrc: '',
            answer: '',
            collectionID: props.collectionID,
            submitted: false,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        if (this.props.edit) {
            const collID = this.props.match.params.collectionID;
            const questID = this.props.match.params.questionID;
            const token = localStorage.getItem('token');
            axios.defaults.headers = {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            };
            axios.get(`http://localhost:8000/api/questions/${collID}/${questID}`)
                .then(res => this.setState({
                    question: res.data.question,
                    isImage: res.data.is_image,
                    imageSrc: res.data.image_src,
                    answer: res.data.answer,
                }));
        }
    }

    onChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    onSubmit(event) {
        event.preventDefault();
        const question = event.target.elements.question.value;
        const isImage = event.target.elements.isImage.checked;
        const imageSrc = event.target.elements.imageSrc.value;
        const answer = event.target.elements.answer.value;
        const collID = this.props.match.params.collectionID;

        const q = {
            question,
            is_image: isImage,
            image_src: imageSrc,
            answer,
            collection: collID,
        };

        const token = localStorage.getItem('token');
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        };
        if (this.props.edit) {
            const questID = this.props.match.params.questionID;
            axios.put(`http://127.0.0.1:8000/api/questions/${collID}/${questID}`, q);
        } else {
            axios.post(`http://127.0.0.1:8000/api/questions/${collID}/`, q)
                .then(res => console.log(res))
                .catch(error => console.log(error));
        }

        this.setState({
            submitted: true,
        });
    }

    render() {
        let redirect;
        if (this.state.submitted) {
            redirect = <Redirect to={{ pathname: `/collections/${this.props.match.params.collectionID}`, state: 'refresh' }} />;
        } else {
            redirect = null;
        }

        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <Form.Item label="Question" required="true">
                        <Input name="question" placeholder="Question" value={this.state.question} onChange={this.onChange} />
                    </Form.Item>
                    <Form.Item label="Is image?">
                        <Checkbox name="isImage" value={this.state.isImage} onChange={this.onChange} />
                    </Form.Item>
                    <Form.Item label="Image source: ">
                        <Input name="imageSrc" placeholder="Source" value={this.state.imageSrc} onChange={this.onChange} />
                    </Form.Item>
                    <Form.Item label="Answer">
                        <Input name="answer" placeholder="Answer" value={this.state.answer} onChange={this.onChange} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                {redirect}
            </div>
        );
    }
}

export default QuestionEditForm;
