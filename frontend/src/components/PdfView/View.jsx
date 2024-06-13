import React, { useState } from "react";
import { motion } from "framer-motion";
import { Typography } from "../common/Typography";
import { getPdfById } from "../../services/pdfService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const View = () => {
  const { id } = useParams();
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const { isLoading, isSuccess, isError, error, data, refetch, isFetching } =
    useQuery({
      queryKey: ["myPdf"],
      queryFn: () => getPdfById(id),
      enabled: true,
      staleTime: Infinity,
    });

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
      <Typography variant="title" displayAs="h2" className="mb-6 text-center">
        PDF Details
      </Typography>
      {isLoading && (
        <div className="flex items-center justify-center ">Loading...</div>
      )}
      {isSuccess && (
        <div className="flex items-center justify-center w-full py-4 bg-slate-100">
          <Document
            file={`/pdf/${data?.data?.pdfUrl}`}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <>
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </>
            ))}
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default View;
