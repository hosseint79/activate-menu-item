import React from "react";
import { ISidebarItem } from './../type/find-active';

export const createSidebarItem = (ItemComponent:React.FC<{data:any}>,ParentComponent:React.FC<{data:any}>,navItem:any):any => {

  if(navItem.children){
    if(!navItem.id){
      console.error("your sidebar submenu must have id property")
    }
    return (
      <ParentComponent key={navItem.id} data={{...navItem}}>
       { navItem.children.map((item:any) => {
         return createSidebarItem(ItemComponent,ParentComponent,item)
       })}
      </ParentComponent>
    )

  }
  else{
    if(!navItem.path){
      console.error("your sidebar item must have path property")
    }
    return  <ItemComponent key={navItem.path} data={{...navItem}} />

  }
  
}

export function createSidebar<T extends  Array<ISidebarItem>>(
  ItemComponent:React.FC<{data:T}>,
  ParentComponent:React.FC<{data:T}>,
  navigationList:T
  ):React.ReactNode {

    return navigationList.map((item:any) => {
      return createSidebarItem(
        ItemComponent,
        ParentComponent,
        item
      )  
    }) 

}

