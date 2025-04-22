

import { Link, useNavigate } from "react-router-dom";
import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavbar } from "./navbar-provider";

export function Navbar() {
  const { user, loginWithGoogle, logout } = useAuth();
  const { setSearchOpen } = useNavbar();
  const navigate = useNavigate();

  // Handle login with Google
  const handleLogin = async () => {
    await loginWithGoogle();
  };

  // Handle logout
  const handleLogout = async () => {
    await logout();
    navigate("/"); // Navigate to home page after logout
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl font-semibold tracking-tight">
            Educational AI Repository
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(true)}
            className="hover:bg-transparent"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.image} alt={user?.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer w-full">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default" onClick={handleLogin} className="bg-primary text-primary-foreground">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
