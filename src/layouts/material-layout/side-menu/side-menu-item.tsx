import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { IMenuItem, IMenuItemParent, IMenuItemChild } from 'src/types/menu';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

export function getPath(path, parentPath = '') {
  return `${parentPath}/${path}`.replace(/\/+/g, '/');
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

function RouteItem({
  menuItem,
  className,
  parentPath,
}: {
  className?: string;
  menuItem: IMenuItemChild;
  parentPath?: string;
}) {
  if (menuItem.hide) {
    return null;
  }
  if (Array.isArray(menuItem.path) && !menuItem.path.length) {
    return null;
  }
  const parentPathName = parentPath ?? '';
  const path = typeof menuItem.path === 'string' ? getPath(menuItem.path, parentPathName) :  getPath(menuItem.path[0], parentPathName)
  return (
    <ListItem
      button
      className={className}
      component={props => (
        <Link
          to={path}
          {...props}
        />
      )}
      key={menuItem.name}
    >
      {menuItem.icon && (
        <ListItemIcon>
          <menuItem.icon />
        </ListItemIcon>
      )}
      <ListItemText primary={menuItem.name} />
    </ListItem>
  );
}

function ParentItem({ menuItem }: { menuItem: IMenuItemParent }) {
  const styles = useStyles();
  const [open, setOpen] = useState<boolean>(true);
  const toggleOpen = useCallback(() => {
    setOpen(current => !current);
  }, []);
  const path = getPath(menuItem.path);
  return (
    <>
      <ListItem button onClick={toggleOpen}>
        <ListItemIcon>{<menuItem.icon />}</ListItemIcon>
        <ListItemText primary={menuItem.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {menuItem.children.map(routeItem => (
            <RouteItem
              parentPath={path}
              className={styles.nested}
              menuItem={routeItem}
              key={routeItem.name}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
}

export default function SideMenuItem({ menuItem, parentPath }: { menuItem: IMenuItem, parentPath?: string }) {
  if ('children' in menuItem) {
    return <ParentItem menuItem={menuItem} />;
  }
  return <RouteItem menuItem={menuItem} />;
}
