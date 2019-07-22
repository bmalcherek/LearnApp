import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import axios from 'axios';

export class QuestionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            collectionID: props.collectionID,
        };
    }

    componentDidMount() {
        const collectionID = this.props.collectionID;
        // fetch(`http://localhost:8000/api/questions/${this.props.collectionID}`)
        //     .then(response => response.json())
        //     .then(res => this.setState({
        //         data: res,
        //     }));
        const token = localStorage.getItem('token');
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        };
        axios.get(`http://localhost:8000/api/questions/${collectionID}`)
            .then(res => this.setState({
                data: res.data,
            }));
    }

    render() {
        return (
            <div>
                <List
                    itemLayout="horizontal"
                    pagination={{
                        pageSize: 3,
                    }}
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a href={`/collections/${this.props.collectionID}/${item.id}`}>{item.question}</a>}
                                // description={item.answer} />
                                description={this.props.collectionID} />
                        </List.Item>
                    )} />
            </div>
        );
    }
}

export default QuestionList;
