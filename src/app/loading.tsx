import Image from "next/image";
import React from "react";

const GlobalLoading = () => {
  return (
    <div className="flex items-center justify-center text-center mt-10 m-3 p-3">
      <div className="flex flex-col items-center justify-center gap-3">
        <Image
          src="/assets/allAboutNextAuth.jpg"
          alt="logo"
          width={100}
          height={100}
        />
        <p className="font-bold m-1 p-2">Loading...</p>
      </div>
    </div>
  );
};

export default GlobalLoading;
