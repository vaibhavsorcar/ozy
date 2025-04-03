
import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Search, MapPin, User, Home } from "lucide-react";
import { cn } from "@/lib/utils";

// This will be replaced with Supabase auth later
const isLoggedIn = false;

export function Header() {
  const isMobile = useIsMobile();
  
  const navItems = [
    { name: "Home", path: "/", icon: <Home className="mr-2 h-4 w-4" /> },
    { name: "Search Medicines", path: "/medicines", icon: <Search className="mr-2 h-4 w-4" /> },
    { name: "Find Pharmacies", path: "/pharmacies", icon: <MapPin className="mr-2 h-4 w-4" /> },
  ];

  const MobileMenu = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center space-x-2">
              <div className="text-medic-blue">MediChain</div>
            </div>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-8">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path}
              className="flex items-center px-2 py-3 text-lg font-medium rounded-md hover:bg-muted"
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t">
            {isLoggedIn ? (
              <>
                <Link 
                  to="/profile" 
                  className="flex items-center px-2 py-3 text-lg font-medium rounded-md hover:bg-muted"
                >
                  <User className="mr-2 h-4 w-4" />
                  My Profile
                </Link>
                <Button className="w-full mt-2" variant="outline">Sign Out</Button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Button asChild variant="default">
                  <Link to="/login">Log In</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );

  const DesktopMenu = () => (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {navItems.map((item) => (
          <NavigationMenuItem key={item.name}>
            <Link to={item.path} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <span className="flex items-center">
                  {item.icon}
                  <span>{item.name}</span>
                </span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MobileMenu />
        
        <div className="flex items-center gap-2 font-bold mr-4 text-xl">
          <Link to="/" className="flex items-center">
            <span className="text-medic-blue">Medi</span>
            <span className="text-medic-green">Chain</span>
          </Link>
        </div>
        
        <DesktopMenu />
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          {isLoggedIn ? (
            <Button variant="ghost" className="inline-flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">My Profile</span>
            </Button>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button asChild variant="ghost">
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
