'use client'

import { authClient } from "@/lib/auth-client";
import {LayoutSideContentLeft , Bell, Envelope, Gear, House, Magnifier, Person} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import Image from "next/image";

export function SideNavigation() {
  const navItems = [
    {icon: House, label: "Home"},
    {icon: Magnifier, label: "Search"},
    {icon: Bell, label: "Notifications"},
    {icon: Envelope, label: "Messages"},
    {icon: Person, label: "Profile"},
    {icon: Gear, label: "Settings"},
  ];

  const { data: session } = authClient.useSession()
  const User = session?.user

  const Navmenu =   <div>
    <nav className="flex flex-col gap-1">
      <div className="flex items-center gap-4">
                   <img className="rounded-full" src={User?.image} alt="User Image" width={60}  height={60} />
                   <div>
                    <h1 className="font-semibold">{User?.name}</h1>
                    <p>Hello</p>
                   </div>
                  </div>
                {navItems.map((item) => (
                <button
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    type="button"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </button>
                  
                  
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