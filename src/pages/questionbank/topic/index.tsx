import { Button, Divider, Form, Input, InputNumber, Modal, Radio, Select, Switch, Table, Tag, Tooltip, Tree, Upload, message } from 'antd'
import * as React from 'react'
import PageWrap from '~/components/component/PageWrap'
import { getDateAll } from '~/utils/public';
import { apidelInfo, apigetGetherList, apigetKnowpointList, apigetQuestionList, apigetTypeList, apisaveKnowpoint, apisaveQuestion, apitranslateExcel } from './service';
import { nanoid } from 'nanoid';
import { useHistory } from 'react-router-dom';
import { IRouteConfig } from '~/routers/config';
const { Search } = Input;
const { TextArea } = Input;
const { DirectoryTree } = Tree;
import Layoufourdiv from '~/components/Layoutfourdiv'
import SearchInput from '~/components/SearchInput';
import { CreditCardOutlined, DeleteOutlined, DownOutlined, ExclamationCircleOutlined, FileOutlined, FolderOutlined, FormOutlined, RightOutlined, UploadOutlined } from '@ant-design/icons';
import './index.scss'
import AdminConfig from '~/config';

export default function questionbankTopic() {
  const [page, setPage] = React.useState<{ page: number; size: number; total?: number }>({ page: 1, size: 10, total: 0, })
  const [data, setData] = React.useState<{ list: any[]; page: any }>({ list: [], page: {} })
  const [question, setQuestion] = React.useState<{ list: any[]; page: any }>({ list: [], page: {} })
  const [params, setparams] = React.useState<any>({})
  const history = useHistory()
  const [form] = Form.useForm()
  const [questionform] = Form.useForm()
  const [searchvalue, setsearchvalue] = React.useState<string>()
  const [selectedKeys, setSelectedKeys] = React.useState<any>()
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isquestionOpen, setIsQuestionOpen] = React.useState(false)
  const [type, settype] = React.useState<string>()
  const [record, setRecord] = React.useState<any>({})
  const [gether, setGether] = React.useState<any[]>([])
  const [dataSource, setDataSource] = React.useState<any[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<any>([]);
  const answers = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  const [questiontype, setQuestionType] = React.useState<number>(1);
  const [questiontypedata, setQuestionTypedata] = React.useState<any[]>([]);
  const [estimate, setEstimate] = React.useState<any[]>([
    { option_value: 'A', option_title: '正确', o_order: 1 },
    { option_value: 'B', option_title: '错误', o_order: 2 },
  ])
  const [qtype, setQtype] = React.useState<string>()
  const [addbutton, setAddButton] = React.useState(false)
  const [checked, setChecked] = React.useState(true)
  const [checkedpub, setCheckedpub] = React.useState(true)
  const [questionrecord, setQuestionRecord] = React.useState<any>({})
  const [paramsknow, setparamsknow] = React.useState<any>({})
  const [selectedRowKeysquestion, setSelectedRowKeysquestion] = React.useState<React.Key[]>([]);

  React.useEffect(() => {
    getQuestionList()
  }, [page, params])
  React.useEffect(() => {
    getKnowpointList()
  }, [paramsknow])
  React.useEffect(() => {
    getGetherList()
    getTypeList()
    setDataSource([
      { option_value: 'A', option_title: '', o_order: 1 },
      { option_value: 'B', option_title: '', o_order: 2 },
      { option_value: 'C', option_title: '', o_order: 3 },
      { option_value: 'D', option_title: '', o_order: 4 },
    ])
  }, [])
  //翻页
  const pageChangeHandle = ({ current, pageSize }: any) => {
    setPage({ page: current as number, size: pageSize as number })
  }
  const columns: any[] = [
    {
      title: '序号',
      dataIndex: 'id',
      width: 60,
      render: (text: any, record: any, index: number) => (
        (page.page - 1) * 10 + index + 1
      )
    },
    {
      title: '题型',
      dataIndex: 'type',
      width: 100,
      render: (text: any, record: any) => (
        questiontypedata.filter((value: any) => value.id == record.type)[0]?.name
      )
    },
    {
      title: '题目',
      dataIndex: 'question',
      width: 300,
      ellipsis: true,
    },
    {
      title: '题目图片',
      dataIndex: 'question_img',
      width: 100,
    },
    {
      title: '正确答案',
      dataIndex: 'answer',
      width: 150,
    },
    {
      title: '是否可用',
      dataIndex: 'is_enable',
      width: 100,
      render: (text: any, record: any) => (
        record.is_enable == 1 ? <Tag color="success">是</Tag> : <Tag color="error">否</Tag>
      )
    },
    {
      title: '更新时间',
      dataIndex: 'create_time',
      width: 100,
      render: (etxt: any, record: any) => (
        // new Date(record.create_time).toLocaleString()
        getDateAll(Date.parse(record.create_time), 'y-m-d 时:分')
      )
    },
    {
      title: '操作',
      width: 150,
      fixed: 'right',
      render: (text: string, record: any) => (
        <div>
          <div>
            <span className='cursor-pointer-hover' onClick={() => addquestion('up', record)}>编辑</span>
            <Divider type="vertical" style={{ margin: '0 10px', backgroundColor: '#bbb' }} />
            <span className='cursor-pointer' style={{ color: '#ff4d4f' }} onClick={() => delquestion(record)}>删除</span>
          </div>
        </div>
      ),
    },
  ];
  //搜索知识点
  const onSearchknow = (value: any) => {
    params.kname = value
    setparamsknow({ ...paramsknow })
  }
  //搜索题目
  const onSearch = (value: any) => {
    params.question = value
    setparams({ ...params })
    setPage({ page: 1, size: 10 })
  }

  const datas = (data: any) => {
    data.map((item: any) => {
      item.key = item.kid,
        item.parent = item.parent,
        item.icon = item.wid ? <CreditCardOutlined className='color' /> : <FileOutlined className='color' />
      item.title = <div className='FieldDelete flex'>
        <div className='treedata-text'><span>{item.kname}</span></div>
        <div className='treedata-show display-flex folder'>
          {item.parent == '0' || item.wid ? <Tooltip title="新建子知识点">
            <FileOutlined className='treedata-icon' onClick={() => upoccupation('son', item)} />
          </Tooltip> : null}
          {item.wid ? null : <> <Tooltip title="编辑知识点">
            <FormOutlined className='treedata-icon' onClick={() => upoccupation('up', item)} />
          </Tooltip>
            <Tooltip title="删除" >
              <DeleteOutlined className='treedata-icon red-icon' onClick={() => deloccupation(item)} />
            </Tooltip></>}
        </div>
      </div>
      if (item.children && item.children.length > 0) {
        datas(item.children)
      }
    })
    return data
  }

  //搜索
  const onSearchInput = () => {
    console.log(searchvalue)
  }
  const onSearchChange = (value: any) => {
    setsearchvalue(value.target.value)
  }

  //点击树
  const onSelect = (value: any, object: any) => {
    console.log(value, object.node)
    setSelectedKeys(object.node.kid)
    params.kid = object.node.kid
    setparams({ ...params })
    if (object.node.children || object.node.parent == '0') {
      setAddButton(false)
    } else {
      setAddButton(true)
    }

  }
  //删除知识点
  const deloccupation = (record: any) => {
    Modal.confirm({
      title: '系统提示',
      icon: <ExclamationCircleOutlined />,
      content: '此操作将永久删除该知识点, 是否继续?',
      okText: '确认',
      cancelText: '取消',
      async onOk() {
        let params: any = {
          database: 'knowpoint',
          key: 'kid',
          value: record.kid,
        }
        delknowpointInfo(params)
      }
    });
  }
  //新建知识点
  const upoccupation = (type: string, record?: any) => {
    settype(type)
    setRecord(record)
    if (type === 'son') {
      form.resetFields()
    } else {
      form.setFieldsValue(record)
    }
    setIsModalOpen(true)
  }
  //确定编辑
  const handleOk = async () => {
    const values: any = await form.validateFields()
    console.log(values);
    let params: any = {
      ...values,
      // score:"50"
    }
    if (values) {
      if (type == 'son') {
        params.sid = record.sid
        if (record.wid) {
          params.parent = 0
          saveKnowpoint(params)
        } else {
          params.parent = record.key
          saveKnowpoint(params)
        }
      } else {
        params.sid = record.sid
        params.kid = record.kid
        saveKnowpoint(params)
      }
    }
    setIsModalOpen(false)
  }

  //题目

  //删除题目
  const delquestion = (record: any) => {
    Modal.confirm({
      title: '系统提示',
      icon: <ExclamationCircleOutlined />,
      content: '此操作将永久删除该题目, 是否继续?',
      okText: '确认',
      cancelText: '取消',
      async onOk() {
        let params: any = {
          database: 'question',
          key: 'qid',
          value: record.qid,
        }
        delInfo(params)
      }
    });
  }
  const questioncolumns: any = [
    {
      title: '选项',
      dataIndex: 'option_value',
      width: 80,
      align: 'center',
      // render: (text: string, record: any, index: number) => (
      //   <span>{answers[index]}</span>
      // )
    },
    {
      title: '内容',
      dataIndex: 'option_title',
      render: (text: string, record: any, index: number) => (
        <Input defaultValue={record.option_title} value={record.option_title} onChange={(value) => onChangeinput(value, record, index)} />
      )
    },
    {
      title: '操作',
      width: 80,
      fixed: 'right',
      render: (text: string, record: any, index: number) => (
        <div>
          {questiontype == 3 ? null : <span className='cursor-pointer' style={{ color: '#ff4d4f' }} onClick={() => delcontent(index)}>删除</span>}
        </div>
      ),
    },
  ]
  //输入框变化
  const onChangeinput = (value: any, record: any, index: number) => {
    if (questiontype == 3) {
      estimate.map((item: any, num: number) => {
        if (num == index) {
          item.option_title = value.target.value
        }
      })
      setEstimate([...estimate])
    } else {
      dataSource.map((item: any, num: number) => {
        if (num == index) {
          item.option_title = value.target.value
        }
      })
      setDataSource([...dataSource])
    }
  }

  const onSelectChange = (selectedRowKeys: any, data: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection: any = {
    type: questiontype == 2 ? 'checkbox' : 'radio',
    selectedRowKeys,
    onChange: onSelectChange,
  };
  //批量导入题目
  const propsquestion: any = {
    name: 'filename',
    accept: '.xlsx',
    action: AdminConfig.API_URL + '/api/admin/uploadexcel',
    headers: {
      authorization: 'authorization-text',
    },
    showUploadList: false,
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        let params: any = {
          filename: info.file.response.data.info.filename,
          kid: selectedKeys
        }
        translateExcel(params)
        setTimeout(() => {
          getQuestionList()
        }, 300)

        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  }
  //题目图片
  const props: any = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  //选择题目类型
  const onChange = (value: any) => {
    setQuestionType(backtype(value.target.value))
  }
  //添加题目选项
  const addcontent = () => {
    dataSource.push({ o_order: dataSource.length + 1, option_value: answers[dataSource.length], option_title: '' })
    setDataSource([...dataSource])
  }

  //删除题目选项
  const delcontent = (index: number) => {
    dataSource.map((item: any, num: number) => {
      if (num == index) {
        dataSource.splice(index, 1)
      }
    })
    dataSource.map((item: any, num: number) => {
      item.option_value = answers[num]
      item.o_order = num + 1
    })
    setDataSource([...dataSource])
  }


  //回填类型
  const backtype = (id: any) => {
    return questiontypedata.filter((value: any) => value.id == id)[0].code
  }
  //编辑题目
  const addquestion = (type: string, record?: any) => {
    setQtype(type)
    if (type === 'up') {
      setQuestionRecord(record)
      questionform.setFieldsValue(record)
      setQuestionType(backtype(record.type))
      questionform.setFieldValue('type', record.type)
      setChecked(record.is_enable == 1 ? true : false)
      setCheckedpub(record.is_publish == 1 ? true : false)
      if (backtype(record.type) == 4 || backtype(record.type) == 5) {
        questionform.setFieldValue('content', record.answer)
      } else if (backtype(record.type) == 3) {
        setSelectedRowKeys([record.answer])
      } else {
        setSelectedRowKeys(record.answer.split(''))
        setDataSource(record.son)
      }
    } else {
      setQuestionType(1)
      setSelectedRowKeys([])
      setDataSource([
        { option_value: 'A', option_title: '', o_order: 1 },
        { option_value: 'B', option_title: '', o_order: 2 },
        { option_value: 'C', option_title: '', o_order: 3 },
        { option_value: 'D', option_title: '', o_order: 4 },
      ])
      questionform.resetFields()
    }
    setIsQuestionOpen(true)
  }

  //确定
  const handquestipnOk = async () => {
    const value: any = await questionform.validateFields()
    const values: any = await questionform.getFieldsValue()
    let params: any = {
      ...values,
      kid: selectedKeys,
      answer: questiontype == 4 || questiontype == 5 ? values.content : questiontype == 2 ? selectedRowKeys.join('') : selectedRowKeys[0],
      content: questiontype == 4 || questiontype == 5 ? [] : questiontype == 3 ? estimate : dataSource,
      // type: questiontypedata.filter((value: any) => value.code == values.type)[0].id,
      type: values.type,
      is_enable: checked == true ? 1 : 0,
      is_publish: checkedpub == true ? 1 : 0,
    }
    if (qtype == 'up') {
      params.qid = questionrecord.qid
      params.kid = questionrecord.kid
      saveQuestion(params)
    } else {
      saveQuestion(params)
    }

    setIsQuestionOpen(false)
  }
  //组卷
  const onSelectChangequestion = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeysquestion(newSelectedRowKeys);
  };
  const rowSelectionquestion = {
    preserveSelectedRowKeys: true,
    selectedRowKeysquestion,
    onChange: onSelectChangequestion,
  }
  const hasSelected = selectedRowKeysquestion.length > 0;
  return (
    <div className='questionbankTopic'>
      <Modal title='新建知识点' visible={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
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
          {/* <Form.Item
            label="学科"
            name="sid"
            rules={[{ required: true, message: '请选择学科!' }]}
          >
            <Select
              placeholder='选择学科'
              options={gether}
              fieldNames={{ value: 'sid', label: 'sname' }}
            />
          </Form.Item> */}
          <Form.Item
            label="详情说明"
            name="info"
          >
            <TextArea rows={4} placeholder="详情说明" />
          </Form.Item>
        </Form>
      </Modal>
      {/* 题目录入 */}
      <Modal title='新建题目' width={800} visible={isquestionOpen} onOk={handquestipnOk} maskClosable={false} onCancel={() => setIsQuestionOpen(false)}>
        <Form
          form={questionform}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="题目类型"
            name="type"
            initialValue={questiontypedata.filter((item: any) => item.t_order == 1)[0]?.id}
          >
            <Radio.Group onChange={onChange}>
              {questiontypedata.map((item: any) => {
                return <Radio value={item.id}>{item.name}</Radio>
              })
              }
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="题干"
            name="question"
            rules={[{ required: true, message: '请输入题干!' }]}
          >
            <TextArea rows={4} placeholder="题干" />
          </Form.Item>
          {/* <Form.Item
            label="题号"
            name="qnumber"
          >
            <Input placeholder='题号' />
          </Form.Item> */}
          <Form.Item
            label="题目图片"
            name="question_img"
          >
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>上传题目图片</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label={questiontype == 4 || questiontype == 5 ? "答案" : "题目选项"}
            name="content"
          >
            {questiontype == 4 || questiontype == 5 ? <Input placeholder='答案' /> : <><Table
              bordered
              dataSource={questiontype == 3 ? estimate : dataSource}
              columns={questioncolumns}
              pagination={false}
              rowSelection={rowSelection}
              rowKey='option_value'
            />
              {questiontype == 1 || questiontype == 2 ? <Button type='primary' className='margin-top-10' onClick={addcontent}>新建选项</Button> : null}</>}
          </Form.Item>
          <Form.Item
            label="题目解析"
            name="analysis"
          >
            <TextArea rows={4} placeholder="题目解析" />
          </Form.Item>
          <Form.Item
            label="排序"
            name="q_order"
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label="分值"
            name="score"
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label="备注"
            name="remark"
          >
            <Input placeholder='备注' />
          </Form.Item>
          <Form.Item
            label="是否可用"
            name="is_enable"
          >
            <Switch onClick={() => setChecked(!checked)} checked={checked} checkedChildren="是" unCheckedChildren="否" defaultChecked />
          </Form.Item>
          <Form.Item
            label="是否发布"
            name="is_publish"
          >
            <Switch onClick={() => setCheckedpub(!checkedpub)} checked={checkedpub} checkedChildren="是" unCheckedChildren="否" defaultChecked />
          </Form.Item>
        </Form>
      </Modal>
      <Layoufourdiv
        siderheader={
          <div className='h-[100%] px-[15px] flex justify-between items-center'>
            {/* <SearchInput width={250} onSearch={onSearchInput} onChange={onSearchChange} placeholder='搜索知识点' /> */}
            <Search placeholder='搜索知识点' style={{ width: 200 }} allowClear enterButton onSearch={onSearchknow} />
            {/* <Button type='primary' onClick={() => upoccupation('add')}>新建知识点</Button> */}
          </div>
        }
        sidercontent={
          <div className='budgetorganization costtype-sidercontent pl-[10px]'>
            {data.list.length > 0 && <DirectoryTree
              defaultExpandedKeys={['0']}
              defaultExpandAll
              onSelect={onSelect}
              treeData={[...datas(data.list)]}
              expandAction={false}
              selectedKeys={[selectedKeys]}
            />}
          </div>
        }
        siderfooter={
          <div className='costtype-siderfooter'>

          </div>
        }
        layoutheader={
          <div className='topic-layoutheader h-[100%] px-[15px] flex justify-between items-center'>
            {/* <SearchInput width={250} onSearch={onSearchInput} onChange={onSearchChange} placeholder='搜索题目' /> */}
            <Search placeholder='请输入题目' style={{ width: 200 }} allowClear enterButton onSearch={onSearch} />
            <div className='flex items-center'>
            <Button type='primary' disabled={!hasSelected} className='mx-[10px]'>组卷</Button>
              <Button type='primary' onClick={() => window.location.href = 'https://edu.zfzcn.com/zfzdata/export/题库导入模板.xlsx'}>下载模板</Button>
              <Upload {...propsquestion}>
                <Button type='primary' className='mx-[10px]'>批量导入</Button>
              </Upload>
              <Button type='primary' onClick={() => addquestion('add')}>新建题目</Button></div>
          </div>
        }
        layoutcontent={
          <div className='costtype-layoutcontent'>
            <Table
              rowKey={'id'}
              columns={columns}
              dataSource={question.list}
              expandable={{
                expandRowByClick: true,
                expandIcon: () => null,
                expandIconColumnIndex: 3,
                expandedRowRender: record => <p style={{ margin: 0 }}>{record.son.length > 0 ? record.son.map((item: any) => {
                  return <p className='px-[20px]'>{item.option_value}、{item.option_title}</p>
                }) : record.answer}</p>,
              }}
              rowSelection={rowSelectionquestion}
              // pagination={{ hideOnSinglePage: true, current: data.page.page, defaultPageSize: page.size, total: data.page.dataTotal }}
              onChange={pageChangeHandle}
              scroll={{ x: 1200 }}
            />

          </div>
        }
        layoutfooter={
          <div></div>
        }
      />
    </div>
  )
  //获取知识结构列表
  async function getKnowpointList() {
    const res: any = await apigetKnowpointList({ ...paramsknow })
    const resg: any = await apigetGetherList({})
    if (res.code === 200) {
      res.data.list.map((item: any) => {
        item.key = item.kid
        item.key = nanoid()
      })
      resg.data.list.map((item: any) => {
        item.kname = item.sname
        item.key = item.sid
        item.children = []
        res.data.list.map((it: any) => {
          if (it.sid == item.sid) {
            item.children.push(it)
          }
        })
      })
      console.log(resg.data.list);
      setData(resg.data)
    }
  }
  //保存知识结构
  async function saveKnowpoint(params: any) {
    const res: any = await apisaveKnowpoint({ ...params })
    if (res.code === 200) {
      getKnowpointList()
      message.success('新建成功')
    }
  }
  //获取学科列表
  async function getGetherList() {
    const res: any = await apigetGetherList({})
    if (res.code === 200) {
      res.data.list.map((item: any) => {
        item.key = nanoid()
      })
      setGether(res.data.list)
    }
  }
  //获取题目列表
  async function getQuestionList() {
    const res: any = await apigetQuestionList({ ...params })
    if (res.code === 200) {
      res.data.list.map((item: any) => {
        item.key = nanoid()
        item.son = item.children
        delete item.children
      })
      setQuestion(res.data)
    }
  }
  //题目录入
  async function saveQuestion(params: any) {
    const res: any = await apisaveQuestion({ ...params })
    if (res.code === 200) {
      setTimeout(() => {
        getQuestionList()
        message.success('题目录入成功')
      }, 500)
    }
  }
  //获取题目类型
  async function getTypeList() {
    const res: any = await apigetTypeList({})
    if (res.code === 200) {
      setQuestionTypedata(res.data.list)
    }
  }

  //删除题目
  async function delInfo(params: any) {
    const res: any = await apidelInfo({ ...params })
    if (res.code === 200) {
      getQuestionList()
      message.success('删除成功')
    }
  }
  //删除题目
  async function delknowpointInfo(params: any) {
    const res: any = await apidelInfo({ ...params })
    if (res.code === 200) {
      getKnowpointList()
      message.success('删除成功')
    }
  }
  //批量导入题目
  async function translateExcel(params: any) {
    const res: any = await apitranslateExcel({ ...params })
    if (res.code === 200) {
      getKnowpointList()
      message.success('导入成功')
    }
  }

}
