import React from "react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  User,
} from "@nextui-org/react";
import { UserCard } from "./UserCard";

const HeaderPopover = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <Popover showArrow placement="bottom">
      <PopoverTrigger>
        <User
          as="button"
          name={userData?.name}
          description={userData?.email}
          className="transition-transform"
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
        />
      </PopoverTrigger>
      <PopoverContent className="p-1">
        <UserCard />
      </PopoverContent>
    </Popover>
  );
};

export default HeaderPopover;
