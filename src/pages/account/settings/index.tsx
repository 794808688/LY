import React, { useCallback, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Input, message, Switch, Select, Upload, Form, Button } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { IStoreState } from '../../../store/types';
import store from '~/store';
import { apiGetSchoolList } from '~/api/service';
import { setUserInfo, UserState } from '~/store/module/user';
import AdminConfig from '~/config';

export interface AccountSettingsProps {
  visible: boolean;
  user: any;
  setUserInfo: (user: UserState) => void
}

interface AddOrEditUserFormProps {
  id?: number;

  account: string;

  password: string;

  avatar?: string | null;

  mobile: string;

  roleId: number;

  status: number;

  nodeid: number;
}

function AccountSettings(props: AccountSettingsProps) {
  const { user } = store.getState();
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  const [avatarLoading,setAvatarLoading] = useState<boolean>(false)
  const [avatar, setAvatar] = useState<string>(() => (user && user.avatar ? user.avatar : ''));


  const onOk = useCallback(() => {
    form.validateFields().then(res => {
      const values = res as AddOrEditUserFormProps;
      const info: any = {
        ...values,
        avatar,
        uname: values.account,
      };
      setSubmitLoading(true)
      if (info.uid) {
        // let udata: any = info
        // apiUpdateMine(udata)
        //   .then((res: any) => {
        //     setSubmitLoading(false)
        //     if (res.code == 1) {
        //       message.success('修改成功');
        //       user.mobile = info.mobile?info.mobile:''
        //       user.nickname = info.nickname?info.nickname:''
        //       user.avatar = info.avatar?info.avatar:''
        //       props.setUserInfo({...user})
        //       // window.location.reload()
        //     } else {
        //       message.error(res.msg);
        //     }
        //   })
        //   .catch(() => { });
      } 
    });
  }, [avatar]);

  function getBase64(img:any, callback:any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
    console.log(img)
  }

  const onChange = useCallback(({ file }: UploadChangeParam<UploadFile<any>>) => {
    console.log(file)
    if (file.status === 'uploading') {
      setAvatarLoading(true)
      return;
    }
    if (file.status === 'done') {
      // Get this url from response in real world.
      getBase64(file.originFileObj, (imageUrl:any) => {
        setAvatarLoading(false)
      })
    }
    if (file.response && file.response.code.code === 1000) {
      setAvatar(AdminConfig.API_URL_CENTER+'/clsc/Admin/'+file.response.code.path);
    }
  }, []);

  // const reset = form.getFieldValue('reset');

  function beforeUpload(file:any) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('仅能上传JPG/PNG文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片最大限制2MB!');
    }
    return isJpgOrPng && isLt2M;
  }


  return (
    <div className='padding-left-50'>
      <Form
        onFinish={onOk}
        form={form}
        initialValues={user || {}}
        labelCol={{
          sm: { span: 2 },
        }}
        wrapperCol={{
          sm: { span: 6 },
        }}
      >
        {user && user.uid ? (
          <Form.Item label="ID" name="uid">
            <Input disabled />
          </Form.Item>
        ) : null}

        {/* <Form.Item label="账号" name="account" rules={[{ required: true, message: '请输入账号' }]}>
          <Input disabled placeholder="请输入账号" />
        </Form.Item> */}

        {/* {user ? (
          
        ) : null} */}
        <Form.Item label="姓名" name="nickname" rules={[{ required: true, message: '请输入姓名' }]}>
          <Input placeholder="请输入姓名" />
        </Form.Item>

        {/* {user && (
          <Form.Item
            label="重置密码"
            name="reset"
          >
            <Switch />
          </Form.Item>
        )}
        {(!user || reset) && (
          <Form.Item
            label={reset ? '重置密码' : '初始密码'}
            name="password"
            rules={[{ required: true, message: '请输入用户密码' }]}
          >
            <Input.Password visibilityToggle />
          </Form.Item>
        )} */}
        <Form.Item label="手机号码" name="phone">
          <Input placeholder="请输入手机号" />
        </Form.Item>
        
        <Form.Item label="头像">
          <Upload
            name="file"
            accept="image/*"
            listType="picture-card"
            data={{ uid: store.getState().user.uid, action: 'avatar' }}
            headers={{authorization: 'authorization-text'}}
            showUploadList={false}
            action={AdminConfig.API_URL_CENTER + AdminConfig.UPLOAD_PATH}
            beforeUpload={beforeUpload}
            onChange={onChange}
          >
            {avatar ? (
              <img src={avatar} alt="avatar" style={{ width: '100%',height: '100%',borderRadius:'50%' }} />
            ) : (
              <div>
                <PlusOutlined />
                <div className="ant-upload-text">上传</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        
        <div className='margin-left-20'>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={submitLoading} >
            提交
          </Button>
        </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default connect(({ user }: IStoreState) => ({ token: user.token }),{
  setUserInfo,
})(AccountSettings);


