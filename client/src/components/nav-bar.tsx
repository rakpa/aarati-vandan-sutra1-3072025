import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  Percent,
  Calculator,
  ArrowUpDown,
  DollarSign,
  FlaskConical,
  Clock,
  Home as HomeIcon,
  Calendar,
  Tag,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Percentage", icon: Percent, href: "/percentage" },
  { name: "Basic", icon: Calculator, href: "/basic" },
  { name: "Convert", icon: ArrowUpDown, href: "/convert" },
  { name: "Financial", icon: DollarSign, href: "/financial" },
  { name: "Mortgage", icon: HomeIcon, href: "/mortgage" },
  { name: "Age", icon: Calendar, href: "/age" },
  { name: "Scientific", icon: FlaskConical, href: "/scientific" },
  { name: "Time", icon: Clock, href: "/time" },
  { name: "Date Difference", icon: CalendarDays, href: "/date-diff" },
  { name: "Discount", icon: Tag, href: "/discount" },
];

export default function NavBar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "flex items-center gap-2 px-2 lg:px-3 py-2 text-sm font-medium transition-colors",
                isMobile ? "w-full justify-start px-4" : "",
                "hover:bg-purple-800/50 text-white",
                location === item.href
                  ? "bg-purple-800/50"
                  : ""
              )}
              onClick={() => setOpen(false)}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="whitespace-nowrap">{item.name}</span>
            </Button>
          </Link>
        );
      })}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#4B0082]">
      <div className="container flex h-14 items-center max-w-full relative">
        <Link href="/" className="absolute left-0">
          <Button 
            variant="ghost" 
            className={cn(
              "flex items-center space-x-2 text-white flex-shrink-0",
              "hover:bg-purple-800/50"
            )}
          >
            <Calculator className="h-5 w-5" />
            <span className="font-bold text-sm">CalcPro</span>
          </Button>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center flex-1 min-w-0 gap-1 lg:gap-2">
          <NavLinks isMobile={false} />
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="ml-auto">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[280px] bg-[#4B0082] text-white [&>button]:text-white [&>button]:hover:bg-purple-700">
            <nav className="flex flex-col gap-2">
              <NavLinks isMobile={true} />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}