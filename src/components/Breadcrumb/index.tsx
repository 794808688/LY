import React, { memo, useState, useEffect } from 'react';
import { Link, Route, useHistory, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { IRoute } from '../../routers/config';
import './index.less';
import { getBreadcrumbs } from '../../routers/utils';

function Breadcrumbs() {
  const [breadcrumbs, setBreadcrumbs] = useState<IRoute[]>([]);

  const history = useHistory();
  const nowPath = useLocation().pathname

  useEffect(() => {
    setBreadcrumbs(getBreadcrumbs());

    const unListen = history.listen(() => {
      setBreadcrumbs(getBreadcrumbs());
    });

    return () => {
      unListen();
    };
  }, []);

  function navto(path:string,index:number,len:number){
    
    if(path == nowPath) return
    if(index == 0) {
      if(len-1-index > 1){
        history.go(-(len-1-index -1))
        return
      }
      window.location.reload();
      return;
    }
    console.log(len-1-index)
    history.go(-(len-1-index))
  }

  return (
    <div className="breadcrumb-container">
      <Breadcrumb>
        {breadcrumbs.map((route: IRoute,index:number) => (
          <Breadcrumb.Item key={route.path} onClick={()=>navto(route.path,index,breadcrumbs.length)}>
            {route.meta.title}
            {/* <Link to={route.path}>{route.meta.title}</Link> */}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
}

export default memo(Breadcrumbs);
