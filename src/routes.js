import { lazy } from "react";
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import { FormatListBulleted } from "@material-ui/icons";
// core components/views for Admin layout
const UserProfile = lazy(() => import("views/UserProfile/UserProfile.js"));
const Items = lazy(() => import("./layouts/Admin/Items/Items"));
const Collections = lazy(() =>
  import("./layouts/Admin/Collections/Collections")
);
const DashboardPage = lazy(() => import("./views/Dashboard/Dashboard"));

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/items",
    name: "Tất cả hiện vật",
    icon: FormatListBulleted,
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
    component: Collections,
    layout: "/admin",
  },
];

export default dashboardRoutes;
