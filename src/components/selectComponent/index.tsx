import React, { FC } from 'react';

import { Select } from 'antd';
import styles from './index.less';

const { Option } = Select;

export interface SelectComponentProps {
  title: string;
  placeholder?: string;
  value: any;
  options?: any[];
  selectChange?: (value: any) => void;
  style?: object;
  optionName?: string;
  optionKey?: string;
}

const SelectComponent: FC<SelectComponentProps> = ({
  title,
  value,
  options = [],
  selectChange,
  style = {},
  optionName = 'label',
  optionKey = 'value',
  placeholder = '',
}) => {
  return (
    <div className={styles.selectDiv}>
      <span className={styles.selectTitle}>{title}</span>
      <Select
        value={value}
        onChange={selectChange}
        style={{ width: 150, ...style }}
        placeholder={placeholder}
      >
        {options.map(item => {
          return (
            <Option
              key={item[optionKey]}
              value={item[optionKey]}
              title={item[optionName]}
            >
              {item[optionName]}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

export default SelectComponent;
