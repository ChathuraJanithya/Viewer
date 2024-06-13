import React from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const services = [
  {
    title: " lorem lorem",
    link: "/home",
  },
  {
    title: " lorem lorem",
    link: "/home",
  },
  {
    title: " lorem lorem",
    link: "/home",
  },
  {
    title: " lorem lorem",
    link: "/home",
  },
];

const quickLinks = [
  {
    title: "lorem lorem ",
    link: "/home",
  },
  {
    title: "lorem lorem ",
    link: "/home",
  },
  {
    title: "lorem lorem ",
    link: "/home",
  },
];

function Footer() {
  return (
    <div className="w-full px-0 py-12 bg-black lg:pb-12 lg:pt-24">
      <div className="px-4 mx-auto max-w-7xl md:px-8">
        <Link to="/home">
          <div className="flex items-center text-4xl font-extrabold text-white uppercase flex-2 lg:justify-start">
            PDF Viewer
          </div>
        </Link>
        <div className="grid grid-cols-1 gap-4 mb-12 md:grid-cols-3 lg:grid-cols-3">
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
            className="mb-8 text-center text-white font-figtree md:mb-0 md:text-left"
          >
            <div className="flex justify-center flex-1 md:justify-start"></div>
            <p className="mt-6 font-figtree text-[16px] text-slate-400 md:text-[18px]">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis
              ab, maxime molestias pariatur tenetur beatae aperiam! Laboriosam
              odio animi quisquam dicta vitae eaque consectetur praesentium sit
              incidunt eligendi, quidem magni.
            </p>

            <br />

            <div className="mt-4 flex flex-1  cursor-pointer justify-center space-x-2 text-[16px] text-blue-400 md:mt-0 md:justify-start">
              <Link href="#">
                <GrMail className="h-[32px] w-[32px] rounded-full bg-zinc-800 p-2 transition duration-300 ease-in-out hover:scale-[1.3]" />
              </Link>
              <Link href="#" target="_blank">
                <FaFacebookF className="h-[32px] w-[32px] rounded-full bg-zinc-800 p-2 transition duration-300 ease-in-out hover:scale-[1.3]" />
              </Link>
              <Link href="#" target="_blank">
                <FaLinkedinIn className="h-[32px] w-[32px] rounded-full bg-zinc-800 p-2 transition duration-300 ease-in-out hover:scale-[1.3]" />
              </Link>
            </div>
          </motion.div>

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
            className="pl-0 text-center font-figtree sm:pl-6 md:pl-12 md:text-right lg:pl-24"
          >
            <p className="mb-4 text-[22px] font-semibold text-slate-200">
              Lorem ipsum dolor sit amet
            </p>
            {quickLinks.map((item) => (
              <Link
                href={item.link}
                className="relative mb-2 block w-full text-center text-[16px] text-slate-400 after:absolute after:block after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-blue-600 after:transition after:duration-300 after:content-[''] after:hover:scale-x-100 md:text-right md:text-[18px]"
              >
                {item.title}
              </Link>
            ))}
          </motion.div>

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
            className="pl-0 text-center font-figtree sm:pl-6 md:pl-12 md:text-right lg:pl-24"
          >
            <p className="mb-4 text-[22px] font-semibold text-slate-200">
              Our Services
            </p>

            {services.map((item) => (
              <Link href={item.link}>
                <p className="relative mb-2 block w-full text-center text-[16px] text-slate-400 after:absolute after:block after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-blue-600 after:transition after:duration-300 after:content-[''] after:hover:scale-x-100 md:text-right md:text-[18px]">
                  {item.title}
                </p>
              </Link>
            ))}
          </motion.div>
        </div>

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
          className="block flex-1 items-center justify-between border-t border-slate-600 pt-12 text-center font-figtree text-[14px] text-slate-300 md:flex"
        >
          <div className="">
            <p>Copyright © {new Date().getFullYear()} Lorem ipsum dol</p>
          </div>
          <div className="flex justify-center mt-4 space-x-6">
            <Link
              href=""
              className="relative mb-2 block w-fit after:absolute after:block after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-blue-600 after:transition after:duration-300 after:content-[''] after:hover:scale-x-100"
            >
              Privacy Policy
            </Link>
            <Link
              href=""
              className="relative mb-2 block w-fit after:absolute after:block after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-blue-600 after:transition after:duration-300 after:content-[''] after:hover:scale-x-100"
            >
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Footer;
