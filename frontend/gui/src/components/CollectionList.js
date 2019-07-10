import React, { Component } from 'react';
import { List, Avatar } from 'antd';

export class CollectionList extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
        };
        // this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:8000/api/collections/')
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
                                title={<a href={`/collections/${item.id}`}>{item.name}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team" />
                        </List.Item>
                    )} />
            </div>
        );
    }
}

export default CollectionList;
