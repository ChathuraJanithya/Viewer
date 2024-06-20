import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { createPdf } from "../../services/pdfService";

const UploadSection = () => {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      pdfName: "",
      pdfUrl: "",
    },
    mode: "onTouched",
  });
  const mutation = useMutation({
    mutationFn: createPdf,
    onSuccess: () => {
      alert("Pdf uploaded successfully");
      queryClient.invalidateQueries({ queryKey: ["myPdfs"] });
    },
    onError: (error) => {
      alert(error);
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("pdfName", data.pdfName);
    formData.append("pdfUrl", data.pdfUrl[0]);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    mutation.mutate(formData);

    reset();
    setLoading(false);
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
        className=" max-w-[1440px] my-12   mx-auto px-4 py-[64px] md:py-[96px]  border-4  border-blue-500 border-dashed rounded-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-center text-blue-500">
              Upload your PDF
            </h1>
            <p className="text-lg text-center text-gray-500">
              Upload your PDF file to view it in the browser.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={onOpen}
              className="px-6 py-2 text-white bg-blue-500 rounded-lg"
            >
              Upload PDF
            </button>
          </div>
        </div>
      </motion.div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Upload PDF
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2 px-1 py-2">
                  <div className="flex flex-col gap-2 ">
                    <Controller
                      control={control}
                      name="pdfName"
                      rules={{
                        required: "pdf Tittle is required",
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          type="text"
                          variant="bordered"
                          radius="sm"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          label="PDF Tittle"
                          isInvalid={errors.pdfName ? true : false}
                        />
                      )}
                    />
                    <p className="text-xs text-red-400">
                      {errors.pdfName && errors.pdfName.message}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-2 item-center">
                    <img
                      src="https://play-lh.googleusercontent.com/LvJB3SJdelN1ZerrndNgRcDTcgKO49d1A63C5hNJP06rMvsGkei-lwV52eYZJmMknCwW"
                      alt="pdf"
                      className="w-8 h-8 rounded-lg"
                    />
                    <input
                      type="file"
                      {...register("pdfUrl", { required: true })}
                      accept="application/pdf"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3 ">
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    color="primary"
                    onPress={onClose}
                  >
                    Upload
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UploadSection;
