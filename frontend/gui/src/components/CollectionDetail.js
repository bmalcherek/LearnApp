import React, { Component } from 'react';
import { Card } from 'antd';

import QuestionList from './QuestionList';

export class CollectionDetail extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            collection: {},
        };
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
        return (
            <div>
                <Card title={this.state.collection.name}>
                    <p>Lorem ipsum</p>
                </Card>
                <br />
                <QuestionList collectionID={this.props.match.params.collectionID} />
            </div>
        );
    }
}

export default CollectionDetail;
