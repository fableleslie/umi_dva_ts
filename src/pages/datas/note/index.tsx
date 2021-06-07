import React, { FC, useEffect, useState } from 'react';
import { connect } from 'umi';

import { Loading } from '@/models/connect';
import { Dispatch } from 'umi';
import {
  CloseSquareOutlined,
  CheckSquareOutlined,
  DeleteOutlined,
  FilterFilled,
  ProfileOutlined,
  LeftOutlined,
  RightOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

import { NoteState } from '@/models/connect';
import styles from './index.less';
import { message, Modal, Button } from 'antd';

export interface NoteProps {
  dispatch: Dispatch;
  note: NoteState;
}

const Note: FC<NoteProps> = ({ note, dispatch }) => {
  console.log(note);

  const { annotations, items } = note;
  const [chunkList, setChunkList] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const testText =
    '鼠标滑动原始文本后点击标签或使用快捷键可进行标注，标注后文本显示标签背景颜色。若标注内容与之前内容重叠，则替换为新的标注内容。';

  useEffect(() => {
    chunks();
  }, [annotations]);
  const chunks = () => {
    let chunks: any = [];
    let startOffset = 0;
    // console.log('---------annotations------', annotations);
    let sortedEntities = annotations
      .slice()
      .sort((a, b) => a.startOffset - b.startOffset);
    // to count the number of characters correctly.
    const characters = [...testText];
    // console.log('-------this.sortedEntities--------', sortedEntities);
    for (const entity of sortedEntities) {
      // add non-entities to chunks.
      let piece = characters.slice(startOffset, entity.startOffset).join('');
      // console.log('----------piece1111-------', piece);
      // console.log('-------this.makeChunks(piece)---', makeChunks(piece));
      chunks = chunks.concat(makeChunks(piece));
      // console.log('------chunks-----', chunks);
      startOffset = entity.endOffset;
      // add entities to chunks.
      const label = labelObject()[entity.label];
      // console.log('-----label------', label);
      piece = characters.slice(entity.startOffset, entity.endOffset).join('');
      // console.log('----------piece222222-------', piece);
      chunks.push({
        id: entity.id,
        label: label.text,
        color: label.backgroundColor,
        text: piece,
      });
    }
    // add the rest of text.
    chunks = chunks.concat(
      makeChunks(characters.slice(startOffset, characters.length).join('')),
    );
    // console.log('--------计算属性chunks----------');
    console.log(chunks);
    setChunkList(chunks);
    // return chunks;
  };

  const makeChunks = (text: string) => {
    const chunks = [];
    const snippets = text.split('\n');

    chunks.push({
      label: null,
      color: null,
      text: snippets.slice(-1)[0],
      newline: false,
    });
    return chunks;
  };

  const labelObject = () => {
    const obj: any = {};
    for (const label of items) {
      obj[label.id] = label;
    }
    console.log('---------obj来了-----', obj);
    return obj;
  };

  const open = () => {
    setSpanInfo();
  };

  const setSpanInfo = () => {
    let selection;
    // Modern browsers.
    if (window.getSelection) {
      selection = window.getSelection();
    } else if (document.selection) {
      selection = document.selection;
    }
    // If nothing is selected.
    if (selection.rangeCount <= 0) {
      return;
    }
    const range = selection.getRangeAt(0);
    const preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(
      document.getElementById('biaozhu1002'),
    );
    // console.log(
    //   '--------this.$el--------',
    //   document.getElementById('biaozhu1002'),
    // );
    // console.log('----------range.toString()-----', range.toString());
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    // console.log('----------wiindow.getSelection-------', window.getSelection);

    // console.log('---------selection.rangeCount-----', selection.rangeCount);
    // console.log('-----selection.getRangeAt------', selection.getRangeAt(0));
    // console.log('-------selection----', selection);
    // console.log('-------preSelectionRange----', preSelectionRange.toString());
    // console.log([...preSelectionRange.toString()].length);
    // console.log(
    //   [...preSelectionRange.toString()].length + [...range.toString()].length,
    // );
    let tempStart = [...preSelectionRange.toString()].length;
    let tempEnd =
      [...preSelectionRange.toString()].length + [...range.toString()].length;
    setStart(tempStart);
    setEnd(tempEnd);
  };

  // 确定标注
  const addEntity = (labelId: number) => {
    if (start === end) {
      message.warn('请选择需要标注的内容');
      return;
    }
    const payload = {
      id: Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER)),
      startOffset: start,
      endOffset: end,
      label: labelId,
    };
    let temp = [];
    annotations.map(item => {
      if (item.startOffset <= start && start < item.endOffset) {
      } else if (item.startOffset < end && end <= item.endOffset) {
      } else if (start < item.startOffset && item.endOffset < end) {
      } else {
        temp.push(item);
      }
    });
    temp.push(payload);
    dispatch({
      type: 'note/save',
      payload: {
        annotations: temp,
      },
    });
    setStart(0);
    setEnd(0);
  };

  const removeEntity = (annotationsId: number) => {
    let temp = annotations.filter(item => {
      return item.id != annotationsId;
    });
    dispatch({
      type: 'note/save',
      payload: {
        annotations: temp,
      },
    });
  };

  const selectColor = e => {
    console.log(e.target.value);
  };

  return (
    <div>
      <div className={styles.headerWrap}>
        <div>
          <CloseSquareOutlined />
          <CheckSquareOutlined />
          <FilterFilled />
          <ProfileOutlined />
          <DeleteOutlined />
        </div>
        <div>
          <span style={{ marginRight: 8 }}>2 of 610</span>
          <LeftOutlined style={{ marginRight: 16 }} />
          <RightOutlined />
        </div>
      </div>
      <div className={styles.currentPage}>【2】</div>
      <div className={styles.sequenceList}>
        <div className={styles.listTitle}>序列标签列表</div>
        <div>
          {items.map((item: any) => {
            return (
              <div
                className={styles.labelItem}
                onClick={() => addEntity(item.id)}
                key={item.id}
              >
                <div
                  className={styles.labelCh}
                  style={{ backgroundColor: `${item.backgroundColor}` }}
                >
                  {item.text}
                </div>
                <div className={styles.labelWo}>{item.suffixKey}</div>
              </div>
            );
          })}

          {/* <div className={styles.labelItem}>
            <div className={styles.labelCh}>组织</div>
            <div className={styles.labelWo}>b</div>
          </div> */}
        </div>
      </div>
      <div className={styles.textWrap}>
        <span>原始文本</span>
        <div className={styles.textContent} id="biaozhu1002" onClick={open}>
          {chunkList.map((item: any, index: number) => {
            if (item.label) {
              return (
                <span
                  key={index}
                  style={{
                    backgroundColor: `${item.color}`,
                    position: 'relative',
                  }}
                >
                  {item.text}
                  <CloseCircleOutlined
                    className={styles.closeIcon}
                    onClick={() => removeEntity(item.id)}
                  />
                </span>
              );
            } else {
              return <span key={index}>{item.text}</span>;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default connect(({ note }: { note: NoteState }) => ({ note }))(Note);
