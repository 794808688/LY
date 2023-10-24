import { Avatar, Badge, Dropdown, List, Menu, Popover, Tabs } from 'antd';
import React, { memo } from 'react'
import { BellOutlined } from '@ant-design/icons'
import './BadgeDropdown.scss'
function BadgeDropdown(props: any) {
    const data = [
        {
            title: '你收到了14份新周报',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];
    const content = (
        <div className="BadgeDropdown-tabs">
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab={`通知（${data.length}）`} key="1">
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        style={{height:300,overflow:'auto'}}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                    title={<a href="">{item.title}</a>}
                                    description="5年前"
                                />
                            </List.Item>
                        )}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane tab={`消息（${data.length}）`} key="2">
                <List
                        itemLayout="horizontal"
                        dataSource={data}
                        style={{height:300,overflow:'auto'}}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                    title={<a href="">{item.title}</a>}
                                    description="2年前"
                                />
                            </List.Item>
                        )}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane tab={`代办（${data.length}）`} key="3">
                <List
                        itemLayout="horizontal"
                        dataSource={data}
                        style={{height:300,overflow:'auto'}}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                    title={<a href="">{item.title}</a>}
                                    description="1年前"
                                />
                            </List.Item>
                        )}
                    />
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
    return (
        <div className="BadgeDropdown">
            <Popover content={content} placement="bottomRight" mouseLeaveDelay={0.5} style={{ width: 300, height: 300 }}>
                <Badge count={3} overflowCount={99}>
                    <BellOutlined style={{ fontSize: 25 }} className="layout__navbar__menu-item--dark" />
                </Badge>
            </Popover>
        </div>
    )
}

export default memo(BadgeDropdown);