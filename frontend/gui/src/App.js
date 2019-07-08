import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import Layout from './containers/Layout';
import BaseRouter from './routes';


class App extends Component {
    state = { loading: false };

    render() {
        return (
            <div className="App">
                <Router>
                    <Layout>
                        <BaseRouter />
                    </Layout>
                </Router>
            </div>
        );
    }
}

export default App;
