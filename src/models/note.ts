import { Effect, Reducer, history } from 'umi';

export interface DataSources {
  [key: string]: any;
}

export interface NoteState {
  dataSources: DataSources;
  annotations: DataSources[];
  items: DataSources[];
}

export interface NoteModelProps {
  namespace: 'note';
  state: NoteState;
  effect: {
    queryDataList: Effect;
  };
  reducers: {
    save: Reducer<NoteState>;
  };
}

const NoteModel: NoteModelProps = {
  namespace: 'note',
  state: {
    dataSources: {},
    items: [
      {
        id: 4,
        text: '事件',
        prefixKey: null,
        suffixKey: 'l',
        backgroundColor: '#7c20e0',
        textColor: '#ffffff',
      },
      {
        id: 5,
        text: '组织',
        prefixKey: null,
        suffixKey: 'm',
        backgroundColor: '#fbb028',
        textColor: '#000000',
      },
      {
        id: 6,
        text: '飞速',
        prefixKey: null,
        suffixKey: 'o',
        backgroundColor: '#e6d176',
        textColor: '#000000',
      },
    ],
    annotations: [
      {
        id: 17,
        prob: 0.0,
        label: 4,
        startOffset: 23,
        endOffset: 28,
        user: 1,
        document: 8,
      },
      {
        id: 19,
        prob: 0.0,
        label: 4,
        startOffset: 10,
        endOffset: 15,
        user: 1,
        document: 8,
      },
      {
        id: 16,
        prob: 0.0,
        label: 6,
        startOffset: 18,
        endOffset: 22,
        user: 1,
        document: 8,
      },
    ],
  },
  effect: {
    *queryDataList() {},
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default NoteModel;
