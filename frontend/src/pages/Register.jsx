import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { register } from "../services/authentication";
import { Typography } from "../components/common/Typography";
import { Input, Button } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    refresh,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      nic: "",
      contact: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const [checkError, setCheckError] = useState("");
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      window.location = "/login";
    },
    onError: (error) => {
      setCheckError(error);
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    mutation.mutate({
      name: data.name,
      nic: data.nic,
      contact: data.contact,
      email: data.email,
      password: data.password,
    });
    reset();
    setLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{
          opacity: 1,
          transition: {
            duration: 2,
            type: "tween",
            ease: "backOut",
          },
          y: 0,
        }}
        viewport={{ once: true }}
        className="grid h-screen grid-cols-1 gap-4 md:grid-cols-2 lg:gap-0"
      >
        <div className="flex flex-col items-center justify-center py-12 bg-black ">
          <Typography
            variant="title"
            displayAs="h2"
            className="text-center text-white "
          >
            Get Your Account Now !
          </Typography>
          <Typography
            variant="body"
            displayAs="p"
            className="mt-4 text-center text-white max-w-[400px]"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
            iste hic odio repellendus animi nobis reprehenderit, totam,
            recusandae ad distinctio facilis aspernatur ipsam blanditiis.
            Doloremque, molestias? Voluptatem, cumque dignissimos! Sit.
          </Typography>
        </div>
        <div className="flex flex-col items-center justify-center w-full mb-8 ">
          <Typography
            variant="title"
            displayAs="h2"
            className="font-medium text-center"
          >
            Get Your Free Account
          </Typography>
          <Typography
            variant="body"
            displayAs="p"
            className="mt-4 text-center  max-w-[300px]"
          >
            Have an account?{" "}
            <Link to="/" className="font-semibold ">
              Sign in
            </Link>
          </Typography>
          <form className="w-full max-w-[600px] mt-8 ">
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 ">
              <div className="flex flex-col gap-2 ">
                <Controller
                  control={control}
                  name="name"
                  rules={{
                    required: "Name is required",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      type="text"
                      variant="bordered"
                      radius="sm"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      label="Name"
                      isInvalid={errors.name ? true : false}
                    />
                  )}
                />
                <p className="text-xs text-red-400">
                  {errors.name && errors.name.message}
                </p>
              </div>
              <div className="flex flex-col gap-2 ">
                <Controller
                  control={control}
                  name="nic"
                  rules={{
                    required: "NIC is required",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      type="text"
                      variant="bordered"
                      radius="sm"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      label="NIC"
                      isInvalid={errors.nic ? true : false}
                    />
                  )}
                />
                <p className="text-xs text-red-400">
                  {errors.nic && errors.nic.message}
                </p>
              </div>
              <div className="flex flex-col gap-2 ">
                <Controller
                  control={control}
                  name="contact"
                  rules={{
                    required: "Phone is required",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      type="number"
                      variant="bordered"
                      radius="sm"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      label="Phone"
                      isInvalid={errors.contact ? true : false}
                    />
                  )}
                />
                <p className="text-xs text-red-400">
                  {errors.contact && errors.contact.message}
                </p>
              </div>
              <div className="flex flex-col gap-2 ">
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: true,
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Please enter a valid email",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      isInvalid={errors.email ? true : false}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      type="email"
                      label="Email"
                      autocomplete="false"
                      variant="bordered"
                    />
                  )}
                />

                <p className="text-xs text-red-400">
                  {errors.email &&
                    errors.email.type === "required" &&
                    "Email is required"}
                </p>
              </div>
              <div className="flex flex-col gap-2 ">
                <Controller
                  control={control}
                  name="password"
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      variant="bordered"
                      onChange={onChange}
                      onBlur={onBlur}
                      isInvalid={errors.password ? true : false}
                      value={value}
                      type="password"
                      label="Password"
                      autocomplete="false"
                    />
                  )}
                />

                <p className="text-xs text-red-400">
                  {errors.password &&
                    errors.password.type === "required" &&
                    "Password is required"}
                </p>
              </div>
            </div>
          </form>
          <p className="text-xs text-red-400">{checkError}</p>
          <Button
            className="w-full flex justify-center mb-8 items-center mt-4 text-white max-w-[400px] bg-black"
            variant="filled"
            color="primary"
            radius="sm"
            onClick={handleSubmit(onSubmit)}
          >
            Sign Up
          </Button>
        </div>
      </motion.div>
    </>
  );
};
export default Register;
