import { Button, Divider, Form, Input, Modal, Select, Table, Tree, message } from 'antd'
import * as React from 'react'
import PageWrap from '~/components/component/PageWrap'
import { apiGetRole, apiaddRole, apideleteRole, apimodRole } from './service';
import MenuList from '~/config/menu.json';
import type { DataNode } from 'antd/es/tree';
import { useMemo } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';

export default function role() {
  const [form] = Form.useForm()
  const { MENUS } = MenuList
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [type, settype] = React.useState(false);
  const [data, setData] = React.useState<any[]>([])

  const [expandedKeys, setExpandedKeys] = React.useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = React.useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = React.useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = React.useState<boolean>(true);
  const treeData = useMemo(() => renderTree(MENUS), [MENUS]);
  const [record, setRecord] = React.useState<any>({})

  function renderTree(menuList: any[]): DataNode[] {
    const list: DataNode[] = [];

    menuList.forEach(menu => {
      if (menu.children) {
        list.push({
          title: menu.name,
          key: menu.id!.toString(),
          children: renderTree(menu.children),
        });
      } else {
        list.push({ title: menu.name, key: menu.id!.toString() });
      }
    });

    return list;
  }
  React.useEffect(() => {
    GetRole()
  }, [])
  const columns: any[] = [
    {
      title: '序号',
      render: (text: any, record: any, index: any) => (
        <div>{index + 1}</div>
      )
    },
    {
      title: '角色名称',
      dataIndex: 'sname',
    },
    {
      title: '权限等级',
      dataIndex: 'lv',
      render: (text: any, record: any) => (
        record.lv == '1' ? '普通' : record.lv == '2' ? '运维' : record.lv == '3' ? '管理员' : ''
      )
    },
    {
      title: '操作',
      width: 120,
      fixed: 'right',
      render: (text: string, record: any) => (
        <div>
          <span className='cursor-pointer-hover' onClick={() => showModal('up', record)}>编辑</span>
          {record.authid > 5 ? <><Divider type="vertical" style={{ margin: '0 10px', backgroundColor: '#bbb' }} /><span className='cursor-pointer' style={{ color: '#ff4d4f' }} onClick={() => delrole(record)}>删除</span></> : null}
        </div>
      ),
    },
  ];

  //打开编辑
  const showModal = (type: string, record?: any) => {
    if (type === 'add') {
      settype(false)
      setCheckedKeys([]);
      setExpandedKeys([]);
      setSelectedKeys([]);
      form.resetFields()
      setRecord({})
    } else {
      setRecord(record)
      form.setFieldsValue(record)
      if (record && record.authid) {
        let roledata: any = record
        let ids = roledata.auth ? roledata.auth.split(',') : ''
        const keys = ids ? ids.map((id: any) => `${id}`) : []
        setCheckedKeys(keys);
        setExpandedKeys(keys);
        setSelectedKeys(keys);
      }
      settype(true)
    }
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    const valu: any = await form.validateFields()
    const values: any = await form.getFieldsValue()
    let params: any = {
      sname: values.sname,
      auth: checkedKeys.join(','),
      authid: values.authid,
      lv: values.lv
    }
    if (!type) {
      addRole(params)
    } else {
      modRole(params)
    }
    setIsModalOpen(false)
  }
  //删除
  const delrole = (record: any) => {
    Modal.confirm({
      title: '系统提示',
      icon: <ExclamationCircleOutlined />,
      content: '此操作将永久删除该角色, 是否继续?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        delRole(record.authid)
      },
    });
  };

  //菜单权限
  const onExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  const onCheck = (checkedKeysValue: any) => {
    setCheckedKeys(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <div className='platform-role'>
      <Modal title={type ? '编辑角色' : '新建角色'} visible={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          {type ? <Form.Item
            label="角色ID"
            name="authid"
          >
            <Input disabled />
          </Form.Item> : null}

          <Form.Item
            label="角色名称"
            name="sname"
            rules={[{ required: true, message: '请输入角色名称!' }]}
          >
            <Input placeholder='请输入角色名称' disabled={!record.authid ? false : record.authid > 5 ? false : true} />
          </Form.Item>
          <Form.Item
            label="角色等级"
            name="lv"
            rules={[{ required: true, message: '请输入角色名称!' }]}
          >
            <Select
              placeholder='请选择角色等级'
              disabled={!record.authid ? false : record.authid > 5 ? false : true}
              options={[
                { value: 1, label: '普通' },
                { value: 2, label: '运维' },
                { value: 3, label: '管理员' },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="菜单权限"
            name="auth"
          >
            <Tree
              checkable
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onCheck={onCheck}
              checkedKeys={checkedKeys}
              onSelect={onSelect}
              selectedKeys={selectedKeys}
              treeData={treeData}
              selectable={false}
            />
          </Form.Item>
        </Form>
      </Modal>
      <PageWrap>
        <div className="display-flex align-items-center margin-bottom-20 justify-content-space-between">
          <div></div>
          <Button type="primary" onClick={() => showModal('add')}>新建角色</Button>
        </div>
        <Table columns={columns} dataSource={data} />
      </PageWrap>
    </div>
  )
  //获取角色
  async function GetRole() {
    const res: any = await apiGetRole({})
    if (res.code === 200) {
      res.data.list.map((item: any) => {
        item.key = nanoid()
      })
      setData(res.data.list)
    }
  }
  //新建角色
  async function addRole(params: any) {
    const res: any = await apiaddRole({ ...params })
    if (res.code === 200) {
      message.success('新增成功')
      GetRole()
    }
  }
  //修改角色
  async function modRole(params: any) {
    const res: any = await apimodRole({ ...params })
    if (res.code === 200) {
      message.success('修改成功')
      GetRole()
    }
  }
  //删除角色
  async function delRole(authid: any) {
    const res: any = await apideleteRole({ authid: authid })
    if (res.code === 200) {
      message.success('删除成功')
      GetRole()
    } else {
      message.error(res.msg)
    }
  }
}