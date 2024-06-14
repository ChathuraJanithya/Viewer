import React from "react";
import { motion } from "framer-motion";
import { Typography } from "../common/Typography";
import { getAllUserPdfs, getAll } from "../../services/pdfService";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Link } from "react-router-dom";

const MyPdf = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const isAdmin = userData?.role === "Admin";
  const { isLoading, isSuccess, isError, error, data } = useQuery({
    queryKey: ["myPdfs"],
    queryFn: () => (isAdmin ? getAll() : getAllUserPdfs()),
    enabled: true,
    staleTime: Infinity,
  });
  console.log(data);
  return (
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
      className=" max-w-[1440px] my-8 mx-auto px-4 py-[54px] md:py-[64px]  "
    >
      <Typography variant="title" displayAs="h2" className="text-start">
        {isAdmin ? "All PDFs" : "My PDFs"}
      </Typography>
      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
        {isLoading && <div>Loading...</div>}
        {isSuccess &&
          data?.data?.length !== 0 &&
          data?.data.map((pdf) => (
            <div
              key={pdf?._id}
              className="p-4 rounded-lg max-w-[300px] shadow-sm"
            >
              <Typography
                variant="body"
                displayAs="p"
                className="font-semibold"
              >
                {"Title"} : {pdf?.pdfName}
              </Typography>
              <div className="flex flex-col ir ">
                <img
                  src="https://play-lh.googleusercontent.com/xeo9T48MROpLPy2PSubjLfmGvLrwsPIN1ILmWJl9ignCbex7Hq3F7YgWpA0zsGm5a22z"
                  alt="pdf image"
                  className="flex items-center justify-center w-36 h-36"
                />
              </div>
              <Typography
                variant="body"
                displayAs="p"
                className="text-[#475569] truncate line-clamp-2"
              >
                <div>
                  <a
                    href={`/pdf/${pdf?.pdfUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View PDF
                  </a>
                </div>
              </Typography>
              <div>
                Uploaded at : {moment(pdf.createdAt).format("MMMM Do YYYY")}
              </div>
              {isAdmin && <div>Uploaded By : {pdf?.uploadedBy?.name}</div>}
              <Link to={`/user/pdfView/${pdf._id}`}>View more </Link>
            </div>
          ))}
        {isSuccess && data?.data?.length === 0 && (
          <div className="flex justify-center text-xl font-medium text-center ">
            {isAdmin ? "No PDFs found" : "No PDFs uploaded by you"}
          </div>
        )}
        {isError && <div>{error}</div>}
      </div>
    </motion.div>
  );
};

export default MyPdf;
