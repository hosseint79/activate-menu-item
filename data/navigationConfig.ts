import { ISidebarItem } from '../src/type/find-active';


interface MySidebar extends ISidebarItem{
  title:string
}

export const NavigationConfig: Array<MySidebar> = [
  {
    id: "information",
    title: "user information",
    activefor:[
      {
        path:"/aboutUs",
        exact:true
      }
    ],
    children: [
      {
        id:"personalInfo",
        title: "اطلاعات هویتی",
        path: "/aboutUs/personalInfo",
        activefor:[
          {
            path:"/aboutUs/personalInfo",
            exact:true
          }
        ]
      }
    ],
  }

];


