import React, { Component } from 'react';
import moment from 'moment';
import { Row, Col } from 'antd';

export default class ProfileComponent extends Component {
    transferValue(value, type) {
        if (!value) { return null; }
        if (type === 'date') {
            return moment(value).format('YYYY-MM-DD');
        }
        return value;
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
        
        let fontSize = 12;

        return <div style={{ ...this.props.style, fontSize }}>{ 
            profile_rows.map((row, index) => {
                let contain_property_count = row.length;
                let property_span = Math.floor(24 / contain_property_count);
                return <Row key={ index } style={{ marginBottom: 18 }}> {
                    row.map(property => <Col key={ property.index } span={ property_span }>
                        <label style={{
                            fontWeight: 500,
                            fontSize,
                            paddingLeft: (maxLabelLength - property.name.length) * fontSize,
                            paddingRight: fontSize
                            }}>{ property.name } : </label>
                        {
                            this.transferValue(
                                this.props.dataSource[property.index],
                                property.type
                            )
                        }
                    </Col>)
                } </Row>
            })
        }</div>
    }
}