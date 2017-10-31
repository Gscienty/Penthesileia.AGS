import React, { Component } from 'react';
import { Layout, Icon, Row, Col, Breadcrumb } from 'antd';

export default class LayoutComponent extends Component {
    state = {
        collapsed: false
    };
    toggle = () => {
        this.setState({ collapsed: !this.state.collapsed });
    }

    render() {
        const { Header, Footer, Sider, Content } = Layout;
        return <Layout style={{ minHeight: window.innerHeight, zIndex: 100 }}>
            <Sider
                toggle={ null }
                collapsible
                collapsed={this.state.collapsed}>{ this.props.sider }</Sider>
            <Layout>
                <Header style={{
                    background: '#ffffff',
                    position: 'fixed',
                    width: '100%',
                    boxShadow: '0px 1px 2px #cccccc',
                    zIndex: 2
                }}>
                    <Row>
                        <Col span={ 1 }>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={ this.toggle } />
                        </Col>
                        <Col span={ 22 }>
                            { this.props.header }
                        </Col>
                    </Row>
                </Header>
                <Content>
                    {
                        this.props.steps
                        ?  (
                                <div style={{ marginTop: '72px', padding: '0 20px' }}>
                                    <Breadcrumb>
                                        {
                                            this.props.steps.map(item =>
                                                <Breadcrumb.Item
                                                    key={ item.title }
                                                    onClick={ item.path ? (() => this.props.history.push(item.path)) : null }>
                                                    { item.icon ? <Icon type={ item.icon } /> : null }
                                                    { item.title ? <span>{ item.title }</span> : null }
                                                </Breadcrumb.Item>)
                                        }
                                    </Breadcrumb>
                                </div>
                            )
                        : null
                    }
                    <div style={{
                        background: '#ffffff',
                        width: 'calc(100% - 24px)',
                        margin: '5px auto',
                        padding: 20,
                        minHeight: `calc(100vh - 144px)`,
                        overflow: 'auto',
                        overflowX: 'auto'
                    }}>{ this.props.children }</div>
                </Content>
                <Footer>{ this.props.footer }</Footer>
            </Layout>
        </Layout>;
    }
}