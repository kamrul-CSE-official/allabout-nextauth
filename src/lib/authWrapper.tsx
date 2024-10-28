"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

interface AuthWrapperProps {
  children: ReactNode;
}

function authWrapper<P>(WrappedComponent: React.ComponentType<P>) {
  const ProtectedComponent: React.FC<AuthWrapperProps & P> = (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/login");
      }
    }, [status, router]);

    if (status === "loading") {
      return <div>Loading...</div>;
    }

    return session ? <WrappedComponent {...props} /> : null;
  };

  return ProtectedComponent;
}

export default authWrapper;
