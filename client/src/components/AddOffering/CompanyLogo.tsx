import React from "react";
import { MdCloudUpload } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";
import { useAddOfferingContext } from "../../hooks/useGlobalState";
import { useSnackbar } from "notistack";

const CompanyLogo = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { companyLogo, setCompanyLogo } = useAddOfferingContext();

  const handleUploadCompanyLogo = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files![0] as File;
    const supportedTypes = [
      "image/svg+xml",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];
    const fileType = file.type.toLowerCase();
    if (!supportedTypes.includes(fileType)) {
      enqueueSnackbar("Supported file types: SVG, PNG, JPG, JPEG", {
        variant: "error",
      });
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width > 800 || img.height > 400) {
        enqueueSnackbar("Maximum dimensions: 800x400px", { variant: "error" });
        return;
      }
      setCompanyLogo(file);
    };
  };

  const handleCompanyLogoDelete = () => {
    setCompanyLogo(null);
  };

  return (
    <div className="">
      {companyLogo ? (
        <div className="flex flex-col h-40 border border-[#DADADA] rounded-lg cursor-pointer bg-gray-50 max-w-[281px] w-full border-b-0">
          <img
            src={URL.createObjectURL(companyLogo)}
            alt="companyLogo"
            className="w-full object-contain h-[calc(100%_-_44px)]"
          />
          <div className="grid grid-cols-2 w-full h-11 bg-[#DBDBDB] rounded-b-lg">
            <label
              htmlFor="companyLogo"
              className="w-full flex items-center justify-center gap-2"
            >
              <AiOutlineEdit size={22} className="text-[#0A0A0A]" />
              <span className="text-lg">Edit</span>
              <input
                id="companyLogo"
                type="file"
                className="hidden"
                onChange={handleUploadCompanyLogo}
              />
            </label>

            <button
              onClick={handleCompanyLogoDelete}
              className="flex items-center justify-center gap-2"
            >
              <IoTrashOutline size={22} className="text-[#0A0A0A]" />
              Delete
            </button>
          </div>
        </div>
      ) : (
        <label
          htmlFor="companyLogo"
          className="flex flex-col items-center justify-center h-40 border-2 border-[#DADADA] border-dashed rounded-lg cursor-pointer bg-gray-50 max-w-[281px] w-full"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <MdCloudUpload className="text-gray-500 w-10 h-10" />
            <p className="mb-2 text-gray-700">Click to upload</p>
            <p className="text-xs text-[#5E5E5E]">
              SVG, PNG, JPG or JPEG(MAX. 800x400px)
            </p>
          </div>
          <input
            id="companyLogo"
            type="file"
            className="hidden"
            onChange={handleUploadCompanyLogo}
          />
        </label>
      )}
    </div>
  );
};

export default CompanyLogo;
