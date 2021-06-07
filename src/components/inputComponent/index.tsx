import React, { FC } from 'react';
import { Input } from 'antd';
import styles from './index.less';

interface InputComponentProps {
  title?: string;
  value: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: object;
  placeholder?: string;
  disabled?: boolean;
}

const InputComponent: FC<InputComponentProps> = ({
  title = '',
  value,
  style = {},
  disabled,
  onInputChange,
  placeholder = '请输入',
}) => {
  return (
    <div className={styles.inputDiv} style={{ marginRight: 24 }}>
      {title && <span className={styles.inputTitle}>{title}</span>}
      <Input
        value={value}
        disabled={disabled}
        style={{ width: 150, ...style }}
        onChange={onInputChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputComponent;
