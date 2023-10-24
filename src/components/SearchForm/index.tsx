import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Col, Row, Switch } from 'antd'
import * as React from 'react'
import './index.scss'
const { Option } = Select;
export default function SearchForm(props: any) {
  const [expand, setExpand] = React.useState(false);
  const [form] = Form.useForm();
  const [check, setcheck] = React.useState(false);
  const getFields = () => {
    // const count = expand ? 10 : 10;
    const count = props.num ? props.num : 10
    const children = [];
    const arr = [5, 6, 7]
    const select = [1]
    for (let i = 0; i < count; i++) {
      children.push(
        <Col span={6} key={i}>
          <Form.Item
            name={props.formlist[i]?.name}
            label={props.formlist[i]?.label}
          >
            {(props.select ? props.select : select).includes(i) ? (
              <Select
                defaultValue=''
                options={props.options}
              />
            ) : (props.level ? props.level : []).includes(i) ? (
              <Select defaultValue=''>
                <Select.Option value=''>选择</Select.Option>
                <Select.Option value='0'>普通会员</Select.Option>
                <Select.Option value='1'>一级经销商</Select.Option>
                <Select.Option value='2'>二级经销商</Select.Option>
                <Select.Option value='3'>三级经销商</Select.Option>
                <Select.Option value='4'>四级经销商</Select.Option>
                <Select.Option value='5'>五级经销商</Select.Option>
                <Select.Option value='6'>六级经销商</Select.Option>
                <Select.Option value='7'>七级经销商</Select.Option>
                <Select.Option value='8'>八级经销商</Select.Option>
                <Select.Option value='9'>九级经销商</Select.Option>
              </Select>

            ) : (props.scope ? props.scope : arr).includes(i) ? (
              <div className='display-flex justify-content-space-between'>
                <Form.Item
                  // name={[props.formlist[i]?.name, 'for']}
                  name={'' + props.formlist[i]?.name + 'b'}
                  noStyle
                >
                  <Input style={{width:70}} placeholder={props.formlist[i]?.placeholder} />
                </Form.Item>
                <div>&nbsp;_&nbsp;</div>
                <Form.Item
                  // name={[props.formlist[i]?.name, 'st']}
                  name={'' + props.formlist[i]?.name + 'a'}
                  noStyle
                >
                  <Input style={{width:70}} placeholder={props.formlist[i]?.placeholder} />
                </Form.Item>
              </div>
            ) : (
              <Input placeholder={props.formlist[i]?.placeholder} />
            )}
          </Form.Item>
        </Col>,
      );
    }
    return children;
  };

  const onChange = (checked: boolean) => {
    setcheck(checked)
  }
  const reset = () => {
    form.resetFields()
    const values=form.getFieldsValue()
    props.onFinish(values)
  }
  return (
    <div className='searchform'>
      <div className='margin-bottom-10'><span style={{ fontSize: 13 }}>筛选条件：</span><Switch onChange={onChange} /></div>
      <div className='searchform-form' style={{ height: check ? props.height ? props.height : 210 : 0 }}>
        <Form
          form={form}
          name="advanced_search"
          className="ant-advanced-search-form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={props.onFinish}
        >
          <Row gutter={24}>{getFields()}</Row>
          <Row>
            <Col span={6} >
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button
                style={{ margin: '0 8px' }}
                onClick={reset}
              >
                重置
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );

}