import React, { FC, useEffect, useState } from 'react';
import { connect } from 'umi';

import { DatasState, Loading } from '@/models/connect';
import { Dispatch } from 'umi';
import { Menu, Dropdown, Button, Modal, Radio } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import InputComponent from '@/components/inputComponent';
import SelectComponent from '@/components/selectComponent';
import TableComponent from '@/components/tableComponent';

import Note from './note/index';

import styles from './index.less';

type RecordType = {};

export interface DatasProps {
  datas: DatasState;
  dispatch: Dispatch;
}

interface DataType {
  name: number;
}

const statusList = [
  { label: '全部', value: '' },
  { label: '已标注', value: '1' },
  { label: '未标注', value: '2' },
];

const Datas: FC<DatasProps> = ({ datas, dispatch, loading }) => {
  const { searchVal, selectVal, dataList } = datas;
  const [uploadVisible, setUploadVisible] = useState(false);

  const [tabType, setTabType] = useState('note');

  const onInputChange = (e: any) => {
    dispatch({
      type: 'datas/save',
      payload: {
        searchVal: e.target.value,
      },
    });
  };

  const selectChange = (e: any) => {
    dispatch({
      type: 'datas/save',
      payload: {
        selectVal: e,
      },
    });
  };

  // 确定上传导入数据
  const handleOkUpload = () => {
    console.log('确定上传');
  };

  // 取消上传弹框
  const cancelUpload = () => {
    setUploadVisible(false);
  };

  const columns: ColumnsType<RecordType> = [
    {
      title: '序号',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '问题',
      dataIndex: 'question',
    },
    {
      title: '原始文本',
      dataIndex: 'callNo',
      ellipsis: true,
    },
    {
      title: '标注状态',
      dataIndex: 'status',
    },
    {
      title: '元数据',
      dataIndex: 'data',
    },
    {
      title: '操作',
      dataIndex: 'mark',
      render: (_, record) => (
        <>
          <a href={''}>标注</a>
        </>
      ),
    },
  ];

  const onClickUpload = async ({ key }: any) => {
    console.log(key);
    if (key === 'input') {
      setUploadVisible(true);
    } else {
      setTabType('note');
    }
  };

  const menu = (
    <Menu onClick={onClickUpload}>
      <Menu.Item key="input">导入数据集</Menu.Item>
      <Menu.Item key="output">导出数据集</Menu.Item>
    </Menu>
  );

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
      {tabType === 'datas' && (
        <>
          <div className={styles.header}>
            <div>
              <InputComponent
                value={searchVal}
                onInputChange={onInputChange}
                placeholder="原始文本查询"
              />
              <SelectComponent
                title={'标注状态'}
                value={selectVal}
                options={statusList}
                selectChange={selectChange}
              />
            </div>
            <div>
              <Dropdown overlay={menu}>
                <Button type="primary">
                  动作 <DownOutlined />
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
              dataSource={dataList}
              rowKey="id"
              loading={false}
              bordered
            />
          </div>
        </>
      )}
      {tabType === 'note' && <Note />}

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
    </div>
  );
};

export default connect(
  ({ datas, loading }: { datas: DatasState; loading: Loading }) => ({
    datas,
    loading,
  }),
)(Datas);
