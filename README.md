# activate-menu-item

This package controls which item must be open in sidebar menu or selected base on route even after refreshing page and gives you a good structure for creating sidebar menu

## Demo

https://active-menu-item-demo.vercel.app/

## Installation

Install activate-menu-item with npm

```bash
  npm install activate-menu-item
```

## Usage

```javascript
const NavigationList = [
  {
    id: "information",
    title: "user information",
    children: [
      {
        title: "user personal information",
        path: "/info/personalInfo",
        activefor: [
          {
            path: "/info/personalInfo",
          },
        ],
      },
      {
        title: "user business information",
        path: "/info/businessInfo",
        activefor: [
          {
            path: "/info/businessInfo",
          },
        ],
      },
    ],
  },
];
```

```javascript
import { findActiveItem, createSidebar } from "activate-menu-item";
import { useLocation } from "react-router-dom";
import { Menu } from "antd";

import "antd/lib/menu/style/css";

const { SubMenu } = Menu;

function App() {
  const location = useLocation();
  const { activePath, openKeysItems } = findActiveItem(
    NavigationList,
    location.pathname
  );

  return (
    <Menu defaultOpenKeys={openKeysItems} selectedKeys={[activePath]}>
      <SubMenu key="information" title="user information">
        <Menu.Item key="/info/personalInfo">
          user personal information
        </Menu.Item>
        <Menu.Item key="/info/businessInfo">
          user business information
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
}
```

## create sidebar

you can use NavigationList to create sidebar with createSidebar function.
this is helpful for bigger NavigationList

you must provide id property for submenu and for menu items you must add path property in NavigationList

```javascript
import { createSidebar } from "activate-menu-item";
import { useLocation } from "react-router-dom";
import { Menu } from "antd";

import "antd/lib/menu/style/css";

const { SubMenu } = Menu;

const ItemSidebar = ({ data, ...others }) => {
  // dont forget to pass others data to return component before key property
  return (
    <Menu.Item {...others} key={data.path}>
      {data.title}
    </Menu.Item>
  );
};

const SubmenuSidebar = ({ data, ...others }) => {
  // dont forget to pass others data to return component before key property
  return (
    <SubMenu {...others} key={data.id} title={data.title}>
      {others.children}
    </SubMenu>
  );
};

export function App() {
  const location = useLocation();
  const { activePath, openKeysItems } = findActiveItem(
    NavigationList,
    location.pathname
  );

  return (
    <Menu defaultOpenKeys={openKeysItems} selectedKeys={[activePath]}>
      {createSidebar(ItemSidebar, SubmenuSidebar, NavigationList)}
    </Menu>
  );
}
```

## Example

https://codesandbox.io/s/tender-shamir-vwy2w

## License

[MIT](https://choosealicense.com/licenses/mit/)
