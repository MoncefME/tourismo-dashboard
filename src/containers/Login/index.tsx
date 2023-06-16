import { IMAGES } from "@/constants/images";
import Image from "next/image";
import React from "react";
import LoginForm from "./components/LoginForm";

const LoginContainer: React.FC = () => {
  return (
    <div className="h-screen flex items-center justify-center flex-col gap-y-2">
      <Image
        src={IMAGES.LOGO}
        alt="logo"
        width={150}
        height={70}
        className="object-contain drop-shadow-md"
      />
      <LoginForm />
    </div>
  );
};

export default LoginContainer;
