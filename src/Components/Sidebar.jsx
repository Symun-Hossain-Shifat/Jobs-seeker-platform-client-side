'use client'

import { authClient } from "@/lib/auth-client";
import {LayoutSideContentLeft , Bell, Envelope, Gear, House, Magnifier, Person, Bookmark, FileText, CreditCard} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import { LayoutGrid } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function SideNavigation() {
  const ReqruiterNavItems = [
    { href: '/Dashboard/recruiter' ,icon: House, label: "Home"},
    { href: '/Dashboard/recruiter/Company' ,icon: Magnifier, label: "Company"},
    { href: '/Dashboard/recruiter/Jobs' ,icon: Bell, label: "All Jobs"},
    { href: '/Dashboard/recruiter/Jobs/New' ,icon: Envelope, label: "Add Job"},
    { href: '/' ,icon: Person, label: "Profile"},
    { href: '/' ,icon: Gear, label: "Settings"},
  ];
 const SeekerNavItems = [
  { href: '/Dashboard/seeker', icon: LayoutGrid, label: "Dashboard" },
  { href: '/Dashboard/seeker', icon: Magnifier, label: "Jobs" },
  { href: '/Dashboard/seeker', icon: Bookmark, label: "Applied Jobs" },
  { href: '/Dashboard/seeker', icon: FileText, label: "Applications" },
  { href: '/Dashboard/seeker', icon: CreditCard, label: "Billing" },
  { href: '/Dashboard/seeker', icon: Gear, label: "Settings" },
];

  const { data: session } = authClient.useSession()
  const User = session?.user
const GetNavitems = (role) => {
  const navItems = {
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