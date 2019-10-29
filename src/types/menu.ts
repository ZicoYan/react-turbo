export interface IMenuConfig extends IMenuItem {
  children?: Array<Omit<IMenuItem, 'icon'>>;
}

export interface IMenuItem {
  name: string;
  component?: string;
  route?: string;
  icon: string;
}
