import * as React from 'react'

import { Button } from 'antd'

type Props = {
  onClickResourceLibraryModalHandler: (type: 'open' | 'close') => void
}
const PersonalResources: React.FC<Props> = ({ onClickResourceLibraryModalHandler }) => {
  return (
    <div className="personal-resources-container">
      <div className="tab-box display-flex">
        <div className="menus-box">
          <div className="menu"></div>
        </div>

        <div className="list-box">
          <div className="actions display-flex justify-content-space-between"></div>

          <div className="resource-list"></div>
        </div>
      </div>

      <div className="confirm-cancel display-flex justify-content-end padding-top-10">
        {/* <div className="cancel">
          <Button>关闭</Button>
        </div>

        <div className="confirm padding-left-10">
          <Button type="primary">添加</Button>
        </div> */}
      </div>
    </div>
  )
}

export default PersonalResources
