
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { SearchDialog } from "./SearchDialog";
import { useNavbar } from "./navbar-provider";

const Layout = () => {
  const { isSearchOpen, setSearchOpen } = useNavbar();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 md:px-6 py-4 md:py-8 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
      <SearchDialog open={isSearchOpen} onOpenChange={setSearchOpen} />
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 md:gap-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Educational AI Repository. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
