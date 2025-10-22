import { useState } from "react";
import { 
  Calendar, 
  Car, 
  Users, 
  Wrench, 
  Receipt, 
  LayoutDashboard,
  Menu,
  X
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigation = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Schedule", url: "/schedule", icon: Calendar },
  { title: "Services", url: "/services", icon: Wrench },
  { title: "Clients", url: "/clients", icon: Users },
  { title: "Receipts", url: "/receipts", icon: Receipt },
  { title: "Calendar", url: "/calendar", icon: Calendar },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-accent text-accent-foreground font-medium border-r-2 border-primary" 
      : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground";

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <div className="p-4 border-b h-16">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Car className="w-4 h-4 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-semibold text-sm">AquaShine</h2>
              <p className="text-xs text-muted-foreground">Car Wash Admin</p>
            </div>
          )}  
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent className="px-5">
            <SidebarMenu>
              {navigation.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                <NavLink
                  to={item.url}
                  end
                  className={getNavCls({ isActive: isActive(item.url) })}
                >
                  <item.icon />
                  {!isCollapsed && <span>{item.title}</span>}
                </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}