export type IMenuItem = IMenuItemParent | IMenuItemChild;

export type IIconType = (props: any) => JSX.Element;

export interface IMenuItemBase {
  name: string;
  path: string | string[];
  authority?: number;
  icon?: IIconType;
}

export interface IMenuItemParent extends IMenuItemBase {
  icon: IIconType;
  path: string;
  children: IMenuItemChild[];
}

export interface IMenuItemChild extends IMenuItemBase {
  hide?: boolean;
  path: string[] | string;
  component: string;
}
