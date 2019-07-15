import React, { Component } from 'react';
import { Form, Icon, Input, Button, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

export class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onAuth(values.username, values.password);
            }
        });
        this.props.history.push('/');
    }

    render() {
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }
        const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                {errorMessage}
                {this.props.loading ?
                    <Spin indicator={antIcon} />
                    :
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username" />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password" />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                                Log In
                            </Button>
                            Or
                            <Link to="/register">
                                <Button type="link">Sign Up</Button>
                            </Link>
                        </Form.Item>
                    </Form>
                }
            </div>
        );
    }
}

const WrappedLoginForm = Form.create({ name: 'login_form' })(LoginForm);

const mapStateToProps = state => ({
    loading: state.loading,
    error: state.error,
});

const mapDispatchToProps = dispatch => ({
    onAuth: (username, password) => dispatch(actions.authLogin(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WrappedLoginForm);
