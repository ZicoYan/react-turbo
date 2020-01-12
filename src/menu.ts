import { IMenuItem } from 'src/types/menu';
import {
  Dashboard as DashboardIcon,
  Group as GroupIcon,
} from '@material-ui/icons';

const menu: IMenuItem[] = [
  {
    name: '总览',
    icon: DashboardIcon,
    path: ['/', '/index'],
    component: 'dashboard',
  },
  {
    name: '员工',
    icon: GroupIcon,
    path: '/employee',
    children: [
      {
        name: '员工列表',
        path: ['/index', '/'],
        component: 'employee/list',
      },
    ],
  },
];

export default menu;
