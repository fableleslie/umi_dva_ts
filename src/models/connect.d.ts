import { GlobalModelState } from './global';
import { LoginModelState } from './login';
import { QueryTableState } from './queryTable';
import { DashboardState } from './dashboard';
import { DatasState } from './datas';
import { NoteState } from './note';
import { LabelsState } from './label';

export {
  GlobalModelState,
  LoginModelState,
  QueryTableState,
  DashboardState,
  DatasState,
  NoteState,
  LabelsState,
};

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login: boolean;
    queryTable: boolean;
    dashboard: boolean;
    datas: boolean;
  };
}

export interface StringAnytProps {
  [key: string]: any;
}

export interface PaginationProps {
  pageSize: number;
  current: number;
  total: number;
}

export interface ConnectState {
  global: GlobalModelState;
  login: LoginModelState;
  loading: Loading;
}

export interface Route {
  routes?: Route[];
}
export interface MenusDate {
  title: string;
  link: string;
  key: string;
  icon: string;
  children: any;
}
export interface LoginUserInfoState {
  id: string;
  name: string;
  role?: string;
  [key: string]: any;
}
