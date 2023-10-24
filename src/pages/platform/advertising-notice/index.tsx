import { Button, Divider, Form, Input, Modal, Select, Table, Tag, message } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import PageWrap from '~/components/component/PageWrap'
import { apiaddSysNotice, apidelSysNotice, apieditSysNotice, apiemitSysNotice, apigetSysNoticeList } from './service';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { Search } = Input;
const { TextArea } = Input;

const advertisingNotice = () => {
  const [page, setPage] = React.useState<{ page: number; size: number; total?: number }>({ page: 1, size: 10, total: 0, })
  const [data, setData] = React.useState<{ list: any[]; page: any }>({ list: [], page: {} })
  const [form] = Form.useForm()
  const [params, setparams] = React.useState<any>({})
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [type, settype] = React.useState<String>('')
  const [record, setrecord] = React.useState<any>({})

  React.useEffect(() => {
    getSysNoticeList()
  }, [page])

  const pageChangeHandle = ({ current, pageSize }: any) => {
    setPage({ page: current as number, size: pageSize as number })
  }
  const columns: any = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '内容',
      dataIndex: 'content',
      width: 550,
      ellipsis: true,
    },
    {
      title: '类型',
      dataIndex: 'type',
      render: (text: any, record: any) => (
        record.type == 0 ? '首页公告' : ''
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text: any, record: any) => (
        record.status == 1 ? <Tag color="success">已发布</Tag> : <Tag color="default">待发布</Tag>
      )
    },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      render: (text: string, record: any) => (
        <div>
          {record.status == 0 ? <span className='cursor-pointer-hover' onClick={() => publish('up', record)}>发布</span> : <span className='cursor-pointer-hover' onClick={() => publish('no', record)}>取消发布</span>}
          <Divider type="vertical" style={{ margin: '0 10px', backgroundColor: '#bbb' }} />
          <span className='cursor-pointer-hover' onClick={() => showModal('up', record)}>编辑</span>
          <Divider type="vertical" style={{ margin: '0 10px', backgroundColor: '#bbb' }} />
          <span className='cursor-pointer' style={{ color: '#ff4d4f' }} onClick={() => reset(record)}>删除</span>
        </div>
      ),
    },
  ]

  //搜索
  const onSearch = (value: any) => {
    params.nickname = value
    setparams({ ...params })
    setPage({ page: 1, size: 10 })
  }
  //新建公告
  const showModal = (type: string, record?: any) => {
    settype(type)
    if (type == 'add') {
      form.resetFields()
    } else {
      setrecord(record)
      form.setFieldsValue(record)
    }
    setIsModalOpen(true)
  }

  //确定
  const handleOk = async () => {
    const values: any = await form.getFieldsValue()
    let params: any = {
      title: values.title,
      content: values.content,
      type: values.type
    }
    if (type == 'add') {
      addSysNotice(params)
    } else {
      editSysNotice({ ...params, id: record.id })
    }
    setIsModalOpen(false)
  }
  //删除公告
  const reset = (record: any) => {
    Modal.confirm({
      title: '系统提示',
      icon: <ExclamationCircleOutlined />,
      content: '此操作将永久删除该公告, 是否继续?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        delSysNotice({ id: record.id })
      }
    });
  }
  //发布
  const publish = (type: string, record: any) => {
    let params: any = {
      id: record.id,
    }
    if (type === 'up') {
      params.status = 1
      emitSysNotice(params)
    } else {
      params.status = 0
      emitSysNotice(params)
    }
  }

  return (
    <PageWrap>
      <Modal title={type == 'add' ? '新建公告' : '编辑公告'} visible={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="通知类型"
            name="type"
            rules={[{ required: true, message: '请输入账号!' }]}
            initialValue={0}
          >
            <Select
              options={[
                {
                  value: 0,
                  label: '首页公告',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入标题!' }]}
          >
            <Input placeholder='请输入标题' />
          </Form.Item>
          <Form.Item
            label="通知内容"
            name="content"
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
      <div className="display-flex align-items-center justify-content-space-between margin-bottom-20">
        <div>
          <Search placeholder='请输入标题' style={{ width: 200 }} allowClear enterButton onSearch={onSearch} />
        </div>
        <div>
          <Button type='primary' onClick={() => showModal('add')}>新建公告</Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data.list}
        pagination={{ hideOnSinglePage: true, current: data.page.page, defaultPageSize: page.size, total: data.page.dataTotal }}
        onChange={pageChangeHandle}
      />
    </PageWrap>
  )
  //获取列表
  async function getSysNoticeList() {
    const res: any = await apigetSysNoticeList({ ...page })
    if (res.code === 200) {
      setData(res.data)
    }
  }
  //新增公告
  async function addSysNotice(params: any) {
    const res: any = await apiaddSysNotice({ ...params })
    if (res.code === 200) {
      message.success('新增成功')
      getSysNoticeList()
    } else {
      message.error(res.msg)
    }
  }

  //编辑公告
  async function editSysNotice(params: any) {
    const res: any = await apieditSysNotice({ ...params })
    if (res.code === 200) {
      message.success('编辑成功')
      getSysNoticeList()
    } else {
      message.error(res.msg)
    }
  }

  //删除公告
  async function delSysNotice(params: any) {
    const res: any = await apidelSysNotice({ ...params })
    if (res.code === 200) {
      message.success('删除成功')
      getSysNoticeList()
    } else {
      message.error(res.msg)
    }
  }
  //发布公告
  async function emitSysNotice(params: any) {
    const res: any = await apiemitSysNotice({ ...params })
    if (res.code === 200) {
      message.success('操作成功')
      getSysNoticeList()
    } else {
      message.error(res.msg)
    }
  }

}
export default advertisingNotice