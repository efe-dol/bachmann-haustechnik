"use client";

import { usePathname } from "next/navigation";

type HideOnMaintenanceRouteProps = {
  children: React.ReactNode;
};

export default function HideOnMaintenanceRoute({ children }: HideOnMaintenanceRouteProps) {
  const pathname = usePathname();

  if (pathname === "/wartung") {
    return null;
  }

  return <>{children}</>;
}
