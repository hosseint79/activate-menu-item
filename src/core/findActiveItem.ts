import { ISidebarItem } from '../type/find-active';

export const checkItemIsActive = (item:any,currentPath:string,firstNodeOfTree:boolean,openKeysItems:Array<string|number>) => {

  //#for open-keys ************************
  if(firstNodeOfTree){
    // if this is the first node of tree openKeysItems must be clear
    while(openKeysItems.length > 0) {
      openKeysItems.pop();
    }
    // add first id anyway
    openKeysItems.push(item.id)
  }

  firstNodeOfTree = false
  // ****************************************

  let resultPath:string|undefined = undefined;


  if(item.activefor){

    item.activefor.forEach((mapActiceItem:any) => {
      let acticeItem = {exact:true,...mapActiceItem}
      // check current path is exactly equal to the item path
      if(acticeItem.exact) {
        if(acticeItem.path === currentPath){
          resultPath = item.path
        }
      }
      else{   // check current path contains item path
        if(currentPath.toLowerCase().includes(acticeItem.path.toLowerCase())){
          resultPath = item.path
        }
      }
    });

  }

  // # performance
  // if result not found and item have children we must check all children's
  if(!resultPath){
    if(item.children){


      item.children.forEach((element:any) => {

          //#for open-keys ************************
          if(resultPath) return resultPath
          openKeysItems.push(element.id)
          // ****************************************

          resultPath = checkItemIsActive(element,currentPath,firstNodeOfTree,openKeysItems)
       
        
          //#for open-keys ************************
          // اگر پیدا نشده باشد باید حذف شود
          if(!resultPath){
            openKeysItems.pop()
          }
          // ****************************************

      });


    }
  }

  return resultPath
}

interface IActiveResult {
  activePath: string | undefined,
  openKeysItems:Array<string> | undefined
}

export function findActiveItem<T extends  Array<ISidebarItem>>(navigationList:T,currentPath:string):IActiveResult{

  // Specifies which item must be active
  let activePath:string|undefined = undefined
  let openKeysItems:Array<string> = []
  
  navigationList.map((item: any) => {
   
    //#for open-keys ************************
    // this specifies first node of tree
    let firstNodeOfTree = true

    //#performace
    //if it is found which item should be active there is no need to continue
    if(typeof activePath !== 'undefined'){
      return
    }

    activePath = checkItemIsActive(item,currentPath,firstNodeOfTree,openKeysItems)
 
  });

  return typeof activePath !== 'undefined' ? {
    activePath:activePath,
    openKeysItems:openKeysItems
  } : {
    activePath:undefined,
    openKeysItems:undefined
  };
};
