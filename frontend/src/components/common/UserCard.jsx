import React from "react";
import { Avatar, Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

export const UserCard = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleLogout = () => {
    localStorage.removeItem("userData");
    sessionStorage.removeItem("authToken");
    window.location = "/login";
  };

  return (
    <>
      <Card shadow="none" className="max-w-[300px] border-none bg-transparent">
        <CardHeader className="justify-between">
          <div className="flex gap-3">
            <Avatar
              isBordered
              radius="full"
              size="md"
              src="https://i.pravatar.cc/150?u=a04258114e29026702d"
            />
            <div className="flex flex-col items-start justify-center">
              <h4 className="font-semibold leading-none text-small text-default-600">
                {userData?.name}
              </h4>
              <h5 className="tracking-tight text-small text-default-500">
                @{userData?.name}
              </h5>
            </div>
          </div>
          <Button color="primary" radius="full" size="sm" onClick={onOpen}>
            Logout
          </Button>
        </CardHeader>
        <CardBody className="px-3 py-0">
          <p className="pl-px text-small text-default-500">
            Full-stack developer, @getnextui lover she/her
            <span aria-label="confetti" role="img">
              🎉
            </span>
          </p>
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <p className="text-xl font-medium text-center ">
                  {" "}
                  Do you want to Logout ?{" "}
                </p>
              </ModalBody>
              <ModalFooter className="flex justify-center ">
                <Button className="text-white bg-black " onClick={handleLogout}>
                  Logout
                </Button>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
