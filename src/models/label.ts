import { Effect, Reducer, history } from 'umi';
import { StringAnytProps, PaginationProps } from './connect';

export interface LabelsState {
  searchVal: string;
  labelList: StringAnytProps[];
  pagination: PaginationProps;
}

export interface LabelsModelProps {
  namespace: 'labels';
  state: LabelsState;
  effect: {
    queryLabelsList: Effect;
  };
  reducers: {
    save: Reducer<LabelsState>;
  };
}

const DatasModel: LabelsModelProps = {
  namespace: 'labels',
  state: {
    searchVal: '',
    labelList: [],
    pagination: {
      pageSize: 10,
      current: 1,
      total: 0,
    },
  },
  effect: {
    *queryLabelsList() {},
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

export default DatasModel;
