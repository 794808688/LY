import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import * as React from 'react'
import './index.scss'
export default function SearchInput(props: any) {

    return (
        <Input
            placeholder={props.placeholder}
            allowClear
            style={{ width: props.width ?? 200, backgroundColor: props.backgroundColor ?? '#f7f7f7' }}
            bordered={false}
            onChange={props.onChange}
            suffix={<SearchOutlined onClick={() => props.onSearch()} />}
            onPressEnter={() => props.onSearch()}
        />
    )
}