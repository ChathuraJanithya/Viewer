import { useState } from "react";
import { Dialog, Disclosure, Popover } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  CloudIcon,
} from "@heroicons/react/24/outline";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { User } from "@nextui-org/react";
import HeaderPopover from "./HeaderPopover";

const products = [
  {
    name: "lorem lorem",
    description: "Level up your online presence",
    href: "/",
    icon: ComputerDesktopIcon,
  },
  {
    name: "lorem lorem",
    description: "Level up your online presence",
    href: "/",
    icon: DevicePhoneMobileIcon,
  },
  {
    name: "lorem lorem",
    description: "Level up your online presence",
    href: "/",
    icon: CloudIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useLocation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const routerPath = router?.pathname === "/user/" ? false : true;
  const handleLogout = () => {
    localStorage.removeItem("userData");
    sessionStorage.removeItem("authToken");
    window.location = "/login";
  };

  return (
    <>
      <header className="sticky top-0 z-[9999] border-b-[1px] border-slate-100 bg-white font-figtree shadow-md shadow-[#E8E8E8]/20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{
            opacity: 1,
            transition: {
              duration: 0.5,
              type: "spring",
              stiffness: 50,
              delay: 0.2,
            },
            y: 0,
          }}
          viewport={{ once: true }}
        >
          <nav
            className="flex items-center justify-between flex-1 w-full px-4 py-3 mx-auto max-w-7xl lg:px-8 lg:py-4"
            aria-label="Global"
          >
            <Link to="/home">
              <div className="flex items-center text-xl font-extrabold uppercase md:text-4xl flex-2 lg:justify-start">
                PDF Viewer
              </div>
            </Link>

            <div className="flex items-center justify-end w-full gap-2 lg:hidden">
              <button className="items-end px-1 ml-2 " onClick={onOpen}>
                <User
                  avatarProps={{
                    src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                  }}
                />
              </button>
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  className="w-6 h-6 text-blue-600"
                  aria-hidden="true"
                />
              </button>
            </div>
            <div
              className={
                routerPath
                  ? "flex items-center justify-center text-[18px]"
                  : "hidden"
              }
            >
              <Popover.Group className="flex-1 hidden lg:flex lg:flex-initial lg:gap-x-12">
                <button
                  onClick={() => {
                    window.location = "/user/home";
                  }}
                  className="font-semibold hover:text-blue-600"
                >
                  Home
                </button>
              </Popover.Group>
            </div>
            <div className="hidden lg:flex">
              <HeaderPopover />
            </div>
          </nav>
        </motion.div>

        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5"></a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-8 flow-root text-[14px]">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6 space-y-2">
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {[...products].map((item) => (
                            <Disclosure.Button
                              key={item.name}
                              as="a"
                              href={item.href}
                              className={`flex items-center rounded-lg py-2 pl-6 pr-3 font-figtree text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50`}
                            >
                              <item.icon
                                className="w-6 h-6 mr-4 text-gray-600 group-hover:text-indigo-600"
                                aria-hidden="true"
                              />
                              {item.name}
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <div className="flex flex-col items-start gap-6 pl-12 text-start ">
                    <button
                      onClick={() => {
                        window.location = "/user/home";
                      }}
                      className="font-semibold hover:text-blue-600"
                    >
                      Home
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
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
}
