"use client"

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { Home, KeyRound, Mail, Package, Cpu, BookOpen, Shield, LifeBuoy, FileCode2, Signal } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "../logo"

const menuItems = [
    {
        group: "Getting Started",
        items: [
            { name: "Quickstart", href: "/docs", icon: Home },
            { name: "CLI Installation", href: "/docs/cli", icon: FileCode2 },
        ]
    },
    {
        group: "Services",
        items: [
            { name: "Authentication", href: "/docs/authentication", icon: KeyRound },
            { name: "SMTP", href: "/docs/smtp", icon: Mail },
            { name: "Storage", href: "/docs/storage", icon: Package },
            { name: "Serverless", href: "/docs/serverless", icon: Cpu },
        ]
    },
    {
        group: "Resources",
        items: [
            { name: "API Reference", href: "/docs/api", icon: BookOpen },
            { name: "Security", href: "/docs/security", icon: Shield },
            { name: "Support", href: "/docs/support", icon: LifeBuoy },
            { name: "Status", href: "/status", icon: Signal },
        ]
    }
]

export default function DocsSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar>
            <div className="flex h-16 items-center px-4 lg:hidden">
                <Link href="/">
                    <Logo />
                </Link>
            </div>
            <SidebarContent>
                {menuItems.map((group) => (
                    <SidebarGroup key={group.group}>
                        <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
                        <SidebarMenu>
                            {group.items.map((item) => (
                                <SidebarMenuItem key={item.name}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.href}
                                        tooltip={item.name}
                                    >
                                        <Link href={item.href}>
                                            <item.icon />
                                            <span>{item.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                ))}
            </SidebarContent>
        </Sidebar>
    )
}
