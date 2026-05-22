"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center px-4",
        isScrolled ? "pt-4" : "pt-8"
      )}
    >
      <nav
        className={cn(
          "flex items-center justify-between glass rounded-full px-6 transition-all duration-500 w-full max-w-7xl",
          isScrolled ? "py-3 shadow-xl" : "py-4 bg-transparent border-transparent"
        )}
      >
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center font-headline font-bold text-white">
            B
          </div>
          <span className="font-headline font-bold text-xl tracking-tight text-white">
            BeVirtual
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-white/70">
          <Link href="/locations" className="hover:text-primary transition-colors">Locations</Link>
          <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
          <Link href="/why-virtual-office" className="hover:text-primary transition-colors">Why BeVirtual</Link>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white/70 hover:text-primary hover:bg-transparent data-[state=open]:bg-transparent">
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent className="glass border-white/10 p-4 w-[400px]">
                  <ul className="grid gap-3">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/resources" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/5 hover:text-primary">
                          <div className="text-sm font-bold text-white">Compliance Guide</div>
                          <p className="line-clamp-2 text-xs leading-snug text-white/40">State-wise GST guides and incorporation checklists.</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/faq" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/5 hover:text-primary">
                          <div className="text-sm font-bold text-white">Help Center</div>
                          <p className="line-clamp-2 text-xs leading-snug text-white/40">Common questions about legality, documentation and mail.</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/about" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/5 hover:text-primary">
                          <div className="text-sm font-bold text-white">About Us</div>
                          <p className="line-clamp-2 text-xs leading-snug text-white/40">Our mission to empower Indian startups and builders.</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-white border-none px-6 font-bold shadow-lg shadow-primary/20">
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}