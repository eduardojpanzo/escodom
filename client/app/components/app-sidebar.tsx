import * as React from "react";
import {
  BookUp,
  BookUser,
  ChartArea,
  Grid3X3,
  UserCircle2,
  Users2,
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

const navMain = [
  {
    title: "Painel",
    url: "/dash",
    icon: ChartArea,
    isActive: true,
  },
  {
    title: "Minha Turma",
    url: "/dash/minha-turma",
    icon: Users2,
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
  {
    title: "Escalas",
    url: "/dash/minha-turma",
    icon: Grid3X3,
  },
  // {
  //   title: "Relátorios",
  //   url: "/dash/relatorios",
  //   icon: ChartArea,
  // },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <LogoDashboard />
      </SidebarHeader>
      <SidebarContent className="mt-5">
        <NavMain items={navMain} groupName="Main" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
