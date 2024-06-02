import { MdCloudUpload } from "react-icons/md";
import { useUploadDocModal } from "../../store";
import Modal from "./Modal";
import { useSnackbar } from "notistack";
import { ICart, Image } from "../../types";
import React, { useState } from "react";
import { FaRegFileAlt, FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Button from "../Button";
import { axiosInstance, uploadCartDoc } from "../../config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  uploadDoc: Image | null;
  setUploadDoc: React.Dispatch<React.SetStateAction<Image | null>>;
  cartData: ICart;
}

const UploadDocModal: React.FC<Props> = ({ cartData, setUploadDoc }) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const uploadDocStore = useUploadDocModal();
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const handleUploadCaseStudy = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files![0] as File;
    const fileSize = 5 * 1024 * 1024;
    if (file.size > fileSize) {
      enqueueSnackbar("File size is too large. Max file size is 5MB", {
        variant: "error",
      });
      return;
    }

    const supportedTypes = ["image/png", "image/jpeg", "application/pdf"];
    if (!supportedTypes.includes(file.type)) {
      enqueueSnackbar("Supported file types: png, jpeg, pdf, doc", {
        variant: "error",
      });
      return;
    }
    setUploadFile(file);
  };

  const uploadDocMutation = useMutation({
    mutationKey: ["carts", { action: "uploadDoc" }],
    mutationFn: async (formData: FormData) => {
      const response = await uploadCartDoc(formData);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      enqueueSnackbar("Document uploaded successfully", {
        variant: "success",
      });
      uploadDocStore.onClose();
      console.log(data);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      enqueueSnackbar(error?.response?.data.message, { variant: "error" });
    },
  });

  const deleteUploadDocMutation = useMutation({
    mutationKey: ["carts", { action: "uploadDoc" }],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (value: any) => {
      const response = await axiosInstance.post(
        "/carts/uploadDoc/delete",
        value,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("todayqToken")}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      enqueueSnackbar("Document deleted successfully", {
        variant: "success",
      });
      uploadDocStore.onClose();
      console.log(data);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      enqueueSnackbar(error?.response?.data.message, { variant: "error" });
    },
  });

  const handleDeleteFile = () => {
    const value = {
      cartId: cartData?._id,
      uploadDocId: cartData.uploadDoc.id,
    };
    deleteUploadDocMutation.mutate(value);
    setUploadFile(null);
    setUploadDoc(null);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("uploadDoc", uploadFile!);
    formData.append("cartId", cartData?._id);

    if (cartData.uploadDoc) {
      formData.append("uploadDocId", cartData.uploadDoc.id);
    }
    uploadDocMutation.mutate(formData);
  };

  const url = cartData.uploadDoc.url;
  const fileName = url.substring(url.lastIndexOf("/") + 1);

  const body = (
    <>
      <h4 className="font-semibold">Upload Document</h4>
      <div className="my-4">
        <label
          htmlFor="caseStudy"
          className="flex flex-col items-center justify-center h-40 border-2 border-[#1E77CC] border-dashed rounded-lg cursor-pointer bg-gray-50 max-w-[507px] w-full"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <MdCloudUpload className="text-[#1E77CC] w-20 h-20" />
            <p className="mb-2 text-xl">Browse Files to upload</p>
            <p className="text-xs text-[#5E5E5E]">
              Max file size 5 MB. Supported file types: png, jpeg, pdf, doc.
            </p>
          </div>
          <input
            id="caseStudy"
            type="file"
            className="hidden"
            onChange={handleUploadCaseStudy}
          />
        </label>

        {(uploadFile || (cartData.uploadDoc && cartData.uploadDoc.url)) && (
          <div className="my-4 bg-[#F1F8FF] p-4 rounded flex items-center gap-4">
            <FaRegFileAlt size={20} className="text-light-gray" />
            <span className="flex-1 break-words">
              {uploadFile?.name || (cartData.uploadDoc && fileName)}
            </span>

            <button onClick={handleDeleteFile}>
              <FaRegTrashAlt className="text-[#FF543E]" size={20} />
            </button>
          </div>
        )}

        <div className="flex items-start gap-4 my-4">
          <AiOutlineExclamationCircle className="text-light-gray w-6 h-6" />
          <p className="text-[#3A3838]">
            Lorem ipsum dolor sit amet consectetur. Tortor hac in posuere ornare
            volutpat.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button
            disabled={uploadDocMutation.isPending}
            label="Upload"
            onClick={handleUpload}
          />
          <Button label="Cancel" outline onClick={uploadDocStore.onClose} />
        </div>
      </div>
    </>
  );
  return (
    <Modal
      isOpen={uploadDocStore.isOpen}
      body={body}
      onClose={uploadDocStore.onClose}
    />
  );
};

export default UploadDocModal;
