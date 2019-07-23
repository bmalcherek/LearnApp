import React, { Component } from 'react';
import { List, Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class CollectionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
        this.addCollection = this.addCollection.bind(this);
    }

    addCollection(event) {
        const collectionId = event.target.id;
        const data = {
            collection: collectionId,
        };
        axios.post('http://localhost:8000/api/my-collections/', data);
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        };
        if (this.props.myCollections) {
            axios.get('http://localhost:8000/api/my-collections/')
                .then(res => this.setState({
                    data: res.data,
                }))
                .catch(err => console.log(err));
        } else {
            axios.get('http://localhost:8000/api/collections/')
                .then(res => this.setState({
                    data: res.data,
                }));
        }
    }

    render() {
        let createNewCollectionButton = null;
        if (!this.props.myCollections) {
            createNewCollectionButton = (
                <Link to="collections/create-new-collection">
                    <Button>Create new Collection</Button>
                </Link>
            );
        }

        return (
            <div>
                {createNewCollectionButton}
                <List
                    itemLayout="horizontal"
                    pagination={{
                        pageSize: 3,
                    }}
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item actions={[this.props.myCollections ?
                            <Link to={`collections/${item.id}/learn`}>
                                <Button>Learn</Button>
                            </Link>
                        :
                            <Button onClick={this.addCollection} id={item.id}>Add to My Collections</Button>]}>
                            <List.Item.Meta
                                title={<a href={`/collections/${item.id}`}>{item.name}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team" />
                        </List.Item>
                    )} />
            </div>
        );
    }
}

export default CollectionList;
