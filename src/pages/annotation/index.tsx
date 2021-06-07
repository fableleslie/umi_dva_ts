import React, { FC, useEffect, useState } from 'react';
import { connect } from 'umi';
import RichEditor from '@/components/jslibs/richEditor';

import styles from './index.less';

let editorRef: any = null;

const Annotation: FC = () => {
  function onRefChange(ref: any) {
    editorRef = ref;
  }
  return (
    <div className={styles.editorWrap}>
      <RichEditor onRef={onRefChange} />
    </div>
  );
};

export default Annotation;
