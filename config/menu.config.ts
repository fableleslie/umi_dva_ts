export const menusSource = [
  {
    title: 'Dashboard',
    link: '/dashboard',
    key: 'dashboard',
    icon: '',
    children: [],
  },
  {
    title: '标注任务',
    link: '/labelTask',
    key: 'labelTask',
    icon: '',
    children: [
      {
        title: '序列标注',
        link: '/labelTask/sequenceLabeling',
        key: 'sequenceLabeling',
        icon: '',
        children: [],
      },
    ],
  },
];

export const comprehensionMenus = [
  {
    title: '数据集',
    link: '/datas',
    key: 'datas',
    icon: '',
    children: [],
  },
  {
    title: '标签',
    link: '/label',
    key: 'label',
    icon: '',
    children: [],
  },
  {
    title: '标注说明',
    link: '/annotation',
    key: 'annotation',
    icon: '',
    children: [],
  },
];
