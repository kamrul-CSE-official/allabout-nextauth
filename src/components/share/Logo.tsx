import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="w-16 h-16 rounded-full p-1">
      <Image
        src="/assets/allAboutNextAuth.jpg"
        alt="logo"
        width={100}
        height={100}
      />
    </div>
  );
};

export default Logo;
