import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

class SignInComponent extends Component {
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((error, values) => {
            if (!error) {
                this.props.onSubmit(values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return <Form onSubmit={ this.handleSubmit }>
        <Form.Item>
            {getFieldDecorator('username', {
                rules: [
                    { required: true, message: '请输入用户名' }
                ]
            })( <Input prefix={ <Icon type="user" style={{ fontSize: 13 }} /> } placeholder="用户名" /> )}
        </Form.Item>
        <Form.Item>
            {getFieldDecorator('password', {
                rules: [
                    { required: true, message: '请输入密码' }
                ]
            })( <Input prefix={ <Icon type="lock" style={{ fontSize: 13 }} /> } placeholder="密码" /> )}
        </Form.Item>
        <Form.Item>
            {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
            })( <Checkbox>记住我</Checkbox> )}
            <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
        </Form.Item>

    </Form>;
    }
}

export default Form.create()(SignInComponent);