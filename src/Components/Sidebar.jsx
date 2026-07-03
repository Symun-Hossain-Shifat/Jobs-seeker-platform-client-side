'use client'

import { authClient } from "@/lib/auth-client";
import {LayoutSideContentLeft , Bell, Envelope, Gear, House, Magnifier, Person, Bookmark, FileText, CreditCard, Briefcase} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import { Building, LayoutGrid, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function SideNavigation() {
  const ReqruiterNavItems = [
    { href: '/Dashboard/recruiter' ,icon: House, label: "Home"},
    { href: '/Dashboard/recruiter/Company' ,icon: Magnifier, label: "Company"},
    { href: '/Dashboard/recruiter/Jobs' ,icon: Bell, label: "All Jobs"},
    { href: '/Dashboard/recruiter/Jobs/New' ,icon: Envelope, label: "Add Job"},
    { href: '/Dashboard/recruiter' ,icon: Person, label: "Profile"},
    { href: '/Dashboard/recruiter' ,icon: Gear, label: "Settings"},
  ];
 const SeekerNavItems = [
  { href: '/Dashboard/seeker', icon: LayoutGrid, label: "Dashboard" },
  { href: '/Dashboard/seeker', icon: Magnifier, label: "Jobs" },
  { href: '/Dashboard/seeker/appliedjobs', icon: Bookmark, label: "Applied Jobs" },
  { href: '/Dashboard/seeker', icon: FileText, label: "Applications" },
  { href: '/Dashboard/seeker', icon: CreditCard, label: "Billing" },
  { href: '/Dashboard/seeker', icon: Gear, label: "Settings" },
];
const AdminNavItems = [
  { href: '/Dashboard/admin', icon: LayoutGrid, label: "Dashboard" },
  { href: '/Dashboard/admin/users', icon: Users , label: "Users" },
  { href: '/Dashboard/admin/companies', icon: Building , label: "Companies" },
  { href: '/Dashboard/admin/alljobs', icon: Briefcase , label: "Jobs" },
  { href: '/Dashboard/admin', icon: CreditCard, label: "Payments" },
  { href: '/Dashboard/admin', icon: Gear, label: "Settings" },
];

  const { data: session , isPending} = authClient.useSession() 
  if (isPending) {
  return null;
}
  const User = session?.user 
  

const GetNavitems = (role) => {
  const navItems = {
    'Admin' : AdminNavItems ,
    'Recruiter': ReqruiterNavItems,
    'Job Seeker' : SeekerNavItems,
  };

  return navItems[role] || [];
};
 const navItems = GetNavitems(User?.role || 'Job Seeker')
  const Navmenu =   <div>
    <nav className="flex flex-col gap-1">
      
  <div className="flex items-center gap-4">

          <div
  className="rounded-full  w-20 h-20 bg-cover bg-center"
  style={{ backgroundImage: `url(${User?.image})` }}
>
          </div>
           
                   <div>
                    <h1 className="font-semibold">{User?.name}</h1>
                    <p>Hello</p>
                   </div>
        </div>

      
                 
                 
                {navItems.map((item) => (
                <Link
                    href={item.href}
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    type="button"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </Link>
                  
                  
                ))}
              </nav>

    </div>
  return (

    <>
    <aside className="hidden  shrink-0 border-r border-default p-4 lg:block">
       
      {Navmenu}
    </aside>
    

    <Drawer>
      <Button className= 'lg:hidden m-4' variant="secondary">
        <LayoutSideContentLeft />
        Sidebar
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              {Navmenu}
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
    </>
    
  );
}