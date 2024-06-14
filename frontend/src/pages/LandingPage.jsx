import React from "react";
import { Button } from "@nextui-org/react";
import { Typography } from "../components/common/Typography";

const LandingPage = () => {
  const handleScroll = () => {
    window.location = "/login";
  };
  return (
    <div className="max-w-[1440px] mx-auto px-4 w-full flex h-screen justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <div className="relative ">
          <img
            src="https://www.svgrepo.com/show/189459/traffic-sign-welcome.svg"
            alt=" welcome-img"
            className="w-[100px] h-[100px] bottom-[18px] -right-2 absolute"
          />
          <Typography variant="title" displayAs="h1" className="text-center">
            Welcome
          </Typography>
        </div>

        <Typography variant="title2" displayAs="p" className="mt-4 text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          vehicula, libero eget ullamcorper.
        </Typography>

        <img
          src="https://www.svgrepo.com/show/486773/pdf-document.svg"
          alt="pdf-icon"
          className="w-[200px] h-[200px] mt-8"
        />
        <Button
          className="w-[240px] hover:scale-105 mt-8 self-center text-white text-[20px] bg-slate-900 font-bold"
          variant="filled"
          color="primary"
          radius="lg"
          onClick={handleScroll}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
