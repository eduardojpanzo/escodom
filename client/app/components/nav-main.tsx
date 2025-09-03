import { ChevronRight, type LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  useSidebar,
} from "~/components/ui/sidebar";

interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavItem[];
}

interface NavProps {
  items: NavItem[];
  groupName: string;
}

export function NavMain({ items, groupName }: NavProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="read-only:hidden">
        {groupName}
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItemApp item={item} />
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function SidebarMenuItemApp({ item }: { item: NavItem }) {
  const location = useLocation();
  const { state } = useSidebar();

  if (!item.items) {
    return (
      <SidebarMenuItem>
        <Link to={item.url}>
          <SidebarMenuButton
            isActive={location.pathname === item.url}
            size={state === "collapsed" ? "default" : "lg"}
            tooltip={item.title}
            className="cursor-pointer"
          >
            {item.icon && <item.icon />}
            <span>{item.title}</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    );
  }

  return (
    <Collapsible
      key={item.title}
      asChild
      defaultOpen={item.isActive}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            size={state === "collapsed" ? "default" : "lg"}
            tooltip={item.title}
          >
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map((subItem) => (
              <SidebarMenuItemApp key={subItem.title} item={subItem} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
