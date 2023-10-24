import React, { useEffect, useState } from 'react';
import { Tabs, Empty, List, Typography, Avatar } from 'antd';
import classnames from 'classnames';
import { NoticeState, NoticeMessageItem } from '../../store/module/notice';
import './NoticeTab.less';
import { apiGetinfoList, apiGetinfoNumber, apiGetinfoReaded } from './service';
import { getDateAll } from '~/utils/public';
import { IRouteConfig } from '~/routers/config';
import { useHistory } from 'react-router-dom'

function renderNoticeTab(getinfoNumber: (number:number) => void) {
  const [infoList, setinfoList] = React.useState<any>({ list: [], page: {}, })
  const history = useHistory()
  const [infoNumber, setinfoNumber] = useState<number>(0)
  const [Number,setNumber]= useState<number>(0)
  useEffect(() => {
    // GetinfoList()
    // GetinfoNumber()
  }, [])
  const GetinfoList = () => {
    apiGetinfoList({ isread: 2 })
      .then((res: any) => {
        if (res.code == 200) {
          setinfoList(res.data)
        }
      })
  }
  //设置消息已读
  const GetinfoReaded = (id?: number) => {
    apiGetinfoReaded({ id: id })
      .then((res: any) => {
        if (res.code == 200) {
          // GetinfoList()
          // GetinfoNumber()
        }
      })
  }
   //获取通知数量
   const GetinfoNumber=()=>{
    apiGetinfoNumber({})
    .then((res:any)=>{
      if(res.code==200) {
        // console.log(res);
        setinfoNumber(res.data.unreaded)
        setNumber(res.data.total)
        getinfoNumber(res.data.unreaded)
      }
    })
  }
  return (
    <div className="navbar__notice">
      <Tabs size="large" centered >
        <Tabs.TabPane tab={`消息(${Number})`} key="1">
          {/* {renderNoticeList()} */}
          <div>
            <List
              className="notice__list overflow-y-auto"
              style={{ height: 200 }}
              itemLayout="horizontal"
              dataSource={infoList.list}
              renderItem={(item: any, index) => (

                <List.Item
                  className={classnames('notice__item', {
                    'notice__item--read': item.isread == 1,
                  })}
                  // className={`${item.isread == 1 ? 'notice__item--read notice__item' : 'notice__item'}`}
                  // extra={<a onClick={() => history.push({ pathname: IRouteConfig.ordermanagement.to })}>查看</a>}
                  // onClick={() => GetinfoReaded(item.id)}
                >
                  <List.Item.Meta
                    className="notice__item-meta"
                    avatar={<Avatar src="../../../public/zt.jpeg" />}
                    title={
                      <div className="notice__item-title">
                        {item.msg}
                      </div>
                    }
                    description={
                      <div className="notice__item-time">{getDateAll(item.time * 1000, 'y-m-d 时:分')}</div>
                    }
                  />
                </List.Item>
              )}
            />
            <div className="navbar__notice__footer">
              <div className="navbar__notice__footer-title" onClick={() => GetinfoReaded()}>
                清空消息
              </div>
              <div className="navbar__notice__footer-title" >
                查看更多
              </div>
            </div>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default renderNoticeTab;
