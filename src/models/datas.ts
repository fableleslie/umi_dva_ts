import { Effect, Reducer, history } from 'umi';
import { StringAnytProps, PaginationProps } from './connect';

export interface DatasState {
  searchVal: string;
  selectVal: string;
  dataList: StringAnytProps[];
  pagination: PaginationProps;
}

export interface DatasModelProps {
  namespace: 'datas';
  state: DatasState;
  effect: {
    queryDataList: Effect;
  };
  reducers: {
    save: Reducer<DatasState>;
  };
}

const DatasModel: DatasModelProps = {
  namespace: 'datas',
  state: {
    searchVal: '',
    selectVal: '',
    dataList: [],
    pagination: {
      pageSize: 10,
      current: 1,
      total: 0,
    },
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

export default DatasModel;
