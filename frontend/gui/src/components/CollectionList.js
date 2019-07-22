import React, { Component } from 'react';
import { List, Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class CollectionList extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
        };
        // this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        };
        axios.get('http://localhost:8000/api/collections/')
            .then((res) => {
                console.log(res);
                return res;
            })
            // .then(response => response.json())
            .then(res => this.setState({
                data: res.data,
            }));
        axios.get('http://localhost:8000/api/user/')
            .then((res) => {
                console.log(res);
                return res;
            });
    }

    render() {
        return (
            <div>
                <Link to="collections/create-new-collection">
                    <Button>Create new Collection</Button>
                </Link>
                <List
                    itemLayout="horizontal"
                    pagination={{
                        pageSize: 3,
                    }}
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<a href={`/collections/${item.id}`}>{item.name}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team" />
                            <Link to={`collections/${item.id}/learn`}>
                                <Button>Learn</Button>
                            </Link>
                        </List.Item>
                    )} />
            </div>
        );
    }
}

export default CollectionList;
