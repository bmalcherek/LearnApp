import React, { Component } from 'react';
import { Card, Button, Popconfirm } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import QuestionList from './QuestionList';

export class CollectionDetail extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            collection: {},
            deleted: false,
        };
        this.handleCollectionDelete = this.handleCollectionDelete.bind(this);
    }

    handleCollectionDelete() {
        const collID = this.props.match.params.collectionID;
        axios.delete(`http://localhost:8000/api/collections/${collID}/`);
        this.setState({
            deleted: true,
        });
    }

    componentDidMount() {
        const collectionID = this.props.match.params.collectionID;
        this.state.loading = true;
        fetch(`http://localhost:8000/api/collections/${collectionID}`)
            .then(res => res.json())
            .then(res => this.setState({
                collection: res,
                loading: false,
            }));
    }

    render() {
        let redirect;
        if (this.state.deleted) {
            redirect = <Redirect to="/collections" />;
        } else {
            redirect = null;
        }

        return (
            <div>
                <Link to={`${this.props.match.params.collectionID}/edit-collection`}>
                    <Button>Edit Collection</Button>
                </Link>

                <Popconfirm
                    title="Are you sure delete this collection? It will automatically delete all the questions inside this collection."
                    onConfirm={this.handleCollectionDelete}>
                    <Button type="danger">Delete Collection</Button>
                </Popconfirm>

                <Card title={this.state.collection.name}>
                    <p>Lorem ipsum</p>
                </Card>
                <br />
                <Link to={`${this.props.match.params.collectionID}/create-new-question`}>
                    <Button>
                        Create new question
                    </Button>
                </Link>
                <QuestionList collectionID={this.props.match.params.collectionID} />
                {redirect}
            </div>
        );
    }
}

export default CollectionDetail;
