import React from "react";
import { Dropdown, Avatar } from 'antd';

import UserMenu from "./user-menu";

const s = require('./styles.less');

const TopMenu: React.FC<{}> = () => {
  return (
    <div className={s.topMenuWrap}>
      <Dropdown className={s.avatar} overlay={UserMenu}>
        <Avatar icon="user" />
      </Dropdown>
    </div>
  )
}

export default TopMenu;
