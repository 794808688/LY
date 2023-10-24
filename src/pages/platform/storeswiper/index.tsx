import * as React from 'react'
import PageWrap from '~/components/component/PageWrap'
import { Button, Divider, Form, Input, message, Modal, Popconfirm, Radio, Select, Spin, Table, Tag, Tooltip, Upload } from 'antd'
const { Search } = Input
import { ApiOutlined, BarsOutlined, DeleteOutlined, ExclamationCircleOutlined, FormOutlined, UploadOutlined } from '@ant-design/icons';
import { apigetaddStoreSwiper, apigetdelStoreSwiper, apigetstoreSwiper, apigetupdateStoreSwiper, apiGetPlan } from './service';
import AdminConfig from '~/config';
import { nanoid } from 'nanoid'
import store from '~/store'
import { getDateAll } from '~/utils/public';
import './index.scss'


export default function StoreSwiper() {
  const [form] = Form.useForm()
  const user = store.getState().user
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<any[]>([]);
  const [Logo, setLogo] = React.useState<any>({});
  const [type, setType] = React.useState<string>('')
  const [record, setrecord] = React.useState<any>();
  const [fileList, setFileList] = React.useState<any>()
  const logoRef: any = React.useRef()
  logoRef.current = logoRef.current ? logoRef.current : { resource: [] }
  const urlRef: any = React.useRef()
  urlRef.current = urlRef.current ? urlRef.current : { resource: [] }
  const [planlist, setPlanlist] = React.useState<any[]>([]);


  React.useEffect(() => {
    // agetstoreSwiper()
  }, [])

  const columns: any = [
    {
      title: '序号',
      render: (text: any, record: any, index: any) => (
        <div>{index + 1}</div>
      )
    },
    {
      title: '图片标题',
      dataIndex: 'title',
    },
    {
      title: '图片',
      dataIndex: 'logo',
      render: (_: any, record: any, key: React.Key) => (
        <div className='columns-render-img'>
          <a target="blank" href={AdminConfig.API_SOURCE + '/' + record.logo}><img src={AdminConfig.API_SOURCE + '/' + record.logo} alt="" /></a>
        </div>
      )
    },
    // {
    //   title: '跳转链接',
    //   dataIndex: 'url',
    //   render: (_: any, record: any, key: React.Key) => (
    //     <div className='columns-render-url margin-auto' style={{ width: 250 }}>
    //       <Search value={record.url} onSearch={onSearch} enterButton={<ApiOutlined />} size='small' />
    //     </div>
    //   )
    // },
    {
      title: '权重',
      dataIndex: 'weight',
    },
    {
      title: '状态',
      dataIndex: 'visiable',
      render: (_: any, record: any) => (
        record.visiable == '0' ? <Tag color="default">隐藏</Tag> : <Tag color="success">显示</Tag>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'time',
      render: (_: any, record: any) => (
        <span>{getDateAll(record.time * 1000, 'y-m-d 时:分:秒')}</span>
      )
    },
    {
      title: '更新时间',
      dataIndex: 'utime',
      render: (_: any, record: any) => (
        record.utime == '0' ? <span>{record.utime}</span> :
          <span>{getDateAll(record.utime * 1000, 'y-m-d 时:分:秒')}</span>
      )
    },
    {
      title: '操作',
      fixed: 'right',
      width: 100,
      render: (_: any, record: any, key: React.Key) =>
      (<div>
        <span className='cursor-pointer-hover' onClick={() => showModal('updata', record)}>编辑</span>
        <Divider type="vertical" style={{ margin: '0 10px', backgroundColor: '#bbb' }} />
        <span className='cursor-pointer' style={{ color: '#ff4d4f' }} onClick={() => handleDelete(record.id)}>删除</span>
      </div>
      )
    },
  ];

  //跳转链接
  const onSearch = (value: string) => {
    window.open(value)
  }
  //删除
  const handleDelete = (id: any) => {
    Modal.confirm({
      title: '系统提示',
      icon: <ExclamationCircleOutlined />,
      content: '此操作将永久删除该轮播图片, 是否继续?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        getdelStoreSwiper(id)
      }
    });
  };

  //添加编辑轮播图   
  const showModal = (type: string, record?: any) => {
    GetPlan()
    form.resetFields()
    setFileList([])
    if (type == 'updata') {
      form.setFieldValue('title', record.title)
      form.setFieldValue('url', record.url && record.url.split("=").length > 1 && record.url.split("=")[1])
      form.setFieldValue('weight', record.weight)
      form.setFieldValue('visiable', record.visiable)
      form.setFieldValue('logo', record.logo)
      const agreement = [{
        name: record.logo,
        status: 'done',
        uid: '',
        url: AdminConfig.API_SOURCE + '/' + record.logo,
        response: {
          code: 200,
          data: {
            icloudid: record.id,
            path: record.logo,
            url: AdminConfig.API_SOURCE + '/' + record.logo,
          },
        }
      }]
      setFileList(agreement)
      logoRef.current.resource = agreement
    }
    setIsModalOpen(true);
    setType(type)
    setrecord(record)

  };

  //添加轮播图确定按钮
  const handleOk = async () => {
    const values = await form.validateFields()
    const params: any = {
      url: `/videoDetails?id=${values.url}`,
      visiable: values.visiable,
      weight: values.weight,
      title: values.title,
    }
    if (type == 'add') {
      getaddStoreSwiper(params)
    } else if (type == 'updata') {
      getupdateStoreSwiper(params)
    }
    setIsModalOpen(false)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const props: any = {
    name: 'Filedata',
    accept: ".bmp,.gif,.png,.jpeg,.jpg",
    action: `${AdminConfig.API_URL}${AdminConfig.LOCAL_PATH}?mod=9&do=901&type=73&uid=${user.uid}&localstore=${user.localstore}`,
    headers: {
      authorization: 'authorization-text',
    },
    maxCount: 1,
    fileList: fileList,
    onChange(info: any) {
      let files: any[] = [...info.fileList]
      logoRef.current.resource = files
      setFileList(files)
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        setLogo(info.file.response.data.path)
        message.success(`${info.file.name} 上传成功`);
        files[files.length - 1].url = AdminConfig.API_SOURCE + '/' + info.file.response.data.path
        setFileList(files)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };

  return (
    <div className='StoreSwiper'>
      {/* 添加编辑轮播 */}
      <Modal className='StoreSwiper-Modal' title={type == "add" ? "新增" : "编辑"} maskClosable={false} visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
          autoComplete="off"
        >
          <Form.Item label="图片题目" name="title" >
            <Input />
          </Form.Item>
          <Form.Item label="图片" name="logo"
            rules={[{ required: true, message: '请上传文件!' }]}>
            <div className='display-flex StoreSwiper-Modal-upload'>
              <Upload {...props} listType="picture" className="StoreSwiper-Modal-upload-list-inline">
                <Button style={{ marginRight: 5 }}><UploadOutlined />上传</Button>
              </Upload>
            </div>
          </Form.Item>
          <Form.Item label="跳转链接" name="url"  >
            <Select
              placeholder='选择课程'
              options={planlist}
              fieldNames={{ value: 'id', label: 'ptitle' }}
              showSearch
              allowClear
              filterOption={(input, option) =>
                (option?.ptitle ?? '').toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item label="权重" name="weight">
            <Input type='number' min={0} />
          </Form.Item>
          <Form.Item label="状态" name="visiable" initialValue='1'>
            <Radio.Group>
              <Radio value='0'>隐藏</Radio>
              <Radio value='1'>显示</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>

      <PageWrap>
        <div className=''>
          <div style={{ marginBottom: 20 }} className='display-flex justify-content-space-between'>
            <div></div>
            <Button type="primary" onClick={() => showModal('add')}>
              新建轮播
            </Button>
          </div>
          <Spin spinning={loading}>
            <Table
              className='storeswiper-table'
              rowKey={row => row.id}
              columns={columns}
              dataSource={data}
              size='small'
            />
          </Spin>
        </div>
      </PageWrap>
    </div>
  )

  //获取轮播图列表
  async function agetstoreSwiper() {
    setLoading(true)
    const res: any = await apigetstoreSwiper({ visiable: -1, type: '73' })
    setLoading(false)
    if (res && res.code == 200) {
      res && res.data && res.data.list && res.data.list.map((item: any) => {
        item.key = nanoid()
      })
      setData(res.data.list)
    }
  }

  //删除轮播图
  async function getdelStoreSwiper(id: any) {
    const res: any = await apigetdelStoreSwiper({ id: id, type: '73' })
    if (res.code == 200) {
      message.success('删除成功')
      // message.warning('修改配置数据有一定的延迟，请稍后查看')
      agetstoreSwiper()
    }
  }

  //新增商城轮播
  async function getaddStoreSwiper(params: any) {
    const res: any = await apigetaddStoreSwiper({ logo: Logo, ...params, type: '73' })
    if (res.code == 200) {
      message.success('新增成功')
      // message.warning('修改配置数据有一定的延迟，请稍后查看')
      agetstoreSwiper()
    }
  }

  //修改商城轮播
  async function getupdateStoreSwiper(params: any) {
    const res: any = await apigetupdateStoreSwiper({ id: record.id, logo: logoRef.current.resource.length > 0 ? logoRef.current.resource[0].response.data.path : '', ...params, type: '73' })
    if (res.code == 200) {
      message.success('修改成功')
      // message.warning('修改配置数据有一定的延迟，请稍后查看')
      agetstoreSwiper()
    }
  }
  //获取课程列表
  async function GetPlan() {
    const res: any = await apiGetPlan({})
    if (res.code === 200) {
      setPlanlist(res.data.list)
    }
  }
}