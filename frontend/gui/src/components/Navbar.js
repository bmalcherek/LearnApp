import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}>
                <Menu.Item key="1">
                    <Link to="/">
                        Home
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
        </div>
    );
}
