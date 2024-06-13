import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import View from "../components/PdfView/View";
import { ScrollToTop } from "../components/common/ScrollToTop";
const PdfView = () => {
  return (
    <div>
      <Header />
      <View />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default PdfView;
