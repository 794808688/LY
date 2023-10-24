import React, { memo } from 'react';
import './index.scss'
import classnames from 'classnames';
function PageWrap({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={className}
      // className={classnames('shadow', {className})}
      style={{
        padding: '20px',
        boxShadow: '0 2px 12px 0 rgba(0,0,0,.2)',
        width: '100%',
        marginBottom: '0px',
      }}
    >
      {children}
    </div>
  );
}

export default memo(PageWrap);
