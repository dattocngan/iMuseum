/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// core components/views for Admin layout
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Items from "./layouts/Admin/Items/Items";

const dashboardRoutes = [
  {
    path: "/items",
    name: "Tất cả hiện vật",
    icon: Dashboard,
    component: Items,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "Trang cá nhân",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/collections",
    name: "Tất cả bộ sưu tập",
    icon: "content_paste",
    component: TableList,
    layout: "/admin",
  },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin",
  // }
];

export default dashboardRoutes;
