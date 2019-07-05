import React, { Component } from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import Navbar from './containers/Navbar';


class App extends Component {
    state = { loading: false };

    render() {
        return (
            <div className="App">
                <Navbar />
            </div>
        );
    }
}

export default App;
