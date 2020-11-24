import Settings from "@material-ui/icons/Settings";
import People from "@material-ui/icons/People";
import Wallet from "@material-ui/icons/AccountBalanceWallet";
import ContactSupport from "@material-ui/icons/ContactSupport";

import samplePage from "views/admin/Sample";
import Campaigns from "views/admin/Campaigns";
import Campaign from "views/admin/Campaign";
import Users from "views/admin/Users";
import User from "views/admin/User";
import Transactions from "views/admin/Transactions";
import Tickets from "views/admin/Tickets";
import Ticket from "views/admin/Ticket";
import Reports from "views/admin/Reports";

const dashboardRoutes = [
  {
    path: "/settings",
    id: "settings",
    sidebarName: "تنظیمات",
    navbarName: "تنظیمات",
    icon: Settings,
    component: samplePage,
    type: "ADMIN",
    showInSidebar: true
  },
  {
    path: "/users/edit/:id",
    id: "users_edit",
    sidebarName: "ویرایش و اطلاعات کاربر",
    navbarName: "ویرایش",
    icon: " ",
    component: User,
    type: "ADMIN",
    showInSidebar: false
  },
  {
    path: "/users/list",
    id: "users_list",
    sidebarName: "فهرست کاربران",
    navbarName: "فهرست",
    icon: " ",
    component: Users,
    type: "ADMIN",
    showInSidebar: true
  },
  {
    path: "/users",
    id: "users",
    redirect: true,
    to: "/users/list",
    sidebarName: "کاربران",
    navbarName: "کاربران",
    type: "BOTH",
    icon: People,
    showInSidebar: true
  },
  {
    path: "/profile",
    id: "profile",
    navbarName: "مدیریت پروفایل شخصی",
    component: samplePage,
    type: "BOTH",
    showInSidebar: false
  }
];

export default dashboardRoutes;
