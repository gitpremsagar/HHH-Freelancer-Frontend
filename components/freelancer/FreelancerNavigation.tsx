"use client";

import FreelancerDynamicNavItem from "./FreelancerDynamicNavItem";
import {
  LayoutDashboard,
  Bell,
  Menu,
  X,
  Search,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect, type SubmitEvent } from "react";
import DashboardTab from "./DashboardTab";
import { routes } from "@/lib/routes";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function FreelancerNavigation({
  className,
}: {
  className?: string;
}) {
  const isMobile = useIsMobile();
  const user = useSelector((state: RootState) => state.auth.user);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement search functionality for freelancer jobs
      console.log("Searching for:", searchQuery);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const dashboardHref = user?.id ? routes.dashboard(user.id) : routes.logIn();
  const sellServiceHref = user?.id
    ? routes.createNewServiceNew()
    : routes.logIn();

  return (
    <nav
      className={`border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 sticky top-0 z-50 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Sidebar Trigger */}
          <div className="flex items-center">
            {mounted && isMobile && (
              <SidebarTrigger className="h-8 w-8 shrink-0">
                <Menu className="h-4 w-4" />
              </SidebarTrigger>
            )}
          </div>

          {/* Desktop Search Bar - Full Width */}
          <div className="hidden md:flex flex-1 mx-8">
            <form onSubmit={handleSearch} className="relative w-full flex">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search jobs, projects, clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="pl-10 pr-10 h-9 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-700 transition-colors rounded-r-none border-r-0"
                />
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <Button
                type="submit"
                className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-l-none border-l-0"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Desktop Navigation & Auth */}
          <div className="flex items-center space-x-8">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              
              <DashboardTab
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors flex items-center space-x-1"
                active={false}
              />

              <Link
                href={sellServiceHref}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors flex items-center space-x-1"
              >
                <Briefcase className="w-4 h-4" />
                <span>Sell Your Service</span>
              </Link>

              <Link
                href={routes.notifications()}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors flex items-center space-x-1"
              >
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </Link>
            </div>

            {/* Desktop Auth & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Desktop Auth */}
              <div className="hidden md:block">
                <FreelancerDynamicNavItem />
              </div>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[300px] sm:w-[400px] flex flex-col p-0"
                >
                  <SheetHeader className="p-6 pb-4">
                    <SheetTitle className="flex items-center">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        Freelancer Menu
                      </span>
                    </SheetTitle>
                  </SheetHeader>

                  {/* Scrollable Content */}
                  <div className="flex-1 overflow-y-auto px-6">
                    {/* Mobile Search Bar */}
                    <div className="mb-6">
                      <form onSubmit={handleSearch} className="relative flex">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            type="text"
                            placeholder="Search jobs, projects, clients..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            className="pl-10 pr-10 h-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-700 transition-colors rounded-r-none border-r-0"
                          />
                          {searchQuery && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={clearSearch}
                              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-200 dark:hover:bg-gray-600"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                        <Button
                          type="submit"
                          className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-l-none border-l-0"
                        >
                          <Search className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>

                    {/* Mobile Navigation Links */}
                    <div className="flex flex-col space-y-2">
                      <Link
                        href={dashboardHref}
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="text-lg">Dashboard</span>
                      </Link>

                      <Link
                        href={sellServiceHref}
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <Briefcase className="w-5 h-5" />
                        <span className="text-lg">Sell Your Service</span>
                      </Link>

                      <Link
                        href={routes.notifications()}
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <Bell className="w-5 h-5" />
                        <span className="text-lg">Notifications</span>
                      </Link>
                    </div>

                    {/* Mobile Auth */}
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <FreelancerDynamicNavItem />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
