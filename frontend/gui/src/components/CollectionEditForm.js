import React, { Component } from 'react';
import { Form, Button, Input } from 'antd';
import axios from 'axios';

export class CollectionEditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            collectionName: '',
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
        const name = this.state.collectionName;

        const collection = {
            name,
        };

        axios.post('http://localhost:8000/api/collections/', collection);
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <Form.Item label="Collection Name">
                        <Input name="collectionName" placeholder="Name" value={this.state.collectionName} onChange={this.onChange} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default CollectionEditForm;
