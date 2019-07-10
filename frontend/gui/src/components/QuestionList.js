import React, { Component } from 'react';
import { List, Avatar } from 'antd';

export class QuestionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            collID: props.collectionID,
        };
    }

    componentDidMount() {
        fetch(`http://localhost:8000/api/questions/${this.props.collectionID}`)
            .then(response => response.json())
            .then(res => this.setState({
                data: res,
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
                                title={<a href={`/${this.props.collectionID}/${item.id}`}>{item.question}</a>}
                                // description={item.answer} />
                                description={this.props.collectionID} />
                        </List.Item>
                    )} />
            </div>
        );
    }
}

export default QuestionList;
