import React, { useState, useCallback, useRef } from 'react'
import { GithubOutlined, ZhihuOutlined } from '@ant-design/icons'
import { Tabs, Checkbox, Button, Form, message } from 'antd'
import './index.less'
import { connect } from 'react-redux'
import { Link, RouteComponentProps, useHistory, useLocation } from 'react-router-dom'
import { apiUserLogin } from './service'
import { setUserInfo, UserState } from '../../../store/module/user'
import FormWrap from '../component/FormWrap'
import LoginItem from '../component/LoginItem'
import md5 from 'js-md5'
import AdminConfig from '~/config/index'
import axios from 'axios'

interface LoginProps extends RouteComponentProps {
  setUserInfo: (userInfo: any) => void
}

interface FormProp {
  account?: string
  mobile?: string
  password?: string
  code?: number,
  time?: string,
  sign?: string
}

function Login(props: LoginProps) {
  const history = useHistory()
  const [activeTab, setActiveTab] = useState('account')
  const [form] = Form.useForm()
  const [loginloading, setLoginLoading] = useState(false)
  const refData = useRef()
  refData.current = undefined

  const next = () => {
    const params = new URLSearchParams(window.location.search)
    // console.log('params', params.get('redirectURL'));

    const redirectURL = params.get('redirectURL')
    const state = params.get('state')
    if (redirectURL) {
      if (state === '1') {
        props.history.push('/')
      } else {
        window.location.href = redirectURL
      }
      return
    }
    props.history.push('/')
    // props.history.push('/class/manage/manage-class',{"schoolId":101,"schoolName":"光谷校区"})
    // props.history.push('/homes/index')
    // console.log('跳转');
    // history.push('/homes/index')
    // props.history.push('/homes/index')
  }

  const setRef = (data: any) => {
    refData.current = data
  }
  const onSubmit = useCallback(async () => {
    form.validateFields().then(async (res) => {
      const values = res as FormProp

      if (values.account && values.password) {
        setLoginLoading(true)
        const res: any = await apiUserLogin({ username: values.account, password: values.password })
        if (res.code == 200) {
          let _data = res.data
          // console.log(_data)
          props.setUserInfo(_data)
          next()
        } else {
          message.error('登陆失败！')
          setLoginLoading(false)
        }

        return
      }
    })
  }, [])

  return (
    <FormWrap className="page-login">
      {/* <Tabs defaultActiveKey={activeTab} onChange={setActiveTab}>
        <Tabs.TabPane tab="账号密码登录" key="account"></Tabs.TabPane>
        <Tabs.TabPane tab="手机号登录" key="mobile"></Tabs.TabPane>
      </Tabs> */}
      <div className='page-login-title'>用户登录</div>
      <Form onFinish={onSubmit} form={form}>
        {activeTab === 'account' ? (
          <>
            <LoginItem.Account form={form} />
            <LoginItem.Password form={form} />
          </>
        ) : (
          <>
            <LoginItem.Mobile form={form} />
            <LoginItem.Code form={form} setRef={setRef} />
          </>
        )}

        <Form.Item>
          <div className="align--between">
            <Checkbox defaultChecked>自动登录</Checkbox>
            {/* <div className="theme-text-color-box">
              <Link to="/system/recovery-pwd">忘记密码</Link>
            </div> */}
          </div>
        </Form.Item>

        <Form.Item>
          <Button block htmlType="submit" type="primary" loading={loginloading}>
            登录
          </Button>
        </Form.Item>

        {/* <Form.Item>
          <div className="align--between">
            <div className="page-login__others">
              其他登录方式
              <GithubOutlined className="page-login__icon"></GithubOutlined>
              <ZhihuOutlined className="page-login__icon"></ZhihuOutlined>
            </div>
            <div className="theme-text-color-box">
              <Link to="/system/register">注册账号</Link>
            </div>
          </div>
        </Form.Item> */}
      </Form>
    </FormWrap>
  )
}

export default connect(() => ({}), {
  setUserInfo,
})(Login)
