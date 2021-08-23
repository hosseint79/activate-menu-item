export interface IActiveFor {
  path:string | number
  exact?:boolean
}

export interface ISidebarItem {
  id?: string | number;
  path?: string|number;
  children?: any;
  activefor?:Array<IActiveFor>
}

export interface ISidebar extends ISidebarItem {
  children?: Array<ISidebarItem>;
}