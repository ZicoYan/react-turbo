import React, { useCallback } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { TopBar } from './top-bar';
import { SideMenu } from './side-menu';
import { IMenuItem } from 'src/types/menu';
import Content from './content';

export interface IMaterialLayoutProps {
  menu: IMenuItem[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
  }),
);

export default function MaterialLayout(props: IMaterialLayoutProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleSideMenuOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleSideMenuClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar shifted={open} handleSideMenuOpen={handleSideMenuOpen} />
      <SideMenu
        menu={props.menu}
        open={open}
        handleSideMenuClose={handleSideMenuClose}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Content routes={props.menu} />
      </main>
    </div>
  );
}
