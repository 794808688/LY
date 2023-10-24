import { Modal, Pagination, Transfer } from 'antd'
import React, { useState, useEffect } from 'react'
import './index.scss'

export default function IntegrationTransfer(props: any) {
    const [mockData, setMockData] = useState<any[]>(props.dataSource);
    const [targetKeys, setTargetKeys] = useState<string[]>(props.targetKeys);

    useEffect(() => {
        setMockData(props.dataSource)
        setTargetKeys(props.targetKeys)
    }, []);
    const filterOption = (inputValue: string, option: any) =>
        option.title.indexOf(inputValue) > -1;

    const handleChange = (newTargetKeys: string[]) => {
        newTargetKeys = Array.from(new Set(newTargetKeys))
        setTargetKeys(newTargetKeys);
    };
    const handleSearch = (dir: any, value: string) => {
        console.log('search:', dir, value);
    };

    return (
        <Modal
            title={props.title}
            visible={props.visible}
            onOk={() => props.onOk(targetKeys)}
            onCancel={props.onCancel}
            className='integrationTransfer'
            width={props.width}
            maskClosable={false}
            okText='提交'
            destroyOnClose={true}
        >
            <Transfer
                dataSource={mockData}
                showSearch
                filterOption={filterOption}
                targetKeys={targetKeys}
                onChange={handleChange}
                onSearch={handleSearch}
                render={item => item.title}
                oneWay={true}
            />
            {/* <div className='integrationTransfer-pagination'>
                <div className='integrationTransfer-pagination-item'><Pagination simple total={50} /></div>
                <div style={{ width: '24px', opacity: 0, margin: '0 8px' }}></div>
                <div className='integrationTransfer-pagination-item'><Pagination simple total={50} /></div>
            </div> */}
        </Modal>
    )
}