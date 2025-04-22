
import { createContext, useContext, useState } from "react";

type NavbarProviderProps = {
  children: React.ReactNode;
};

type NavbarProviderState = {
  isSearchOpen: boolean;
  setSearchOpen: (isOpen: boolean) => void;
};

const initialState: NavbarProviderState = {
  isSearchOpen: false,
  setSearchOpen: () => null,
};

const NavbarProviderContext = createContext<NavbarProviderState>(initialState);

export function NavbarProvider({ children }: NavbarProviderProps) {
  const [isSearchOpen, setSearchOpen] = useState(false);

  const value = {
    isSearchOpen,
    setSearchOpen,
  };

  return (
    <NavbarProviderContext.Provider value={value}>
      {children}
    </NavbarProviderContext.Provider>
  );
}

export const useNavbar = () => {
  const context = useContext(NavbarProviderContext);

  if (context === undefined)
    throw new Error("useNavbar must be used within a NavbarProvider");

  return context;
};
