import React, { useContext, useState, useEffect, useRef } from 'react'
import { Table, Input, Form, InputNumber } from 'antd'
import { FormInstance } from 'antd/lib/form'
import './index.scss'
import { useDrag, useDrop } from "react-dnd";
import { dataType, ItemTypes, optionsTyps } from "~/utils/common";


export const DraggableBodyRow = (props:any) => {
  let {
    record,
    data,
    index,
    className,
    style,
    moveRow,
    findRow,
    ...restProps
  } = props;

  if (!record) return null;

  let {
    row: originalRow,
    rowIndex: originalIndex,
    rowParentIndex: originalParentIndex
  } = findRow(record.id);

  let itemObj = {
    id: record.id,
    parentId: record.parentId,
    index,
    isGroup: record.type === dataType.group,
    originalRow, // 拖拽原始数据
    originalIndex, // 拖拽原始数据索引
    originalParentIndex // 拖拽原始数据父节点索引
  };

  let isDrag = true;

  const ref = useRef();

  const [{ handlerId, isOver, dropClassName }, drop] = useDrop({
    accept: ItemTypes,
    collect: (monitor) => {
      const {
        id: dragId,
        parentId: dragParentId,
        index: dragPreIndex,
        isGroup
      }:any = monitor.getItem() || {};

      if (dragId === record.id) {
        return {};
      }

      // 是否可以拖拽替换
      let isOver = monitor.isOver();
      if (isGroup) {
        // 要覆盖的数据是分组，或者是最外层的子项可以替换，其他情况不可以
        let recordIsGroup = record.type === dataType.group;
        if (!recordIsGroup) {
          isOver = false;
        }
      } else {
        // 要覆盖的数据是子项，但不在同分组不可以替换
        if (dragParentId !== record.parentId) {
          isOver = false;
        }
      }

      return {
        isOver,
        dropClassName: "drop-over-downward",
        handlerId: monitor.getHandlerId()
      };
    },
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const dropIndex = index;
      // Don't replace items with themselves
      if (dragIndex === dropIndex) {
        return;
      }

      let opt = {
        dragId: item.id, // 拖拽id
        dropId: record.id, // 要放置位置行的id
        dropParentId: record.parentId,
        operateType: optionsTyps.hover // hover操作
      };

      // console.log("hover", opt);
      moveRow(opt);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = dropIndex;
    },
    drop: (item:any) => {
      let opt = {
        dragId: item.id, // 拖拽id
        dropId: record.id, // 要放置位置行的id
        dropParentId: record.parentId,
        operateType: optionsTyps.drop
      };
      // console.log('drop', item, opt);
      moveRow(opt);
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes,
    item: itemObj,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    // canDrag: (props, monitor) => isDrag //parentId不为0的才可以拖拽
    end: (item, monitor) => {
      const { id: droppedId, originalRow } = item;
      const didDrop = monitor.didDrop();
      // 超出可拖拽区域，需要将拖拽行还原
      if (!didDrop) {
        let opt = {
          dragId: droppedId, // 拖拽id
          dropId: originalRow.id, // 要放置位置行的id
          dropParentId: originalRow.parentId,
          originalIndex,
          originalParentIndex,
          operateType: optionsTyps.didDrop
        };
        // console.log("useDrag:", opt);
        moveRow(opt);
      }
    }
  });

  drop(drag(ref));

  // 拖拽行的位置显示透明
  const opacity = isDragging ? 0 : 1;

  return (
    <tr
      ref={ref}
      className={`${className}
      ${isOver ? dropClassName : ""} 
      ${isDrag ? "can-drag" : ""}`}
      style={isDrag ? { cursor: "move", opacity, ...style } : { ...style }}
      data-handler-id={handlerId}
      {...restProps}
    />
  );
};


const EditableContext = React.createContext<FormInstance<any> | null>(null)

interface Item {
  key?: string
  name?: string
  age?: string
  address?: string
  courseName?: string
  pageStr?: string
  pageStrs?: string
  pageStre?: string
}

interface EditableRowProps {
  index: number
}

export const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

interface EditableCellProps {
  title: React.ReactNode
  editable: boolean
  children: React.ReactNode
  dataIndex: keyof Item
  record: Item
  type: string
  min: string | number | undefined
  max: string | number | undefined
  handleSave: (record: Item) => void
}

export const EditableCell: React.FC<EditableCellProps> = ({ title, editable, children, dataIndex, record, type, min, max, handleSave, ...restProps }) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<any>(null)
  const form = useContext(EditableContext)!

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus()
    }
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({ [dataIndex]: record[dataIndex] })
  }

  const save = async () => {
    try {
      const values = await form.validateFields()

      toggleEdit()
      handleSave({ ...record, ...values })
    } catch (errInfo) {
      console.log('Save failed:', errInfo)
    }
  }

  let childNode = children

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title}为必填项`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} min={min} max={max} onBlur={save} type={type ? type : 'text'} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    )
  }

  return <td {...restProps}>{childNode}</td>
}

export type EditableTableProps = Parameters<typeof Table>[0]

export interface DataType {
  key?: string
  name?: string
  age?: string
  address?: string
  courseName?: string
  pageStr?: string
  pageStrs?: string
  pageStre?: string
  type?: number | string | undefined
  share_id?: string
  id?: number | string
  mark?: number | string | undefined
  score?: number | string | undefined
}

export interface EditableTableState {
  dataSource: DataType[]
  count: number
}

export type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>

export interface EditableCellProp extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}
export const EditableCells: React.FC<EditableCellProp> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};