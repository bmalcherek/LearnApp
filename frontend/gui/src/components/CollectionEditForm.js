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

        if (this.props.edit) {
            axios.put(`http://localhost:8000/api/collections/${this.props.match.params.collectionID}/`, collection);
        } else {
            axios.post('http://localhost:8000/api/collections/', collection);
        }
    }

    componentDidMount() {
        if (this.props.edit) {
            fetch(`http://localhost:8000/api/collections/${this.props.match.params.collectionID}`)
                .then(res => res.json())
                .then(res => this.setState({
                    collectionName: res.name,
                }));
        }
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
