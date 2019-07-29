import React, { Component } from 'react';
import { Card, Button, Popconfirm, Rate } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import QuestionList from './QuestionList';

export class CollectionDetail extends Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            collection: {},
            deleted: false,
        };
        this.handleCollectionDelete = this.handleCollectionDelete.bind(this);
        this.changeRating = this.changeRating.bind(this);
    }

    changeRating(event) {
        const data = {
            // eslint-disable-next-line quote-props
            'rating': event,
        };
        axios.put(`http://localhost:8000/api/collections/${this.props.match.params.collectionID}/rate/`, data);
    }

    handleCollectionDelete() {
        const collID = this.props.match.params.collectionID;
        const token = localStorage.getItem('token');
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        };
        axios.delete(`http://localhost:8000/api/collections/${collID}/`);
        this.setState({
            deleted: true,
        });
    }

    componentDidMount() {
        const collectionID = this.props.match.params.collectionID;
        // fetch(`http://localhost:8000/api/collections/${collectionID}`)
        //     .then(res => res.json())
        //     .then(res => this.setState({
        //         collection: res,
        //         loading: false,
        //     }));
        const token = localStorage.getItem('token');
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        };
        axios.get(`http://localhost:8000/api/collections/${collectionID}`)
            .then(res => this.setState({
                collection: res.data,
                loaded: true,
            }))
            .catch((err) => { console.log(err); });
    }

    render() {
        let redirect;
        if (this.state.deleted) {
            redirect = <Redirect to="/collections" />;
        } else {
            redirect = null;
        }

        let rate = null;
        if (this.state.loaded) {
            rate = (
                <div>
                    <Rate
                        defaultValue={this.state.collection.rating}
                        onChange={this.changeRating}
                        count={10} />
                    Votes: {this.state.collection.ratings_count}
                </div>
            );
        }
        console.log(this.state.collection.rating);

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
                    {rate}
                    {/* <p>Lorem ipsum</p> */}
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
