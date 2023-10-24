import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import AdminConfig from '../../config/index';
import './index.less';
import { Settings } from '../../store/module/settings';
import { useProjectConfig } from '~/stores';

interface LogoProps {
  opened: boolean;
  layout: Settings['layout'];
}

function Logo({ opened, layout }: LogoProps) {
  const [getPrjConf] = useProjectConfig((state) => [state.getPrjConf])
  console.log('getPrjConf().logo', getPrjConf().logo)

  return (
    <div
      className={classnames('layout__side-bar-logo-wrap', {
        'layout__side-bar-logo-wrap--close': !opened,
      })}
    >
      <Link to="/" className="layout__side-bar-link">
        {getPrjConf().logo && (
          <img src={AdminConfig.API_SOURCE + '/' + getPrjConf().logo} className="layout__side-bar-logo" alt="logo"></img>
        )}
        {(!opened || layout === 'top') && (
          <h1 className="layout__side-bar-title">{getPrjConf().name || '造风者平台'}</h1>
        )}
      </Link>
    </div>
  );
}

export default memo(Logo);
