import React, { memo, useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { CheckOutlined, CloseOutlined, SettingOutlined } from '@ant-design/icons'
import { Drawer, Tooltip, Divider, List, Select, Switch, Button } from 'antd'
import './index.less'
import { connect } from 'react-redux'
import { IStoreState } from '../../store/types'
import { Settings, updateLayoutSettings } from '../../store/module/settings'
import themeLists from '~/styles/themes/lists'

interface SettingsBodyProps {
  children: React.ReactNode
  title: string
}

function SettingsBody({ title, children }: SettingsBodyProps) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h3 className="layout__settings__title">{title}</h3>
      {children}
    </div>
  )
}

interface SettingsCheckBoxProps {
  value: string
  onChange: (key: any) => void
  list: {
    title: string
    key: string
    url: string
  }[]
}

function SettingsCheckBox({ list, onChange, value }: SettingsCheckBoxProps) {
  return (
    <div className="layout__settings__checkbox" key={value}>
      {list.map((item) => (
        <Tooltip title={item.title} key={item.key}>
          <div className="layout__settings__checkbox-item" onClick={() => onChange(item.key)}>
            <img src={item.url} alt={item.key} />
            <div
              className="layout__settings__checkbox--check"
              style={{
                display: value === item.key ? 'block' : 'none',
              }}
            >
              <CheckOutlined />
            </div>
          </div>
        </Tooltip>
      ))}
    </div>
  )
}

interface LayoutSettings {
  settings: Settings
  updateLayoutSettings: (settings: Settings) => void
  open: any
  onVisibleClick: (Visible: any) => void
}

function LayoutSettings(props: LayoutSettings) {
  const history = useHistory()
  const [visible, setVisible] = useState(false)

  const onVisibleClick = () => {
    setVisible(!visible)
  }

  const onChange = useCallback(
    (key: string, value: string | boolean) => {
      props.updateLayoutSettings({
        ...props.settings,
        [`${key}`]: value,
      })
    },
    [props.settings]
  )

  return (
    <Drawer
      placement="right"
      closable
      mask={true}
      // TODO：控制设置抽屉打开关闭
      visible={props.open}
      width={300}
      onClose={props.onVisibleClick}
      maskClosable={true}
      maskStyle={{ opacity: 0 }}
    // getContainer={false}
    // handler={
    //   <div
    //     className="layout__settings"
    //     style={{
    //       color: '#fff',
    //       fontSize: 20,
    //     }}
    //     onClick={onVisibleClick}
    //   >
    //     {visible ? <CloseOutlined /> : <SettingOutlined />}
    //   </div>
    // }
    >
      <SettingsBody title="整体风格设置">
        <SettingsCheckBox
          value={props.settings.theme}
          onChange={(value) => onChange('theme', value)}
          list={[
            {
              title: '暗黑菜单风格',
              key: 'dark',
              url: 'https://gw.alipayobjects.com/zos/antfincdn/XwFOFbLkSM/LCkqqYNmvBEbokSDscrm.svg',
            },
            {
              title: '亮色菜单风格',
              key: 'light',
              url: 'https://gw.alipayobjects.com/zos/antfincdn/NQ%24zoisaD2/jpRkZQMyYRryryPNtyIC.svg',
            },
          ]}
        />
      </SettingsBody>

      <Divider />

      <SettingsBody title="导航模式">
        <SettingsCheckBox
          value={props.settings.layout}
          onChange={(value) => onChange('layout', value)}
          list={[
            {
              title: '侧边菜单布局',
              key: 'side',
              url: 'https://gw.alipayobjects.com/zos/antfincdn/XwFOFbLkSM/LCkqqYNmvBEbokSDscrm.svg',
            },
            {
              title: '顶部菜单布局',
              key: 'top',
              url: 'https://gw.alipayobjects.com/zos/antfincdn/URETY8%24STp/KDNDBbriJhLwuqMoxcAr.svg',
            },
          ]}
        />
      </SettingsBody>

      <List
        split={false}
        dataSource={[
          {
            title: '内容区域宽度',
            action: (
              <Select
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                size="small"
                defaultValue={props.settings.contentWidth}
                onChange={(value: string) => onChange('contentWidth', value)}
              >
                {props.settings.layout === 'top' && <Select.Option value="fixed">定宽</Select.Option>}
                <Select.Option value="fluid">流式</Select.Option>
              </Select>
            ),
          },
          {
            title: '固定Header',
            action: <Switch size="small" defaultChecked={props.settings.fixedHeader} onChange={(value) => onChange('fixedHeader', value)} />,
          },
        ]}
        renderItem={(item) => (
          <List.Item style={{ justifyContent: 'space-between' }} actions={[item.action]}>
            <span>{item.title}</span>
          </List.Item>
        )}
        style={{ fontSize: '14px' }}
      />

      <Divider />

      <SettingsBody title="其他设置">
        <List
          split={false}
          renderItem={(item) => (
            <List.Item style={{ justifyContent: 'space-between' }} actions={[item.action]}>
              <span>{item.title}</span>
            </List.Item>
          )}
          dataSource={[
            {
              title: '色弱模式',
              action: <Switch size="small" checked={props.settings.colorWeak} onChange={(value) => onChange('colorWeak', value)} />,
            },
            {
              title: '主题设置',
              action: (
                <Select
                  getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  size="small"
                  // @ts-ignore
                  defaultValue={!localStorage.getItem('theme') ? themeLists[0].key : localStorage.getItem('theme')}
                  onChange={(value: string) => {
                    document.body.dataset.theme = value
                    localStorage.setItem('theme', value)
                  }}
                  style={{ width: '110px' }}
                >
                  {themeLists.map((item: any) => {
                    return (
                      <Select.Option key={item.key} value={item.key}>
                        <div className="setting-themes-item">
                          <div className="theme-bar">
                            <div className="bar-color" style={{ backgroundColor: item.color }}></div>
                          </div>
                          <div className="theme-name">
                            <span>{item.name}</span>
                          </div>
                        </div>
                      </Select.Option>
                    )
                  })}
                </Select>
              ),
            },
          ]}
          style={{ fontSize: '14px' }}
        />
      </SettingsBody>

      <Divider />

      <SettingsBody title="项目设置">
        <Button onClick={() => history.push('/project-config')}>点此设置</Button>
      </SettingsBody>
    </Drawer>
  )
}

export default connect(
  ({ settings }: IStoreState) => ({
    settings,
  }),
  {
    updateLayoutSettings,
  }
)(memo(LayoutSettings))
