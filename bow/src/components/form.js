import React, { Component } from 'react';
import moment from 'moment';
import { Modal, Form, Input, Select, DatePicker, Cascader, Row, Col, Radio, Button, Rate, InputNumber } from 'antd';

class FormComponent extends Component {

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (err) return;

            this.props.onSubmit(values);
        });
    }

    transferValue(value, type) {
        if (type === 'date') {
            return moment(value);
        }
        else {
            return value;
        }
    }

    render() {
        let profile_rows = [];
        let row_count = 0;
        let machine_state = 'unknow';
        let memory_group = -1;
        let group_member = 0;
        let maxLabelLength = 0;

        this.props.fields.forEach(item => {
            if (item.group === undefined) {
                item.group = 1;
            }
            if (item.type === undefined) {
                item.type = 'input';
            }
            if (item.rules === undefined) {
                item.rules = []
            }

            if (machine_state === 'unknow') {
                memory_group = item.group;
                group_member = 1;
                machine_state = 'know';

                profile_rows.push([]);
                row_count++;
            }
            else if (machine_state === 'know') {
                if (memory_group === item.group) {
                    group_member++;
                }
                else {
                    profile_rows.push([]);
                    row_count++;
                }
            }
            
            profile_rows[row_count - 1].push({ ...item });
            if (item.name.length > maxLabelLength) {
                maxLabelLength = item.name.length;
            }

            if (memory_group === group_member) {
                machine_state = 'unknow';
                group_member = 0;
                memory_group = -1;
            }
        });
        
        return <Form style={{ ...this.props.style, fontSize: 18 }} onSubmit={ this.handleSubmit }>{ 
            profile_rows.map((row, index) => {
                let contain_property_count = row.length;
                let property_span = Math.floor(24 / contain_property_count) - 1;
                return <Row key={ index } style={{ marginBottom: 0 }}> {
                    row.map(property => <Col
                        key={ property.index }
                        span={ property_span }
                        pull={ 1 }
                        offset={ 1 }>
                        <Form.Item
                            label={ property.name }
                            hasFeedback
                            wrapperCol={{ xs: { span: 24 }, sm: { span: 24 } }}>
                            {this.props.form.getFieldDecorator(property.index, {
                                rules: property.rules,
                                initialValue: this.props.dataSource
                                    ? this.transferValue(
                                        this.props.dataSource[property.index],
                                        property.type)
                                    : null
                            })(
                                (() => {
                                    switch (property.type) {
                                        case 'input': return <Input placeholder={ property.message } />;
                                        case 'select': return <Select placeholder={ property.message }>
                                            { property.options.map(opt => <Select.Option
                                                value={ opt.value }
                                                style={{ width: '100%' }}
                                                key={ opt.key ? opt.key : opt.value }>
                                                    { opt.name ? opt.name : opt.value }
                                                </Select.Option>)  }
                                        </Select>;
                                        case 'date': return <DatePicker
                                            style={{ width: '100%' }}
                                            placeholder={ property.message }
                                            format="YYYY-MM-DD"
                                        />;
                                        case 'cascader': return <Cascader
                                            options={ property.options }
                                            expandTrigger="hover"
                                            placeholder={ property.message }
                                        />;
                                        case 'textarea': return <Input
                                            type="textarea"
                                            rows={ 5 }
                                            placeholder={ property.message }
                                        />;
                                        case 'radio': return <Radio.Group>
                                            { property.options.map(opt => <Radio
                                                key={ opt.key ? opt.key : opt.value }
                                                value={ opt.value }>
                                                    { opt.name ? opt.name : opt.value }
                                                </Radio>) }
                                        </Radio.Group>
                                        case 'rate': return <Rate allowHalf />
                                        case 'money': return <InputNumber
                                            style={{ width: '100%' }}
                                            step={ 0.01 }
                                            formatter={ value => `￥ ${value}` }
                                            parser={ value => parseFloat(value.replace(/￥| /, '')) }
                                        />
                                        default: return <Input placeholder={ property.message } />;
                                    }
                                })()
                            )}
                        </Form.Item>
                    </Col>)
                } </Row>
            })}
            <Form.Item>
                <Button type="primary" htmlType="submit">{ this.props.submitText ? this.props.submitText : '提交' }</Button>
            </Form.Item>
        </Form>;
    }
}

export const CommonForm = Form.create()(FormComponent);

export class ModalForm extends Component {
    render() {
        return <Modal
            visible={ this.props.visible }
            footer={ null }
            onCancel={ () => this.setState({ visible: false }) }>
            <CommonForm { ...this.props } />
        </Modal>
    }
}