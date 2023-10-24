import React, { memo, useCallback, useState } from 'react'
import { Select, message } from 'antd'
import { connect } from 'react-redux'
import { IStoreState } from '../../store/types'
import { setUserInfo, UserState } from '~/store/module/user'
import store from '~/store'
import { apiGetSchoolList } from '~/api/service'

interface NodeDropdownProps {
  node: any[]
  autonode: number
  setUserInfo: (user: UserState) => void
}

function NodeList(props: NodeDropdownProps) {
  const [autonode, setAutonode] = useState<any>(props.autonode)

  React.useEffect(() => {
    initNode()
  }, [])

  const update = () => {
    getSchoolList()
  }

  const getSchoolList = async () => {
    try {
      let _user: UserState = store.getState().user
      _user.school = []
      props.setUserInfo(_user)
      //获取校区列表 正式服务需打开
      // const res = await apiGetSchoolList({})
      // if (res.code == 1) {
      //   _user.school = res.data
      //   props.setUserInfo(_user)
      // }
    } catch (error) {}
  }

  const checkNode = (nodeid: number) => {
    return (
      props.node.filter((item: any) => {
        if (item.nodeid == nodeid) return true
      }).length > 0
    )
  }

  const getNodebyI = (id: number) => {
    let item: any
    if (id > 0) {
      item = props.node.filter((item: any) => {
        if (item.nodeid == id) return true
      })[0]
      return item
    } else return null
  }

  const initNode = () => {
    let _autonode: number = checkNode(props.autonode) ? props.autonode : props.node[0]?.nodeid
    setAutonode(_autonode)

    if (_autonode > 0) {
      let _user: UserState = store.getState().user
      if (!_user.domain) {
        _user.domain = getNodebyI(_autonode).domain
        _user.autonode = _autonode
        props.setUserInfo(_user)
      }
    }
    update()
  }

  const onchange = useCallback((key) => {
    console.log(key)
    let _data: UserState = store.getState().user
    _data.autonode = parseInt(key)
    let item = getNodebyI(key)
    _data.domain = item?.domain
    props.setUserInfo(_data)
    update()
    message.success(item?.showname)
    window.location.reload()
  }, [])

  return (
    <Select
      getPopupContainer={(triggerNode) => triggerNode.parentNode}
      size="small"
      defaultValue={autonode + ''}
      onChange={(value: string) => onchange(value)}
      style={{ width: '130px' }}
    >
      {props.node.map((item: any) => {
        return (
          <Select.Option key={item.nodeid} value={item.nodeid + ''}>
            {item.showname}
          </Select.Option>
        )
      })}
    </Select>
  )
}

export default connect(({ user: { node, autonode } }: IStoreState) => ({ node, autonode }), {
  setUserInfo,
})(memo(NodeList))
