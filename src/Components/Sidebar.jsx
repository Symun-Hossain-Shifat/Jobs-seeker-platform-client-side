'use client'

import { authClient } from "@/lib/auth-client";
import {LayoutSideContentLeft , Bell, Envelope, Gear, House, Magnifier, Person} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export function SideNavigation() {
  const navItems = [
    { href: '/Dashboard/recruiter' ,icon: House, label: "Home"},
    { href: '/Dashboard/recruiter' ,icon: Magnifier, label: "Search"},
    { href: '/Dashboard/Jobs' ,icon: Bell, label: "All Jobs"},
    { href: '/Dashboard/Jobs/New' ,icon: Envelope, label: "Add Job"},
    { href: '/' ,icon: Person, label: "Profile"},
    { href: '/' ,icon: Gear, label: "Settings"},
  ];

  const { data: session } = authClient.useSession()
  const User = session?.user

  const Navmenu =   <div>
    <nav className="flex flex-col gap-1">
      <div>
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
        <p>{User?.role}</p>
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