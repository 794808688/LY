import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Modal, Select, Switch, Table, Tag, message } from 'antd'
import * as React from 'react'
import PageWrap from '~/components/component/PageWrap'
import { nanoid } from 'nanoid';
import { apidelInfo, apigetGetherList, apigetWorkTypeList, apisaveGether } from './service';
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
    getGetherList()
  }, [page])
  React.useEffect(() => {
    getWorkTypeList()
  }, [])
  //翻页
  const pageChangeHandle = ({ current, pageSize }: any) => {
    setPage({ page: current as number, size: pageSize as number })
  }
  const columns: any[] = [
    {
      title: '学科名称',
      dataIndex: 'sname',
    },
    {
      title: '渠道平台',
      dataIndex: 'gather_id',
      render: (text: any, record: any) => (
        record.gather_id == 0 ? '武汉云' : ''
      )
    },
    {
      title: '简称',
      dataIndex: 'jc',
    },
    {
      title: '科目类型',
      dataIndex: 'type',
      render: (text: any, record: any) => (
        record.type == 0 ? '理论' : '技能'
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text: any, record: any) => (
        record.status == 1 ? <Tag color="success">已启用</Tag> : <Tag color="error">已停用</Tag>
      )
    },
    {
      title: '备注',
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
        delInfo(params)
      }
    });
  }
  //确定编辑
  const handleOk = async () => {
    const values: any = form.getFieldsValue()
    let params: any = {
      ...values,
      status: checked ? 1 : 0,
      sname:worktype.filter((item:any)=>item.wid==values.code)[0]?.name
    }
    if (type === 'add') {
      saveGethert(params)
    } else {
      params.sid = record.sid
      saveGethert(params)
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
      <Modal title='新建学科' visible={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          {/* <Form.Item
            label="学科名称"
            name="sname"
            rules={[{ required: true, message: '请输入学科名称!' }]}
          >
            <Input placeholder='请输入学科名称' />
          </Form.Item> */}
          <Form.Item
            label="学科名称"
            name="code"
          >
            <Select
              options={worktype}
              fieldNames={{ value: 'wid', label: 'name' }}
            />
          </Form.Item>
          <Form.Item
            label="简称"
            name="jc"
            rules={[{ required: true, message: '请输入简称!' }]}
          >
            <Input placeholder='请输入简称' />
          </Form.Item>
          <Form.Item
            label="科目类型"
            name="type"
            rules={[{ required: true, message: '请选择科目类型!' }]}
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
            label="渠道平台"
            name="gather_id"
            rules={[{ required: true, message: '请选择渠道平台!' }]}
            initialValue={0}
          >
            <Select
              options={[
                {
                  value: 0,
                  label: '武汉云',
                },
              ]}
            />
          </Form.Item>
          {/* <Form.Item
            label="职业编码"
            name="code"
          >
            <Select
              options={worktype}
              fieldNames={{ value: 'wid', label: 'name' }}
            />
          </Form.Item> */}
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
            <Switch onClick={() => setChecked(!checked)} checked={checked} checkedChildren="已启用" unCheckedChildren="已停用" defaultChecked />
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
  //获取学科列表
  async function getGetherList() {
    const res: any = await apigetGetherList({})
    if (res.code === 200) {
      res.data.list.map((item: any) => {
        item.key = nanoid()
      })
      setData(res.data)
    }
  }
  //保存学科
  async function saveGethert(params: any) {
    const res: any = await apisaveGether({ ...params })
    if (res.code === 200) {
      getGetherList()
      message.success('编辑成功')
    }
  }
  //获取职业
  async function getWorkTypeList() {
    const res: any = await apigetWorkTypeList({})
    if (res.code === 200) {
      res.data.list.map((item: any) => {
        item.key = nanoid()
        item.lv = item.level==5?'五级/初级工':item.level==4?'四级/中级工':item.level==3?'三级/高级工':item.level==2?'二级/技师':item.level==1?'一级/高级技师':''
        item.name = item.work_name +'-'+ item.lv
      })
      setWorkType(res.data.list)
    }
  }
  //删除学科
  async function delInfo(params: any) {
    const res: any = await apidelInfo({ ...params })
    if (res.code === 200) {
      getGetherList()
      message.success('删除成功')
    }
  }

}

export default workgrade 