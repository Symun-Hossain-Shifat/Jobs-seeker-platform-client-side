import { SideNavigation } from "@/Components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex  min-h-screen">
      <SideNavigation></SideNavigation>
      <main className="flex-1">{children}</main>
      
    </div>
  );
}
