import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, InputNumber, Modal, Radio, Select, Table, Tag, message } from 'antd'
import * as React from 'react'
import PageWrap from '~/components/component/PageWrap'
import { apiaddQuestionRule, apidelInfo, apideleteQuestionRule, apigetQuestionRule, apigetQuestionRuleList, apigetTypeList, apiupdateQuestionRule } from './service';
import { nanoid } from 'nanoid';
const { Search } = Input;
const { TextArea } = Input;
import store from '~/store'
import AdminConfig from '~/config';
import { getDateAll } from '~/utils/public';

const conditionsMaintenance = () => {
  const [page, setPage] = React.useState<{ page: number; size: number; total?: number }>({ page: 1, size: 10, total: 0, })
  const [data, setData] = React.useState<{ list: any[]; pages: any }>({ list: [], pages: {} })
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [form] = Form.useForm()
  const [params, setparams] = React.useState<any>({})
  const [type, settype] = React.useState<string>('')
  const [record, setrecord] = React.useState<any>({})
  const [typelist, setTypeList] = React.useState<any[]>([])
  const [questionruleinfo, setQuestionRuleinfo] = React.useState<any>({})
  const user = localStorage.getItem(AdminConfig.USER_KEY + '_' + AdminConfig.USER_KEY)

  React.useEffect(() => {
    getTypeList()
  }, [])
  React.useEffect(() => {
    getQuestionRuleList()
  }, [page, params])

  //翻页
  const pageChangeHandle = ({ current, pageSize }: any) => {
    setPage({ page: current as number, size: pageSize as number })
    console.log(current, pageSize);

  }
  const columns: any[] = [
    {
      title: '序号',
      dataIndex: '',
      render: (text: any, record: any, index: number) => (
        (page.page - 1) * 10 + index + 1
      )
    },
    {
      title: '名称',
      dataIndex: 'rname',
    },
    {
      title: '考试时长（分钟）',
      dataIndex: 'time_long',
    },
    {
      title: '考题数量',
      dataIndex: 'question_count',
      width: 100,
    },
    {
      title: '满分',
      dataIndex: 'total_score',
    },
    {
      title: '及格分数',
      dataIndex: 'pass_score',
    },
    {
      title: '是否可用',
      dataIndex: 'is_enable',
      render: (text: any, record: any) => (
        record.is_enable == 1 ? <Tag color="success">可用</Tag> : <Tag color="error">不可用</Tag>
      )
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      render: (text: any, record: any) => (
        getDateAll(record.create_time, 'y-m-d 时:分')
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
  const upoccupation = async (type: string, record: any) => {
    settype(type)
    if (type === 'up') {
      const res: any = await apigetQuestionRule({ rid: record.rid })
      form.setFieldsValue(record)
      setrecord(record)
      typelist.map((item: any, num: number) => {
        res.data.question_rule?.map((it: any, index: number) => {
          if (item.id == it.type) {
            item.count = it.count
            item.score = it.score
          }
        })
      })
      setTypeList([...typelist])
    } else {
      form.resetFields()
      typelist.map((item: any, num: number) => {
        item.count = ''
        item.score = ''
      })
      setTypeList([...typelist])
    }
    setIsModalOpen(true)
  }
  //删除
  const delccupation = (record: any) => {
    Modal.confirm({
      title: '系统提示',
      icon: <ExclamationCircleOutlined />,
      content: '此操作将永久删除该规则, 是否继续?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        deleteQuestionRule(record.rid)
      }
    });
  }
  //确定编辑
  const handleOk = async () => {
    const val = await form.validateFields()
    const values: any = await form.getFieldsValue()
    typelist.map((item: any) => {
      item.type = item.id
      delete item.code
      delete item.create_time
      delete item.t_order
    })
    let params: any = {
      ...values,
      question_rule: typelist,
      create_user: '7437949549473928',
    }
    if (type == 'add') {
      console.log(params);
      addQuestionRule(params)
    } else {
      params.rid = record.rid
      updateQuestionRule(params)
    }
    setIsModalOpen(false)
  }

  //搜索
  const onSearch = (value: any) => {
    params.search = value
    setparams({ ...params })
    setPage({ page: 1, size: 10 })
  }

  const questioncolumns: any = [
    {
      title: '题型',
      dataIndex: 'name',
    },
    {
      title: '数量',
      dataIndex: 'count',
      render: (text: any, record: any, index: number) => (
        <InputNumber defaultValue={record.count} value={record.count} onChange={(value) => onChangecount(value, record, index)} />
      )
    },
    {
      title: '每题分值',
      dataIndex: 'score',
      render: (text: any, record: any, index: number) => (
        <InputNumber defaultValue={record.score} value={record.score} onChange={(value) => onChangescore(value, record, index)} />
      )
    },
  ]
  //输入框变化
  const onChangecount = (value: any, record: any, index: number) => {
    typelist.map((item: any, num: number) => {
      if (num == index) {
        item.count = value
      }
    })
    setTypeList([...typelist])
  }
  //输入框变化
  const onChangescore = (value: any, record: any, index: number) => {
    typelist.map((item: any, num: number) => {
      if (num == index) {
        item.score = value
      }
    })
    setTypeList([...typelist])
  }

  return (
    <div className='workMaintenance'>
      <Modal title='编辑职业' width={800} visible={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="规则名称"
            name="rname"
            rules={[{ required: true, message: '请输入规则名称!' }]}
          >
            <Input placeholder="规则名称" />
          </Form.Item>
          <Form.Item
            label="考试时长(分钟)"
            name="time_long"
            rules={[{ required: true, message: '请输入考试时长!' }]}
          >
            <InputNumber min={1} placeholder="考试时长" />
          </Form.Item>
          <Form.Item
            label="题型数量"
            name="question_rule"
          >
            <Table
              columns={questioncolumns}
              dataSource={typelist}
              pagination={false}
            />
          </Form.Item>
          <Form.Item
            label="满分"
            name="total_score"
            rules={[{ required: true, message: '请输入满分!' }]}
          >
            <InputNumber min={1} placeholder="满分" />
          </Form.Item>
          <Form.Item
            label="及格分数"
            name="pass_score"
            rules={[{ required: true, message: '请输入及格分数!' }]}
          >
            <InputNumber min={1} placeholder="及格分数" />
          </Form.Item>
          <Form.Item
            label="考题数量"
            name="question_count"
            rules={[{ required: true, message: '请输入考题数量!' }]}
          >
            <InputNumber min={1} placeholder="考题数量" />
          </Form.Item>
          <Form.Item
            label="是否可用"
            name="is_enable"
            rules={[{ required: true, message: '请选择是否可用!' }]}
            initialValue={1}
          >
            <Radio.Group>
              <Radio value={1}>可用</Radio>
              <Radio value={0}>不可用</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="备注"
            name="remark"
          >
            <TextArea rows={4} placeholder="备注" />
          </Form.Item>
        </Form>
      </Modal>
      <PageWrap>
        <div className="display-flex align-items-center justify-content-space-between margin-bottom-20">
          <div>
            <Search placeholder='请输入规则名称' style={{ width: 200 }} allowClear enterButton onSearch={onSearch} />
          </div>
          <div>
            <Button type='primary' onClick={() => upoccupation('add', null)}>新建出题规则</Button>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={data.list}
          rowKey='id'
          pagination={{ hideOnSinglePage: true, current: data.pages.page, defaultPageSize: page.size, total: data.pages.total, showTotal: (total: any) => `共${total}条数据` }}
          onChange={pageChangeHandle}
        />
      </PageWrap>
    </div>
  )

  //获取出题规则列表
  async function getQuestionRuleList() {
    const res: any = await apigetQuestionRuleList({ ...page, ...params })
    if (res.code === 200) {
      res.data.list.map((item: any) => {
        item.type = nanoid()
      })
      setData(res.data)
    }
  }
  //获取题目类型
  async function getTypeList() {
    const res: any = await apigetTypeList({})
    if (res.code === 200) {
      res.data.list.map((item: any) => {
        item.type = item.name
      })
      setTypeList(res.data.list)
    }
  }
  //新增出题规则
  async function addQuestionRule(params: any) {
    const res: any = await apiaddQuestionRule({ ...params })
    if (res.code === 200) {
      getQuestionRuleList()
      message.success('新建成功')
    }
  }

  //修改出题规则
  async function updateQuestionRule(params: any) {
    const res: any = await apiupdateQuestionRule({ ...params })
    if (res.code === 200) {
      getQuestionRuleList()
      message.success('修改成功')
    }
  }

  //删除出题规则
  async function deleteQuestionRule(rid: any) {
    const res: any = await apideleteQuestionRule({ rid: rid })
    if (res.code === 200) {
      getQuestionRuleList()
      message.success('删除成功')
    }
  }
  //获取出题规则
  // async function apigetQuestionRule(rid: any) {
  //   const res: any = await apigetQuestionRule({ rid: rid })
  //   if (res.code === 200) {
  //     setQuestionRuleinfo(res.data)
  //   }
  // }


}

export default conditionsMaintenance