import * as React from "react";
import {
  BookUp,
  BookUser,
  ChartArea,
  UserCircle2,
  UserSquare2,
} from "lucide-react";

import { NavMain } from "~/components/nav-main";
import { NavUser } from "~/components/nav-user";
import { LogoDashboard } from "~/components/identity";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "edwards",
    email: "edwards@example.com",
    avatar: "/avatar.png",
  },
  navMain: [
    {
      title: "Painel",
      url: "/dash",
      icon: ChartArea,
      isActive: true,
    },
    {
      title: "Monitores",
      url: "/dash/monitores",
      icon: UserCircle2,
    },
    {
      title: "Alunos",
      url: "/dash/alunos",
      icon: UserSquare2,
    },
    {
      title: "Níveis",
      url: "/dash/niveis",
      icon: BookUp,
    },
    {
      title: "Classes",
      url: "/dash/classes",
      icon: BookUser,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <LogoDashboard />
      </SidebarHeader>
      <SidebarContent className="mt-5">
        <NavMain items={data.navMain} groupName="Main" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
