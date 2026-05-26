import DocsSidebar from "@/components/docs/sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import Logo from "@/components/logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

function DocsHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm sm:px-6">
      <Link href="/" className="hidden lg:block">
        <Logo />
      </Link>

      <SidebarTrigger className="lg:hidden" />
      
      <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search documentation..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
          />
        </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" asChild>
            <Link href="/auth/login">Login</Link>
        </Button>
        <Button asChild>
            <Link href="/auth/signup">Start Building</Link>
        </Button>
      </div>
    </header>
  );
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
        <div className="relative flex min-h-dvh">
            <DocsSidebar />
            <SidebarInset>
                <div className="flex max-h-dvh flex-col">
                    <DocsHeader />
                    <main className="flex-1 overflow-auto">
                        <div className="px-4 py-6 lg:px-8 lg:py-10">
                            {children}
                        </div>
                    </main>
                </div>
            </SidebarInset>
        </div>
    </SidebarProvider>
  );
}
