import React from "react";
import Link from "next/link";

export function TopMenu() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <nav className={"mx-6 flex items-center space-x-4 lg:space-x-6"}>
          <Link
            href="/examples/dashboard"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Overview
          </Link>
          <Link
            href="/examples/dashboard"
            className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
          >
            Customers
          </Link>
          <Link
            href="/examples/dashboard"
            className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
          >
            Products
          </Link>
          <Link
            href="/examples/dashboard"
            className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
          >
            Settings
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4"></div>
      </div>
    </div>
  );
}
