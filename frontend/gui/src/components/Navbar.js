import React, { Component } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

export class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    render() {
        let login = (<Menu.Item key="2">
            <Link to="/login">
                Log In
            </Link>
        </Menu.Item>);

        if (this.props.isAuth) {
            login = <Menu.Item key="2" onClick={this.props.logout}>Log Out</Menu.Item>;
        }

        return (
            <div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{ lineHeight: '64px' }}>
                    <Menu.Item key="1">
                        <Link to="/">
                            Collections
                        </Link>
                    </Menu.Item>
                    {login}
                </Menu>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(actions.logout()),
});

export default connect(null, mapDispatchToProps)(Navbar);
