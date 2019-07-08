import React, { Component } from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import Layout from './containers/Layout';


class App extends Component {
    state = { loading: false };

    render() {
        return (
            <div className="App">
                <Layout />
            </div>
        );
    }
}

export default App;
