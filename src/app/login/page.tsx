import React, { lazy, Suspense } from "react";

const LoginForm = lazy(() => import("@/components/pageComponents/loginForm"));

const LoginPage = () => {
  return (
    <div className="container mx-auto animate-bump overflow-hidden">
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default LoginPage;
