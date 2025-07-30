import { SearchBar } from "./SearchBar";
// import { MenuBar } from "./MenuBar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full px-2 sm:container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 sm:mx-auto sm:px-4">
          {/* <MenuBar /> */}
          <div className="flex flex-1 items-center justify-end space-x-4">
            <SearchBar />
          </div>
        </div>
      </header>
      <main className="w-full px-1 sm:container sm:mx-auto sm:py-6 sm:px-2">
        {children}
      </main>
    </div>
  );
} 