import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Modal, Select, Switch, Table, Tag, message } from 'antd'
import * as React from 'react'
import PageWrap from '~/components/component/PageWrap'
import { nanoid } from 'nanoid';
import { apigetSystemList, apisaveSystem } from './service';
const { Search } = Input;
const { TextArea } = Input;

const workgrade = () => {
  const [page, setPage] = React.useState<{ page: number; size: number; total?: number }>({ page: 1, size: 10, total: 0, })
  const [data, setData] = React.useState<{ list: any[]; page: any }>({ list: [], page: {} })
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [form] = Form.useForm()
  const [params, setparams] = React.useState<any>({ company_name: null })
  const [type, settype] = React.useState<string>('')
  const [record, setRecord] = React.useState<any>()
  const [worktype, setWorkType] = React.useState<any[]>([])
  const [checked, setChecked] = React.useState(true)

  React.useEffect(() => {
    getSystemList()
  }, [page])
  React.useEffect(() => {
    // getWorkTypeList()
  }, [])
  //翻页
  const pageChangeHandle = ({ current, pageSize }: any) => {
    setPage({ page: current as number, size: pageSize as number })
  }
  const columns: any[] = [
    {
      title: '序号',
      dataIndex: '',
      render: (text: any, record: any, index: number) => (
        (page.page - 1) * page.size + index + 1
      )
    },
    {
      title: '应用名称',
      dataIndex: 'name',
    },
    {
      title: '应用管理员',
      dataIndex: '',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text: any, record: any) => (
        record.status == 1 ? <Tag color="success">已启用</Tag> : <Tag color="error">已停用</Tag>
      )
    },
    {
      title: '到期日期',
      dataIndex: 'remark',
    },
    {
      title: '操作',
      width: 120,
      fixed: 'right',
      render: (text: string, record: any) => (
        <div>
          <span className='cursor-pointer-hover' onClick={() => upoccupation('up', record)}>编辑</span>
          <Divider type="vertical" style={{ margin: '0 10px', backgroundColor: '#bbb' }} />
          <span className='cursor-pointer' style={{ color: '#ff4d4f' }} onClick={() => delccupation(record)}>删除</span>
        </div>
      ),
    },
  ];
  //编辑职业
  const upoccupation = (type: string, record?: any) => {
    settype(type)
    if (type === 'up') {
      setRecord(record)
      setChecked(record.status == 1 ? true : false)
      form.setFieldsValue(record)
    } else {
      form.resetFields()
    }
    setIsModalOpen(true)
  }
  //删除
  const delccupation = (record: any) => {
    Modal.confirm({
      title: '系统提示',
      icon: <ExclamationCircleOutlined />,
      content: '此操作将永久删除该学科, 是否继续?',
      okText: '确认',
      cancelText: '取消',
      async onOk() {
        let params: any = {
          database: 'gether',
          key: 'sid',
          value: record.sid,
        }
        // delInfo(params)
      }
    });
  }
  //确定编辑
  const handleOk = async () => {
    const values: any = form.getFieldsValue()
    let params: any = {
      ...values,
      status: checked ? 1 : 0,
    }
    if (type === 'add') {
      saveSystem(params)
    } else {
      params.sid = record.sid
      saveSystem(params)
    }
    setIsModalOpen(false)
  }
  //搜索
  const onSearch = (value: any) => {
    params.company_name = value
    setparams({ ...params })
    setPage({ page: 1, size: 10 })
  }

  return (
    <div className='workMaintenance'>
      <Modal title='新建应用' visible={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="应用名称"
            name="name"
          >
            <Input placeholder='请输入应用名称' />
          </Form.Item>
          <Form.Item
            label="到期日期"
            name="jc"
            rules={[{ required: true, message: '请选择日期!' }]}
          >
            
          </Form.Item>
          <Form.Item
            label="主模块"
            name="type"
            rules={[{ required: true, message: '请选择主模块!' }]}
            initialValue={0}
          >
            <Select
              options={[
                {
                  value: 0,
                  label: '理论',
                },
                {
                  value: 1,
                  label: '技能',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="授权模块"
            name="gather_id"
            rules={[{ required: true, message: '请选择授权模块!' }]}
            initialValue={0}
          >
            <Select
              mode="multiple"
              options={[
                {
                  value: 0,
                  label: '武汉云',
                },
                {
                  value: 1,
                  label: '武汉云',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="备注"
            name="remark"
          >
            <TextArea rows={4} placeholder='请输入备注' />
          </Form.Item>
          <Form.Item
            label="是否可用"
            name="status"
          >
            <Switch onClick={() => setChecked(!checked)} checked={checked} checkedChildren="可用" unCheckedChildren="禁用" defaultChecked />
          </Form.Item>
        </Form>
      </Modal>
      <PageWrap>
        <div className="display-flex align-items-center justify-content-space-between margin-bottom-20">
          <div>
            <Search placeholder='请输入单位名称' style={{ width: 200 }} allowClear enterButton onSearch={onSearch} />
          </div>
          <div>
            <Button type='primary' onClick={() => upoccupation('add')}>新建学科</Button>
          </div>
        </div>
        <Table
          rowKey={'id'}
          columns={columns}
          dataSource={data.list}
        // pagination={{ hideOnSinglePage: true, current: data.page.page, defaultPageSize: page.size, total: data.page.dataTotal }}
        // onChange={pageChangeHandle}
        />
      </PageWrap>
    </div>
  )
  //获取应用列表
  async function getSystemList() {
    const res: any = await apigetSystemList({})
    if (res.code === 200) {
      res.data.list.map((item: any) => {
        item.key = nanoid()
      })
      setData(res.data)
    }
  }
  //保存应用
  async function saveSystem(params:any) {
    const res: any = await apisaveSystem({...params})
    if (res.code === 200) {
      message.success('保存成功')
    }
  }
  
}

export default workgrade 