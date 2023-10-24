import { Button, Divider, Form, Input, InputNumber, Modal, Select, Table, Tag, message } from 'antd'
import * as React from 'react'
import PageWrap from '~/components/component/PageWrap'
import { apidelInfo, apigetTypeList, apisaveType } from './service';
import { getDateAll } from '~/utils/public';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { Search } = Input;
const { TextArea } = Input;

export default function questiontype() {
  const [page, setPage] = React.useState<{ page: number; size: number; total?: number }>({ page: 1, size: 10, total: 0, })
  const [data, setData] = React.useState<{ list: any[]; page: any }>({ list: [], page: {} })
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [form] = Form.useForm()
  const [params, setparams] = React.useState<any>({})
  const [type, settype] = React.useState<string>()
  const [record, setRecord] = React.useState<any>({})

  React.useEffect(() => {
    getTypeList()
  }, [page, params])
  React.useEffect(() => {

  }, [])
  //翻页
  const pageChangeHandle = ({ current, pageSize }: any) => {
    setPage({ page: current as number, size: pageSize as number })
  }

  const columns: any[] = [
    {
      title: '类型名称',
      dataIndex: 'name',
    },
    {
      title: '类型',
      dataIndex: 'code',
      render: (text: any, record: any) => (
        record.code == 1 ? '单选' : record.code == 2 ? '多选' : record.code == 3 ? '判断' : record.code == 4 ? '填空' : record.code == 5 ? '简答' : '其他'
      )
    },
    {
      title: '排序',
      dataIndex: 't_order',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      render: (text: any, record: any) => (
        getDateAll(Date.parse(record.create_time), 'y-m-d 时:分')
      )
    },
    // {
    //   title: '状态',
    //   dataIndex: 'status',
    //   render: (text: any, record: any) => (
    //     record.status == 1 ? <Tag color="success">已启用</Tag> : <Tag color="error">已停用</Tag>
    //   )
    // },
    {
      title: '操作',
      width: 120,
      fixed: 'right',
      render: (text: string, record: any) => (
        <div>
          <span className='cursor-pointer-hover' onClick={() => upquestiontype('up', record)}>编辑</span>
          <Divider type="vertical" style={{ margin: '0 10px', backgroundColor: '#bbb' }} />
          <span className='cursor-pointer' style={{ color: '#ff4d4f' }} onClick={() => delquestiontype(record)}>删除</span>
        </div>
      ),
    },
  ];
  //删除
  const delquestiontype = (record: any) => {
    Modal.confirm({
      title: '系统提示',
      icon: <ExclamationCircleOutlined />,
      content: '此操作将永久删除该题目类型, 是否继续?',
      okText: '确认',
      cancelText: '取消',
      async onOk() {
        let params: any = {
          database: 'question_type',
          key: 'id',
          value: record.id,
        }
        delInfo(params)
      }
    });
  }
  //修改类型
  const upquestiontype = (type: string, record?: any) => {
    settype(type)
    if (type === 'up') {
      setRecord(record)
      form.setFieldsValue(record)
    } else {
      form.resetFields()
    }
    setIsModalOpen(true)
  }
  //确定编辑
  const handleOk = async () => {
    const value: any = await form.validateFields()
    const values: any = await form.getFieldsValue()
    let params: any = {
      ...values
    }
    if (type === 'up') {
      params.id = record.id
      saveType(params)
    } else {
      saveType(params)
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
    <div className='questiontype'>
      <Modal title='新建学科' visible={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="类型名称"
            name="name"
            rules={[{ required: true, message: '请输入类型名称!' }]}
          >
            <Input placeholder='请输入类型名称' />
          </Form.Item>
          <Form.Item
            label="类型"
            name="code"
            rules={[{ required: true, message: '请选择类型!' }]}
            initialValue={1}
          >
            <Select
              options={[
                {
                  value: 1,
                  label: '单选',
                },
                {
                  value: 2,
                  label: '多选',
                },
                {
                  value: 3,
                  label: '判断',
                },
                {
                  value: 4,
                  label: '填空',
                },
                {
                  value: 5,
                  label: '简答',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="排序"
            name="t_order"
            rules={[{ required: true, message: '请输入类型排序!' }]}
            initialValue={1}
          >
            <InputNumber min={1} />
          </Form.Item>
        </Form>
      </Modal>
      <PageWrap>
        <div className="display-flex align-items-center justify-content-space-between margin-bottom-20">
          <div>
            <Search placeholder='请输入类型名称' style={{ width: 200 }} allowClear enterButton onSearch={onSearch} />
          </div>
          <div>
            <Button type='primary' onClick={() => upquestiontype('add')}>新建类型</Button>
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
  //获取题目类型
  async function getTypeList() {
    const res: any = await apigetTypeList({})
    if (res.code === 200) {
      setData(res.data)
    }
  }
  //保存题目类型
  async function saveType(params: any) {
    const res: any = await apisaveType({ ...params })
    if (res.code === 200) {
      getTypeList()
      message.success('编辑成功')
    }
  }
  //删除题目类型
  async function delInfo(params: any) {
    const res: any = await apidelInfo({ ...params })
    if (res.code === 200) {
      getTypeList()
      message.success('删除成功')
    }
  }
}