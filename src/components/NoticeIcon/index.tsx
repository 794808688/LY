import React, { memo, useState, useCallback, useEffect } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { message } from 'antd';
import NavDropdown from '../LayoutNavBar/NavDropdown';
import NavBarItem from '../LayoutNavBar/NavBarItem';
import { IStoreState } from '../../store/types';
import { Settings } from '../../store/module/settings';
import {
  NoticeState,
  NoticeMessageModule,
  clearNoticeByKey,
  readNoticeByKeyAndIndex,
  NoticeKeyAndIndexAndCount,
} from '../../store/module/notice';
import renderNoticeTab from './NoticeTab';
import './index.less';
import { apiGetinfoNumber } from './service';

// interface NoticeIconProps {
//   theme: Settings['theme'];
//   notices: NoticeState;
//   clearNoticeByKey: (key: keyof NoticeState) => void;
//   readNoticeByKeyAndIndex: (action: NoticeKeyAndIndexAndCount) => void;
// }

function NoticeIcon() {
  const [infoNumber, setinfoNumber] = useState<number>(0)

  const getinfoNumber=(number:number)=>{
    setinfoNumber(number)
  }
  return (
    <NavDropdown
      overlay={renderNoticeTab(getinfoNumber)}
      trigger={['hover']}
      placement="topLeft"
    >
      <div
        className={classnames(
          'layout__navbar__menu-item',
          // `layout__navbar__menu-item--${props.theme}`,
        )}
      >
        {/* <NavBarItem
          // onClick={onNoticeIconClick}
          icon="bell"
          count={infoNumber}
          overflowCount={99}
        ></NavBarItem> */}
      </div>
    </NavDropdown>
  );
}

export default connect(({ settings: { theme }, notices }: IStoreState) => ({ theme, notices }), {
  clearNoticeByKey,
  readNoticeByKeyAndIndex,
})(memo(NoticeIcon));
