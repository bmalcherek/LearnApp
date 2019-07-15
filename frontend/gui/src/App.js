import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

import 'antd/dist/antd.css';
import Layout from './containers/Layout';
import BaseRouter from './routes';
import * as actions from './store/actions/auth';


class App extends Component {
    state = { loading: false };

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <Layout {...this.props}>
                        <BaseRouter />
                    </Layout>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.token !== null,
});

const mapDispatchToProps = dispatch => ({
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
