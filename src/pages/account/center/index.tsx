import { Avatar, Button, Col, Divider, Form, Input, message, Modal, Popconfirm, Row, Select, Upload, UploadProps } from 'antd';
import * as React from 'react';
import PageWrap from '../../../components/component/PageWrap'
import './index.scss'
import { LockOutlined, SafetyOutlined, MobileOutlined, MailOutlined, CloudUploadOutlined } from '@ant-design/icons'
import store from '~/store'
import { getDateAll } from '~/utils/public';
import { apiGetRole, apiChangeUserinfo, apigetCode, apiChangecellphone, apiChangepassword } from './service'
import AdminConfig from '~/config';
import { setUserInfo, UserState } from '~/store/module/user'
import { connect } from 'react-redux'
import md5 from 'js-md5'
import Countdown from 'antd/lib/statistic/Countdown';
// import FormWrap from '../component/FormWrap'
import LoginItem from 'src/pages/system/component/LoginItem'
interface PropsType {
  setUserInfo: (user: UserState) => void
}
interface FormProp {
  account?: string
  mobile?: string
  password?: string
  code?: number,
  time?: string,
  sign?: string
}
function Center({ setUserInfo }: PropsType) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = React.useState(false)
  const user = store.getState().user
  const [form] = Form.useForm()
  const [forms] = Form.useForm()
  const [formp] = Form.useForm()
  // const [disabled, setdisabled] = React.useState(false)
  const refData = React.useRef()
  refData.current = undefined
  React.useEffect(() => {
    //获取角色
    apiGetRole({})
      .then((res: any) => {
        console.log(res); 
        if (res.code === 200) {
          let sname = res.data && res.data.list.filter((item: any) => {
            return item.authid == user.authid
          })[0].sname
          form.setFieldValue('role', sname)
        }
      })
    form.setFieldValue('username', user.nickname)
    // form.setFieldValue('realname', user.realname)
    // form.setFieldValue('phone', user.phone)
    // form.setFieldValue('age', user.age)
    // form.setFieldValue('sex', user.sex)
    // form.setFieldValue('role', sname)
  }, [])
