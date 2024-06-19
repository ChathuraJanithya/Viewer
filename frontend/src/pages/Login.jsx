import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/authentication";
import { Controller, useForm } from "react-hook-form";
import { Typography } from "../components/common/Typography";
import { Input, Button } from "@nextui-org/react";
import { ScrollToTop } from "../components/common/ScrollToTop";
const Login = () => {
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "all",
  });

  const [checkError, setCheckError] = useState("");

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      sessionStorage.setItem("authToken", data.token);
      localStorage.setItem("userData", JSON.stringify(data.result));
      window.location = "/user/home";
      reset();
    },
    onError: (error) => {
      setCheckError(error);
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    mutation.mutate({
      email: data.email,
      password: data.password,
    });

    setLoading(false);
  };

  const handleGoogleLogin = () => {
    try {
      window.location.href = `${
        import.meta.env.VITE_API_BASE_URL
      }auth/google/callback`;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
        className="grid w-full grid-cols-1 gap-4 h-lvh md:grid-cols-2 md:gap-0"
        id="login"
      >
        <div className="flex flex-col items-center justify-center bg-black ">
          <Typography
            variant="title"
            displayAs="h2"
            className="text-center text-white "
          >
            Get Started
          </Typography>
          <Typography
            variant="body"
            displayAs="p"
            className="mt-4 text-center text-white max-w-[300px]"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
            iste hic odio repellendus animi nobis reprehenderit, totam,
            recusandae ad distinctio facilis aspernatur ipsam blanditiis.
            Doloremque, molestias? Voluptatem, cumque dignissimos! Sit.
          </Typography>
        </div>
        <div className="flex flex-col items-center justify-center w-full mb-8 bg-white ">
          <Typography
            variant="title"
            displayAs="h2"
            className="font-medium text-center"
          >
            Login to your account
          </Typography>
          <Typography
            variant="body"
            displayAs="p"
            className="mt-4 text-center  max-w-[300px]"
          >
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold ">
              Sign up
            </Link>
          </Typography>
          <form className="w-full max-w-[350px] mt-8 ">
            <div className="flex flex-col w-full gap-2 ">
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
                    placeholder="Enter email"
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

              <Controller
                control={control}
                name="password"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    variant="bordered"
                    placeholder="Enter password"
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
            <p className="text-sm font-semibold text-red-400">{checkError}</p>
            <Button
              className="w-full mt-4 text-white bg-black"
              variant="filled"
              color="primary"
              radius="sm"
              onClick={handleSubmit(onSubmit)}
            >
              Login
            </Button>
          </form>
          <div className="flex items-center justify-center w-full ">
            <button
              className="flex items-center justify-center gap-2 mt-2 "
              onClick={handleGoogleLogin}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="70"
                height="70"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              <span className="font-semibold text-black text-md">
                Login with Google
              </span>
            </button>
          </div>
        </div>
      </motion.div>

      <ScrollToTop />
    </>
  );
};

export default Login;
