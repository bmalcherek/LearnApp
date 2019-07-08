import React, { Component } from 'react';
import { Layout } from 'antd';

import Navbar from '../components/Navbar';
import CollectionList from '../components/CollectionList';

const { Header, Content, Footer } = Layout;

export class CustomLayout extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
        };
    }
    render() {
        return (
            <div>
                <Layout className="layout">
                    <Header>
                        <Navbar />
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <div style={{ background: '#fff', padding: 24, minHeight: 280, marginTop: 24 }}>
                            <CollectionList />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </div>
        );
    }
}

export default CustomLayout;
