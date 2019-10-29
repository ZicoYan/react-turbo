import { IMenuConfig } from 'src/types/menu';

const menu: IMenuConfig[] = [
  { name: '总览', icon: 'dashboard', route: '/', component: 'dashboard' },
  {
    name: '公司',
    icon: 'team',
    children: [
      { name: '列表', route: '/company/list', component: 'company/list' },
    ],
  },
];

export default menu;
