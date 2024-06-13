import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { ScrollToTop } from "../components/common/ScrollToTop";
import UploadSection from "../components/homepage/UploadSection";
import MyPdf from "../components/homepage/MyPdf";

const Home = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const role = userData?.role;
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
