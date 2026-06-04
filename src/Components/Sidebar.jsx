'use client'

import { authClient } from "@/lib/auth-client";
import {LayoutSideContentLeft , Bell, Envelope, Gear, House, Magnifier, Person} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export function SideNavigation() {
  const navItems = [
    { href: '/' ,icon: House, label: "Home"},
    { href: '/' ,icon: Magnifier, label: "Search"},
    { href: '/' ,icon: Bell, label: "Notifications"},
    { href: '/' ,icon: Envelope, label: "Messages"},
    { href: '/' ,icon: Person, label: "Profile"},
    { href: '/' ,icon: Gear, label: "Settings"},
  ];

  const { data: session } = authClient.useSession()
  const User = session?.user

  const Navmenu =   <div>
    <nav className="flex flex-col gap-1">
      <div >
        <div className="flex items-center gap-4">
           <img className="rounded-full" src={User?.image} alt="User Image" width={60}  height={60} />
                   <div>
                    <h1 className="font-semibold">{User?.name}</h1>
                    <p>Hello</p>
                   </div>
        </div>
                 <button className="py-1.5 my-2 px-2 rounded-2xl bg-black">Premium Account</button>  
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