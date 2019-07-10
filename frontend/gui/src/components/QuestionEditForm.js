import React, { Component } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export class QuestionEditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionValue: '',
            isImageValue: false,
            imageSrcValue: '',
            answerValue: '',
            collectionID: props.collectionID,
            submitted: false,
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const question = event.target.elements.question.value;
        const isImage = event.target.elements.isImage.checked;
        const imageSrc = event.target.elements.imageSrc.value;
        const answer = event.target.elements.answer.value;
        axios.post('http://127.0.0.1:8000/api/questions/1/', {
            question,
            is_image: isImage,
            image_src: imageSrc,
            answer,
            collection: 1,
        })
            .then(res => console.log(res))
            .catch(error => console.log(error));

        this.setState({
            submitted: true,
        });
    }

    render() {
        let redirect;
        if (this.state.submitted) {
            redirect = <Redirect to="/collections/1" />;
        } else {
            redirect = null;
        }

        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <Form.Item label="Question" required="true">
                        <Input name="question" placeholder="Question" />
                    </Form.Item>
                    <Form.Item label="Is image?">
                        <Checkbox name="isImage" />
                    </Form.Item>
                    <Form.Item label="Image source: ">
                        <Input name="imageSrc" placeholder="Source" />
                    </Form.Item>
                    <Form.Item label="Answer">
                        <Input name="answer" placeholder="Answer" />
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
