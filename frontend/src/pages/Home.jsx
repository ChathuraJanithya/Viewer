import React, { useEffect } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { ScrollToTop } from "../components/common/ScrollToTop";
import UploadSection from "../components/homepage/UploadSection";
import MyPdf from "../components/homepage/MyPdf";
import axios from "axios";

const Home = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const role = userData?.role;

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}auth/login/success`,
        {
          withCredentials: true,
        }
      );

      localStorage.setItem(
        "userData",
        JSON.stringify(response?.data?.data?.result)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Header />
      {role !== "Admin" && <UploadSection />}
      <MyPdf />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Home;
