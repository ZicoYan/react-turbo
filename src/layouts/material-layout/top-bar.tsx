import React from 'react';
import { AppBar, Typography, IconButton, Toolbar } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Menu as MenuIcon } from '@material-ui/icons';
import clsx from 'clsx';

export interface ITopBarProps {
  /**
   * 是否侧移（被sideMenu挤向右边）
   */
  shifted: boolean;
  /**
   * 展开侧边导航
   */
  handleSideMenuOpen: () => void;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
  }),
);

export function TopBar(props: ITopBarProps) {
  const styles = useStyles();
  return (
    <AppBar position="fixed" className={clsx(styles.appBar)}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.handleSideMenuOpen}
          edge="start"
          className={clsx(styles.menuButton)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          京泰电气
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
