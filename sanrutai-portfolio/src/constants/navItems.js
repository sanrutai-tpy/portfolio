// Navigation items for sidebar
import {
  LayoutDashboard, Users, FolderKanban, Wrench,
  ShieldCheck, FileText, BarChart3, Settings,
} from "lucide-react";

// Centralized navigation config
export const NAV_ITEMS = [
  { id: "dashboard",   label: "Dashboard",   icon: LayoutDashboard },
  { id: "contractors", label: "Contractors", icon: Users },
  { id: "projects",    label: "Projects",    icon: FolderKanban },
  { id: "services",    label: "Services",    icon: Wrench },
  { id: "policies",    label: "Policies",    icon: ShieldCheck },
  { id: "contracts",   label: "Contracts",   icon: FileText },
  { id: "reports",     label: "Reports",     icon: BarChart3 },
  { id: "settings",    label: "Settings",    icon: Settings },
];