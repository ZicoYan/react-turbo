import React from 'react';
import { Drawer, Hidden, Divider, List } from '@material-ui/core';
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from '@material-ui/core/styles';
import { IMenuItem } from 'src/types/menu';
import SideMenuItem from './side-menu-item';

export interface ISideMenuProps {
  /**
   * 菜单是否处于展开状态
   */
  open: boolean;
  /**
   * 收起菜单
   */
  handleSideMenuClose: () => void;
  /**
   * 菜单项
   */
  menu: IMenuItem[];
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    divider: {
      margin: theme.spacing(1, 0),
    },
  }),
);

function SideMenuList({ menu }: { menu: IMenuItem[] }) {
  const styles = useStyles();
  const theme = useTheme();
  return (
    <>
      <div className={styles.toolbar} />
      <Divider />
      <List>
        {menu.map((menuItem: IMenuItem) => (
          <SideMenuItem menuItem={menuItem} />
        ))}
      </List>
    </>
  );
}

export function SideMenu(props: ISideMenuProps) {
  const styles = useStyles();
  const theme = useTheme();
  return (
    <nav className={styles.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={props.open}
          onClose={props.handleSideMenuClose}
          classes={{
            paper: styles.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <SideMenuList menu={props.menu} />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: styles.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <SideMenuList menu={props.menu} />
        </Drawer>
      </Hidden>
    </nav>
  );
}
