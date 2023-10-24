import { Divider, Layout } from 'antd'
import * as React from 'react'
const { Header, Footer, Sider, Content } = Layout;
import './index.scss'

export default function Layoufourdiv(props: any) {
    return (
        <div className='components-layoufourdiv'>
            <div className={`PageWrap ${props.PageWrap=='PageWrap'?'':'div'}`}>
                <div className='layoufourdiv-PageWrap'>
                    <Layout className='layout'>
                        <Sider className='layout-sider'>
                            <Layout className='layout-sider-layout'>
                                <Header className='layout-sider-layout-header'>{props.siderheader}</Header>
                                <Divider />
                                <Content className='layout-sider-layout-content'>{props.sidercontent}</Content>
                                {/* <Divider /> */}
                                <Footer className='layout-sider-layout-footer'>{props.siderfooter}</Footer>
                            </Layout>
                        </Sider>
                        <Divider type="vertical" />
                        <Layout className='layout-layout'>
                           {props.layoutheader?<><Header className='layout-layout-header'>{props.layoutheader}</Header>
                            <Divider /></>:null} 
                            <Content className='layout-layout-content'>{props.layoutcontent}</Content>
                            <Divider />
                            <Footer className='layout-layout-footer'>{props.layoutfooter}</Footer>
                        </Layout>
                    </Layout>
                </div>
            </div>
        </div >
    )
}
