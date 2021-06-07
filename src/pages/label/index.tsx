import React, { FC, useEffect, useState } from 'react';
import { connect } from 'umi';

import { LabelsState, Loading } from '@/models/connect';
import { Dispatch } from 'umi';
import { Menu, Dropdown, Button, Modal, Radio } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import InputComponent from '@/components/inputComponent';
import SelectComponent from '@/components/selectComponent';
import TableComponent from '@/components/tableComponent';
import { getHotKey, getWordColor } from '@/utils/utils';
import { SwatchesPicker, ChromePicker } from 'react-color';
import styles from './index.less';

type RecordType = {};

export interface LabelsProps {
  datas: LabelsState;
  dispatch: Dispatch;
}

interface DataType {
  name: number;
}

const Datas: FC<LabelsProps> = ({ datas, dispatch, loading }) => {
  const { searchVal, labelList } = datas;
  const [uploadVisible, setUploadVisible] = useState(false);
  const [creatVisible, setCreatVisible] = useState(false);
  const [hotkey, setHotkey] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('#22194D');

  const onInputChange = (e: any) => {
    dispatch({
      type: 'labels/save',
      payload: {
        searchVal: e.target.value,
      },
    });
  };

  // 确定创建标签
  const handleOkCreate = () => {
    setCreatVisible(false);
  };

  // 取消创建标签
  const cancelCreate = () => {
    setCreatVisible(false);
  };

  // 确定上传导入数据
  const handleOkUpload = () => {};

  // 取消上传弹框
  const cancelUpload = () => {
    setUploadVisible(false);
  };

  const columns: ColumnsType<RecordType> = [
    {
      title: '标签名称',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '快捷键',
      dataIndex: 'question',
    },
    {
      title: '颜色',
      dataIndex: 'callNo',
      ellipsis: true,
    },
  ];

  const onClickUpload = async ({ key }: any) => {
    if (key === 'input') {
      setUploadVisible(true);
    } else if (key === 'create') {
      setCreatVisible(true);
    }
  };

  const handleChangeComplete = (color: any) => {
    setBackgroundColor(color.hex);
    console.log(color.hex);
  };

  const menu = (
    <Menu onClick={onClickUpload}>
      <Menu.Item key="create">创建标签</Menu.Item>
      <Menu.Item key="input">导入标签</Menu.Item>
      <Menu.Item key="output">导出标签</Menu.Item>
    </Menu>
  );

  const selectHotKeyChange = (e: string | number) => {
    console.log(e);
    setHotkey(e);
  };

  const rowSelection: any = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      );
    },
    type: 'checkbox',
  };

  return (
    <div>
      <div className={styles.header}>
        <div>
          <InputComponent
            value={searchVal}
            onInputChange={onInputChange}
            placeholder="标签名称查询"
          />
        </div>
        <div>
          <Dropdown overlay={menu}>
            <Button type="primary">
              操作 <DownOutlined />
            </Button>
          </Dropdown>
          <div style={{ display: 'inline-block', marginLeft: 8 }}>
            <Button disabled>删除</Button>
          </div>
        </div>
      </div>
      <div className={styles.table}>
        <TableComponent
          rowSelection={rowSelection}
          columns={columns}
          dataSource={labelList}
          rowKey="id"
          loading={false}
          bordered
        />
      </div>

      <Modal
        title={'上传项目'}
        visible={uploadVisible}
        onOk={handleOkUpload}
        onCancel={cancelUpload}
        destroyOnClose
      >
        <div>
          <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
            选择格式文件
          </div>
          <Radio defaultChecked>JSONL</Radio>
        </div>
      </Modal>
      <Modal
        title={'创建标签'}
        visible={creatVisible}
        onOk={handleOkCreate}
        onCancel={cancelCreate}
        bodyStyle={{ overflow: 'auto' }}
        destroyOnClose
      >
        <div>
          <InputComponent
            title="标签名称"
            value={searchVal}
            onInputChange={onInputChange}
            style={{ width: 300 }}
            placeholder="请输入标签名称"
          />
          <div style={{ marginLeft: 14, marginTop: 16 }}>
            <SelectComponent
              style={{ width: 300 }}
              title="快捷键"
              value={hotkey}
              options={getHotKey()}
              selectChange={selectHotKeyChange}
              placeholder="请选择快捷键"
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              paddingLeft: 64,
              marginTop: 16,
            }}
          >
            <ChromePicker
              color={backgroundColor}
              onChangeComplete={handleChangeComplete}
            />
            <div style={{ marginTop: 16 }}>
              <SwatchesPicker
                color={backgroundColor}
                onChangeComplete={handleChangeComplete}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default connect(
  ({ datas, loading }: { datas: LabelsState; loading: Loading }) => ({
    datas,
    loading,
  }),
)(Datas);