// console.log(user);

  /**
   * @description: 修改用户信息
   * @return {*}
   */
  const ChangeUserinfo = (avatar: any,phone:any) => {
    form.validateFields().then((res: any) => {
      console.log(res);
      apiChangeUserinfo({
        nickname: res.username,
        realname: res.realname,
        avatar: avatar ? avatar : user.avatar,
        tel: user.tel,
        classid: user.classid,
        schoolid: user.schoolid,
        sex: res.sex,
        age: res.age,
        cardtype: user.cardtype,
        card: user.card,
      })
        .then((res: any) => {
          if (res.code === 200) {
            // console.log(res);
          }
        })
      user.nickname = res.username,
        user.realname = res.realname,
        user.avatar = avatar ? avatar : user.avatar,
        user.tel = user.tel,
        user.classid = user.classid,
        user.schoolid = user.schoolid,
        user.sex = res.sex,
        user.age = res.age,
        user.cardtype = user.cardtype,
        user.card = user.card,
        user.phone=phone?phone:user.phone,
        // console.log(user);

      setUserInfo(user)
      message.success('修改成功')
    })

  }
  //上传头像
  const props: UploadProps = {
    name: 'Filedata',
    accept: ".bmp,.gif,.png,.jpeg,.jpg",
    action: `${AdminConfig.API_URL}${AdminConfig.LOCAL_PATH}?mod=1&do=120&uid=${user.uid}&localstore=${user.localstore}`,
    headers: {
      authorization: 'authorization-text',
    },
    showUploadList: false,
    onChange(info) {
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        ChangeUserinfo(info.file.response.data.path,null)
        // console.log(info.file.response.data.url);
        // message.success(`修改成功`);
      } else if (info.file.status === 'error') {
        message.error(`修改失败`);
      }
    },
  };
  const handlePhoneCancel = () => {
    setIsPhoneModalOpen(false)
  }

  //修改手机号
  const changePhone = () => {
    setIsPhoneModalOpen(true)
  }
  console.log(user.account)
  //获取验证码
  // const getCode = () => {

  //   forms.validateFields().then((res: any) => {
  //     console.log(res);
  //     if (res.cellphone) {
  //       setdisabled(true)
  //       apigetCode({ phone: res.cellphone })
  //         .then((res: any) => {
  //           if (res.code == 200) {
  //             console.log(res);
  //           }
  //         })
  //     }
  //   })
  // }
  const setRef = (data: any) => {
    refData.current = data
  }
  // const deadline = Date.now() + 1000 * 5
  // const onChange = (val: any) => {
  //   setdisabled(false)
  // };

  //修改手机号
  const handlePhoneOk = () => {
    forms.validateFields().then((res: any) => {
      const values = res as FormProp
      if (values.mobile && values.code) {
        const { time }: any = refData.current ? refData.current : ''
        const { sign }: any = refData.current ? refData.current : ''
        if (!time || !sign) {
          message.error('验证码错误!')
          return
        }
        apiChangecellphone({ phone: values.mobile, code: values.code, time: time, sign: sign })
          .then((res: any) => {
            if (res.code == 200) {
              console.log(res);             
              setIsPhoneModalOpen(false)
              ChangeUserinfo(null,res.data.phone)
              // message.success('手机绑定成功')
              // user.phone=res.phone
              // setUserInfo(user)
            }
          })
          .catch(() => { })
      }
    })
  }
  //修改密码

  //修改密码打开弹框
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //修改密码确定按钮
  const onokFinish = () => {
    formp.validateFields().then((res: any) => {
      console.log(res);
      if (res.newpassword == res.password) {
        apiChangepassword({
          a:user.account,
          // phone: user.phone,
          p: md5(md5(md5(user.pwd))),
          newpwd: md5(md5(md5(res.password))),
        })
          .then((res: any) => {
            console.log(res);
            if (res.code === 200) {
              setIsModalOpen(false);
              message.success('密码修改成功')
            }
          })
      } else if (res.newpassword != res.password) {
        message.error('两次密码不一样')
      }

    })


  }

  return (
    <PageWrap>
      <div className="center-package-box">
        <div className="center-package-box-personal-information">
          <div className="personal-information-top">
            <div className="head-portrait">
              <img src={user.avatar ? AdminConfig.API_SOURCE+'/'+user.avatar : AdminConfig.BASENAME + '/avatar.png'} alt="" />
              {/* <Avatar className="img" icon={<UserOutlined />} size={146} src={user.avatar}/> */}
            </div>
            <div className="head-name">
              <span className="head-username">{user.nickname}</span>
              <span className="head-time">注册日期：{getDateAll(user.time * 1000, 'y-m-d ')}</span>
              <Upload {...props} className="head-Upload">
                <Button className="head-btn" type="primary" icon={<CloudUploadOutlined />} >上传头像</Button>
              </Upload>
            </div>
          </div>
          <Divider plain style={{ fontSize: 15, fontWeight: 'bold' }}>信息绑定</Divider>

          <div className="personal-information-bottom">
            {/* <div className="phone">
              <span>手机：{user.phone}</span>
              <Button type="primary" icon={<MobileOutlined />} onClick={changePhone}>修改手机</Button>
            </div> */}
            {/* <div className="email">
              <span>邮箱：123456789@qq.com</span>
              <Button type="primary" icon={<MailOutlined />}>绑定邮箱</Button>
            </div> */}
            {/* <Divider /> */}
            <Button type="primary" danger className="password" icon={<LockOutlined />} onClick={showModal}>修改密码</Button>
          </div>

        </div>
        <Divider type="vertical" style={{ height: 680 }} />
        <div className="center-package-box-essential-information">
          <Divider plain style={{ fontSize: 15, fontWeight: 'bold' }}>个人信息</Divider>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          // size="small"
          >
            <Form.Item
              label="昵称"
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="角色"
              name="role"
            // rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input disabled={true} />
            </Form.Item>

            {/* <Form.Item
              label="真实姓名"
              name="realname"
              rules={[{ required: true, message: '请输入姓名!' }]}
            >
              <Input />
            </Form.Item> */}

            {/* <Form.Item
              label="Email"
              name="email"
            >
              <Input  />
            </Form.Item> */}


            <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
              <Popconfirm
                title="确定要修改个人信息吗?"
                onConfirm={() => ChangeUserinfo(null,null)}
                // onCancel={cancel}
                okText="确定"
                cancelText="取消"
              >
                <Button type="primary" htmlType="submit" block icon={<SafetyOutlined />}>
                  保存
                </Button>
              </Popconfirm>

            </Form.Item>
          </Form>
        </div>
      </div>
      {/* 修改密码弹框 */}
      <Modal title="修改密码" visible={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form
          form={formp}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onokFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="realname"
          >
            <span>{user.nickname}</span>
          </Form.Item>

          <Form.Item
            label="新密码"
            name="newpassword"
            rules={[{ required: true, message: '请输入新密码!' }]}
          >
            <Input.Password placeholder='请输入新密码' />
          </Form.Item>

          <Form.Item
            label="确认密码"
            name="password"
            rules={[{ required: true, message: '请确认新密码!' }]}
          >
            <Input.Password placeholder='请再次输入新密码' />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* 修改手机号弹框 */}
      <Modal title="绑定手机号" visible={isPhoneModalOpen} onOk={handlePhoneOk} onCancel={handlePhoneCancel}>
        {/* <Form
          form={forms}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 13 }}
          initialValues={{ remember: true }}
          // onFinish={onokFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="手机号"
            name="cellphone"
            rules={[{ required: true, message: '请输入手机号码' }]}
          >
            <Input placeholder='请输入手机号码' />
          </Form.Item>

          <Form.Item label="验证码">
            <Row gutter={4}>
              <Col span={14}>
                <Form.Item
                  name="validation"
                  noStyle
                  // rules={[{ required: true, message: '请输入验证码' }]}
                >
                  <Input placeholder='请输入验证码' />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Button onClick={getCode} disabled={disabled}>
                  {!disabled ? '获取验证码' :
                    <Countdown value={deadline} format="ss" onFinish={() => onChange(eval)} />}
                </Button>
              </Col>
            </Row>
          </Form.Item>


        </Form> */}
        <Form onFinish={handlePhoneOk} form={forms}>
          <LoginItem.Mobile form={forms} />
          <LoginItem.Code form={forms} setRef={setRef} />
        </Form>
      </Modal>
    </PageWrap>
  )
}
export default connect((user: UserState) => user, {
  setUserInfo,
})(Center)