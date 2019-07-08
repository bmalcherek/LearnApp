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
        fetch('http://localhost:8000/api/')
            .then(response => response.json())
            .then(res => this.setState({
                data: res,
            }));
    }

    // onChange = (page) => {
    //     console.log(page);
    // }

    render() {
        return (
            <div>
                <List
                    itemLayout="horizontal"
                    // pagination={{
                    //     onChange: this.onChange,
                    //     pageSize: 3,
                    // }}
                    pagination={{
                        pageSize: 3,
                    }}
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a href="https://ant.design">{item.name}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team" />
                        </List.Item>
                    )} />
            </div>
        );
    }
}

export default CollectionList;
