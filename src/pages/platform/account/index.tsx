import { Button, DatePicker, Divider, Form, Input, Modal, Select, Switch, Table, Tag, Upload, message } from 'antd'
import * as React from 'react'
import PageWrap from '~/components/component/PageWrap'
const { Search } = Input;
const { RangePicker } = DatePicker;
import './index.scss'
import Avatar from '/public/avatar.png';
import Portrait from '/public/portarit.jpg';
import { apiGetRole, apiUpuser, apideluser, apigetUser, apigetadduser, apigetupdatauser } from './service';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import AdminConfig from '~/config';
import * as XLSX from 'xlsx'
import { nanoid } from 'nanoid';
import md5 from 'js-md5';
import { base64_encode, getDateAll } from '~/utils/public';
import * as ExcelJs from "exceljs";
import { generateHeaders, saveWorkbook } from "../../../utils/Export";

export default function account() {
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [type, settype] = React.useState(false);
  const [page, setPage] = React.useState<{ page: number; size: number; total?: number }>({ page: 1, size: 10, total: 0, })
  const [data, setData] = React.useState<{ list: any[]; page: any }>({ list: [], page: {} })
  const [role, setRole] = React.useState<any[]>([])
  const [params, setparams] = React.useState<any>({})
  const [loading, setLoading] = React.useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
  const [selectedRows, setselectedRows] = React.useState<any[]>([]);
  const [record, setrecord] = React.useState<any>({})

  React.useEffect(() => {
    getUser()//获取用户列表
  }, [page, params])

  React.useEffect(() => {
    GetRole()//获取角色
  }, [])
  const columns: any[] = [
    {
      title: '用户账号',
      dataIndex: 'username',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      title: '密码',
      dataIndex: 'password',
    },
    {
      title: '角色',
      dataIndex: 'role',
      render: (text: string, record: any) => (
        role.filter((item: any) => item.authid == record.authid)[0]?.sname
      )
    },
    {
      title: '操作',
      key: 'id',
      width: 120,
      fixed: 'right',
      render: (text: string, record: any) => (
        <div>
          <span className='cursor-pointer-hover' onClick={() => showModal('up', record)}>编辑</span>
          {/* <Divider type="vertical" style={{ margin: '0 10px', backgroundColor: '#bbb' }} />
          <span className='cursor-pointer' style={{ color: '#ff4d4f' }} onClick={() => reset(record)}>删除</span> */}
        </div>
      ),
    },
  ];
  //删除用户
  const reset = (record: any) => {
    Modal.confirm({
      title: '系统提示',
      icon: <ExclamationCircleOutlined />,
      content: '此操作将永久删除该用户, 是否继续?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        deluser(record.uid)
      }
    });
  }

  //搜索
  const onSearch = (value: any) => {
    params.nickname = value
    setparams({ ...params })
    setPage({ page: 1, size: 10 })
  }
  //打开编辑
  const showModal = (type: string, record?: any) => {
    if (type === 'add') {
      form.resetFields()
      settype(false)
    } else {
      form.setFieldsValue(record)
      settype(true)
      setrecord(record)
    }
    setIsModalOpen(true);
  };
  //确定编辑
  const handleOk = async() => {
    const valu: any = await form.validateFields()
    const values: any = await form.getFieldsValue()
    let params: any = {
      username: values.username,
      nickname: values.nickname,
      authid: values.authid,
      password: values.password,

    }
    if (!type) {
      getadduser({ ...params, token: base64_encode('zfz' + Date.now() + Math.floor(Math.random() * 10001)) })
    } else {
      getmoduser({ ...params, id: record.id })
    }
    setIsModalOpen(false)
  }
  //切换角色
  const onChangerole = (value: any) => {
    params.authid = value
    setparams({ ...params })
    setPage({ page: 1, size: 10 })
  }
  //翻页
  const pageChangeHandle = ({ current, pageSize }: any) => {
    setPage({ page: current as number, size: pageSize as number })
  }
  const props: any = {
    name: 'Filedata',
    action: AdminConfig.API_URL + AdminConfig.LOCAL_PATH + '?mod=0&do=42',
    headers: {
      authorization: 'authorization-text',
    },
    showUploadList: false,
    beforeUpload(file: any) {
      const reader = new FileReader()
      reader.onload = (event: any) => {
        const { result } = event.target
        const workbook = XLSX.read(result, { type: 'binary' })
        let data: any[] = [] // 存储获取到的数据
        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]))
            break
          }
        }
        SetEmployment(data)
      }
      reader.readAsBinaryString(file)
      return false
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`用户导入成功`)
        getUser()
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`)
      }
    },
  };
  //导入用户
  const SetEmployment = (data: any) => {
    if (data && data.length > 0) {
      data.map((item: any) => {
        item.key = nanoid()
        item.account = item['账号']
        item.nickname = item['姓名']
        item.realname = item['姓名']
        item.phone = item['手机号']
        item.authid = role.filter((it: any) => (it.sname == item['角色']))[0]?.authid
        delete item['账号']
        delete item['姓名']
        delete item['手机号']
        delete item['角色']
        delete item['班级']
      })
      Upuser(JSON.stringify(data))
    } else {
      message.warning('导入失败')
    }
  }
  const columnsexport: any = [
    { title: "账号", dataIndex: "account" },
    { title: "姓名", dataIndex: "nickname" },
    { title: "手机号", dataIndex: "phone" },
    { title: "角色", dataIndex: "auth" },
    { title: "班级", dataIndex: "cname" },
  ]
  //导出
  async function onExportBasicExcel() {
    setLoading(true)
    // 创建工作簿
    const workbook = new ExcelJs.Workbook();
    // 添加sheet
    const worksheet = workbook.addWorksheet("demo sheet");
    // 设置 sheet 的默认行高
    worksheet.properties.defaultRowHeight = 20;
    // 设置列
    worksheet.columns = generateHeaders(columnsexport);
    // 添加行
    let res: any = selectedRows || []
    res && res.map((item: any) => {
      item.auth = role.filter((it: any) => { return it.authid == item.authid })[0]?.sname
    })
    worksheet.addRows(res);
    // 导出excel
    saveWorkbook(workbook, "用户列表-" + getDateAll(0, "y-m-d 时:分") + ".xlsx");
    setLoading(false)
  }


  const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: any) => {
    console.log('selectedRowKeys', newSelectedRowKeys);
    console.log('selectedRows', selectedRows);
    setSelectedRowKeys(newSelectedRowKeys);
    setselectedRows(selectedRows)
  };

  const rowSelection = {
    selectedRowKeys,
    preserveSelectedRowKeys: true,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div className='platform-account'>
      <Modal title={type ? '编辑用户' : '新建用户'} visible={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >

          <Form.Item
            label="用户账号"
            name="username"
            rules={[{ required: true, message: '请输入账号!' }]}
          >
            <Input disabled={type} placeholder='请输入账号' />
          </Form.Item>
          <Form.Item
            label="用户姓名"
            name="nickname"
            rules={[{ required: true, message: '请输入姓名!' }]}
          >
            <Input placeholder='请输入姓名' />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password autoComplete="new-password" placeholder='请输入密码'/>
          </Form.Item>
          <Form.Item
            label="角色"
            name="authid"
            rules={[{ required: true, message: '请选择角色!' }]}
          >
            <Select
              placeholder='请选择角色'
              options={role}
              fieldNames={{ value: 'authid', label: 'sname' }}
            />
          </Form.Item>
          {/* <Form.Item
            label="用户状态"
            name="status"
            rules={[{ required: true, message: '请输入手机号码!' }]}
          >
            <Switch checkedChildren="开启" unCheckedChildren="异常" defaultChecked />
          </Form.Item> */}
        </Form>
      </Modal>
      <PageWrap>
        <div className="display-flex align-items-center justify-content-space-between margin-bottom-20">
          <div>
            {/* <Select
              style={{ width: 120 }}
              placeholder='请选择角色'
              options={role}
              fieldNames={{ value: 'authid', label: 'sname' }}
              onChange={onChangerole}
            /> */}
            <Search placeholder='请输入姓名' style={{ width: 200 }} allowClear enterButton onSearch={onSearch} />
          </div>
          <div>
            <Button type='primary' onClick={() => showModal('add')}>新建用户</Button>
            <Button type='primary' loading={loading} onClick={onExportBasicExcel} style={{ marginLeft: 10 }} disabled={!hasSelected}>批量导出</Button>
            {/* <Button type='primary' style={{ marginLeft: 10 }} onClick={() => { window.location.href = `${AdminConfig.API_SOURCE}/export/用户导入.xlsx` }}>下载模板</Button>
            <Upload {...props}>
              <Button type='primary' style={{ marginLeft: 10 }}>批量导入账号</Button>
            </Upload> */}
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={data.list}
          rowSelection={rowSelection}
          rowKey='uid'
          pagination={{ hideOnSinglePage: true, current: data.page.page, defaultPageSize: page.size, total: data.page.dataTotal }}
          onChange={pageChangeHandle} />
      </PageWrap>
    </div>
  )
  //获取用户列表
  async function getUser() {
    const res: any = await apigetUser({ ...page, ...params })
    if (res.code === 200) {
      res.data.list.map((item: any) => {
        item.key = nanoid()
      })
      setData(res.data)
    }
  }
  //获取角色
  async function GetRole() {
    const res: any = await apiGetRole({})
    if (res.code === 200) {
      setRole(res.data.list)
    }
  }
  //新增用户
  async function getadduser(params: any) {
    const res: any = await apigetadduser({ ...params })
    if (res.code === 200) {
      message.success('新增成功')
      getUser()
    } else {
      message.error(res.msg)
    }
  }
  //修改用户
  async function getmoduser(params: any) {
    const res: any = await apigetupdatauser({ ...params })
    if (res.code === 200) {
      message.success('修改成功')
      getUser()
    }
  }
  //删除角色
  async function deluser(uid: any) {
    const res: any = await apideluser({ tid: uid })
    if (res.code === 200) {
      message.success('删除成功')
      getUser()
      setPage({ page: 1, size: 10 })
    } else {
      message.error(res.code_msg)
    }
  }
  //导入用户
  async function Upuser(list: any) {
    const res: any = await apiUpuser({ list: list })
    if (res.code === 200) {
      message.success('导入成功')
      getUser()
    }
  }

}