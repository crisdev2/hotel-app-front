import { IMenu } from '../models/menuModel'

const Menu: IMenu[] = [
  {
    title: "Main",
    path: null,
    icon: null,
    active: false,
    child: [
      {
        title: "Inicio",
        path: "/dashboard",
        icon: "home",
        active: false
      }
    ]
  },
  {
    title: "Workspace",
    path: null,
    icon: null,
    active: false,
    child: [
      {
        title: "Forms",
        path: "/forms",
        icon: "article",
        active: false
      },
      {
        title: "Questions",
        path: "/questions",
        icon: "info",
        active: false
      },
      {
        title: "Options",
        path: "/options",
        icon: "check",
        active: false
      },
    ],
  },
  {
    title: "Admin",
    path: null,
    icon: null,
    active: false,
    child: [
      {
        title: "Users",
        path: "/users",
        icon: "people",
        active: false,
        child: [
          {
            title: "User list",
            path: "/users/list",
            icon: null,
            active: false
          },
          {
            title: "Permissions",
            path: "/users/permissions",
            icon: null,
            active: false
          },
          {
            title: "Roles",
            path: "/users/roles",
            icon: null,
            active: false
          },
        ]
      },
      {
        title: "Settings",
        path: "/settings",
        icon: "settings",
        active: false,
      }
    ]
  }
]

export default Menu