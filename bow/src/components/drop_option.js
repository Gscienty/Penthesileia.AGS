import React, { Component } from 'react'
import { Menu, Dropdown, Button, Icon } from 'antd';

export default class DropOption extends Component {
    state = {}
    render() {
        return <Dropdown overlay={
                <Menu onClick={ this.props.onMenuClick }>
                    { this.props.menuOptions.map(item => <Menu.Item key={ item.key }>{ item.name }</Menu.Item>)
                    }
                </Menu>
            }>
            <Button style={{ border: 'none' }}> <Icon type="bars" /> </Button>
        </Dropdown>;
    }
}