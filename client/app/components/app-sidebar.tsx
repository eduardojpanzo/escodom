import * as React from "react";
import {
  AudioWaveform,
  DiamondPlus,
  FileSliders,
  GalleryVerticalEnd,
  Handshake,
  PackagePlus,
  Radar,
  Rotate3D,
  SquarePen,
  Wrench,
} from "lucide-react";

import { NavMain } from "~/components/nav-main";
import { NavUser } from "~/components/nav-user";
import { TeamSwitcher } from "~/components/team-switcher";
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
  teams: [
    {
      name: "Queno Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Queno Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
  ],
  navMain: [
    {
      title: "Administração",
      url: "#",
      icon: Wrench,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/dash",
        },
        {
          title: "Parametrizações",
          url: "#",
          items: [
            {
              title: "Tipo de Pedra",
              url: "/dash/tipo-de-pedra",
            },
            {
              title: "Detalhes Características",
              url: "#",
            },
          ],
        },
      ],
    },
    {
      title: "Tracking",
      url: "#",
      icon: Radar,
      items: [
        {
          title: "Ver Status",
          url: "#",
        },
        {
          title: "Listagem Geral",
          url: "#",
        },
      ],
    },
    {
      title: "Extração (module)",
      url: "#",
      icon: DiamondPlus,
      items: [
        {
          title: "Registar Nova",
          url: "/dash/extracao/nova",
        },
        {
          title: "Listagem",
          url: "/dash/extracao/listagem",
        },
      ],
    },
    {
      title: "Comércio (module)",
      url: "#",
      icon: Handshake,
      items: [
        {
          title: "Operações comerciais",
          url: "#",
        },
        {
          title: "Aprovações",
          url: "#",
        },
      ],
    },
    {
      title: "Regulamentação",
      url: "#",
      icon: FileSliders,
      items: [
        {
          title: "Entidades",
          url: "/dash/regulamentacao/entidade",
        },
        {
          title: "Aprovações",
          url: "/dash/regulamentacao/aprovacao",
        },
      ],
    },
    {
      title: "Transformação",
      url: "#",
      icon: Rotate3D,
      items: [
        {
          title: "Lapidar",
          url: "#",
        },
        {
          title: "Transformar",
          url: "#",
        },
        {
          title: "Histórico",
          url: "#",
        },
      ],
    },
    {
      title: "Self Register",
      url: "#",
      icon: PackagePlus,
    },
    {
      title: "Self Edit Form",
      url: "#",
      icon: SquarePen,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} groupName="Main" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
