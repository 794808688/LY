import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, InputNumber, Modal, Select, Table, message } from 'antd'
import * as React from 'react'
import PageWrap from '~/components/component/PageWrap'
import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { apigetKnowpointList } from './service';
import { getDateAll } from '~/utils/public';
const { Search } = Input;

const workMaintenance = () => {
  const [page, setPage] = React.useState<{ page: number; size: number; total?: number }>({ page: 1, size: 10, total: 0, })
  const [data, setData] = React.useState<{ list: any[]; page: any }>({ list: [], page: {} })
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [form] = Form.useForm()
  const [params, setparams] = React.useState<any>({})
  const [type, settype] = React.useState<string>('')
  const [record, setRecord] = React.useState<any>()

  useEffect(() => {
    getKnowpointList()
  }, [page])
  //翻页
  const pageChangeHandle = ({ current, pageSize }: any) => {
    setPage({ page: current as number, size: pageSize as number })
  }
  const columns: any[] = [
    {
      title: '名称',
      dataIndex: 'kname',
    },
    {
      title: '说明',
      dataIndex: 'info',
    },
    {
      title: '使用次数',
      dataIndex: 'usenum',
    },
    {
      title: '使用占用总分值',
      dataIndex: 'score',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      render:(etxt:any,record:any)=>(
        // new Date(record.create_time).toLocaleString()
        getDateAll(Date.parse(record.create_time),'y-m-d 时:分')
      )
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
      form.resetFields()
      form.setFieldsValue(record)
      setRecord(record)
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
      content: '此操作将永久删除该职业, 是否继续?',
      okText: '确认',
      cancelText: '取消',
      async onOk() {

      }
    });
  }
  //确定编辑
  const handleOk = async () => {
    const values: any = await form.validateFields()
    console.log(values);
    if (values) {
      if (type == 'add') {

      } else {
        if (record) {

        }
      }
    }
    setIsModalOpen(false)
  }
  //搜索
  const onSearch = (value: any) => {
    params.work_name = value.trim()
    setparams({ ...params })
    setPage({ page: 1, size: 10 })
  }
  return (
    <div className='workMaintenance'>
      <Modal title={type == 'up' ? '编辑职业' : '新建职业'} visible={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="知识结构名称"
            name="kname"
            rules={[{ required: true, message: '请输入知识结构名称!' }]}
          >
            <Input placeholder='知识结构名称' />
          </Form.Item>
          <Form.Item
            label="详情说明"
            name="info"
          >
            <Input placeholder='详情说明' />
          </Form.Item>
        </Form>
      </Modal>
      <PageWrap>
        <div className="display-flex align-items-center justify-content-space-between margin-bottom-20">
          <div>
            <Search placeholder='请输入知识结构名称' style={{ width: 200 }} allowClear enterButton onSearch={onSearch} />
          </div>
          <div>
            <Button type='primary' onClick={() => upoccupation('add')}>新建知识结构</Button>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={data.list}
          // pagination={{ hideOnSinglePage: true, current: data.page.page, defaultPageSize: page.size, total: data.page.dataTotal }}
          // onChange={pageChangeHandle}
        />
      </PageWrap>
    </div>
  )
  async function getKnowpointList() {
    const res: any = await apigetKnowpointList({})
    console.log(res);
    if (res.code === 200) {
      res.data.list.map((item: any) => {
        item.key = nanoid()
      })
      setData(res.data)
    }
  }
}

export default workMaintenance