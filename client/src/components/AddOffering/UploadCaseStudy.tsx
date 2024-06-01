/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdCloudUpload } from "react-icons/md";
import { useAddOfferingContext } from "../../hooks/useGlobalState";
import { useSnackbar } from "notistack";
import { uploadCaseStudy } from "../../config";

const UploadCaseStudy = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setCaseStudy, setCaseStudyFile } = useAddOfferingContext();

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

    const supportedTypes = [
      "image/png",
      "image/jpeg",
      "application/pdf",
      "application/msword",
    ];
    if (!supportedTypes.includes(file.type)) {
      enqueueSnackbar("Supported file types: png, jpeg, pdf, doc", {
        variant: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("caseStudy", file);

    try {
      const data = await uploadCaseStudy(formData);
      setCaseStudy(data);
      setCaseStudyFile(file)
    } catch (error: any) {
      enqueueSnackbar(error.response?.data?.message, { variant: "error" });
    }
  };

  return (
    <div className="">
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
    </div>
  );
};

export default UploadCaseStudy;
