import React, { Suspense, lazy } from "react";

const SignupForm = lazy(() => import("@/components/pageComponents/signupForm"));

const Homepage = () => {
  return (
    <div className="container mx-auto animate-bump overflow-hidden">
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <SignupForm />
      </Suspense>
    </div>
  );
};

export default Homepage;
