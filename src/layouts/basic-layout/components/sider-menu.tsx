import React, { useContext } from 'react';
import { Icon, Menu } from 'antd';
import { Link } from 'react-router-dom';
import GlobalContext from 'src/context/global';

const { SubMenu, Item: MenuItem } = Menu;

const SiderMenu: React.FC<{}> = () => {
  const { menu } = useContext(GlobalContext);
  console.log(menu)
  const defaultSelectedKey = menu.length ? menu[0].name : '';
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[defaultSelectedKey]}
      style={{ userSelect: 'none' }}
    >
      {menu.map(item =>
        item.children ? (
          <SubMenu
            key={item.name}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.name}</span>
              </span>
            }
          >
            {item.children.map(subItem => (
              <MenuItem key={subItem.name}>
                {/*
                // @ts-ignore */}
                <Link to={subItem.route}>{subItem.name}</Link>
              </MenuItem>
            ))}
          </SubMenu>
        ) : (
            <MenuItem key={item.name}>
                {/*
                // @ts-ignore */}
                <Link style={{ color: 'inherit' }} to={item.route}>
                <Icon type={item.icon} />{item.name}
                </Link>
            </MenuItem>
          )
      )}
    </Menu>
  );
};

export default SiderMenu;
