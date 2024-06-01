/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiOutlineEdit } from "react-icons/ai";
import { useAddOfferingContext } from "../../../hooks/useGlobalState";
import { FaRegFileLines } from "react-icons/fa6";
import { MdOutlinePayments } from "react-icons/md";
import { formatPrice } from "../../../utils";
import { useSnackbar } from "notistack";
import Button from "../../Button";
import Title from "../../Title";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance, uploadCaseStudy } from "../../../config";

const ReviewStep = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const {
    formData,
    offerings,
    companyLogo,
    setStep,
    setCaseStudy,
    caseStudy,
    caseStudyFile,
    setCaseStudyFile,
    setFormData,
    setCompanyLogo,
    setOfferings,
  } = useAddOfferingContext();
  const languages = formData.contentLanguages?.map((lang: any) => lang.value);
  const regions = formData.regions?.map((reg: any) => reg.value);

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
      setCaseStudyFile(file);
    } catch (error: any) {
      enqueueSnackbar(error.response?.data?.message, { variant: "error" });
    }
  };

  const mutation = useMutation({
    mutationFn: async (newContent) => {
      return await axiosInstance.post("/contents", newContent);
    },
    onSuccess: () => {
      enqueueSnackbar("Offering created successfully", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["contents"] });
    },
    onError: (error: any) => {
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    },
  });

  const onSubmit = () => {
    const newContent = {
      ...formData,
      category: formData.category.value,
      contentLanguages: languages,
      regions,
      caseStudy,
      companyLogo,
      offerings: offerings.map((offering) => ({
        mediaKitPrice: Number(offering.mediaKitPrice),
        discountPrice: Number(offering.discountPrice) || 0,
        features: offering.features.map((feature: any) => feature.value),
        offering: offering.offering.value,
      })),
    };

    mutation.mutate(newContent);
    setStep(1);
    setFormData(null);
    setCompanyLogo(null);
    setCaseStudy(null);
    setOfferings([]);
  };

  return (
    <>
      <Title title="Review" />
      <div className="space-y-6 mt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Offering</h3>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="flex items-center gap-2 justify-center text-[#3772FF]"
          >
            <AiOutlineEdit size={22} />
            <span className="font-medium">Edit</span>
          </button>
        </div>

        <ReviewDetail title="Category" subTitle={formData.category.value} />
        <ReviewDetail title="Website Name" subTitle={formData.websiteName} />
        <ReviewDetail title="Website URL" subTitle={formData.websiteUrl} />
        <ReviewDetail
          title="Website Description"
          subTitle={formData.websiteDescription}
        />
        <ReviewDetail title="Company Logo" isImg subTitle={companyLogo?.url} />
        <ReviewDetail
          title="Official Email"
          subTitle={formData.officialEmail}
        />
        <ReviewDetail
          title="Telegram ID"
          subTitle={`@${formData.telegramId}`}
        />
        <div className="space-y-2">
          <p className="text-xl text-[#5E5E5E]">Languages</p>
          <ul className="flex items-center gap-1">
            {languages.map((obj: string, index: number) => (
              <li key={index}>{obj}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-2">
          <p className="text-xl text-[#5E5E5E]">Regions</p>
          <ul className="flex items-center gap-1">
            {regions?.map((obj: string, index: number) => (
              <li key={index}>{obj}</li>
            ))}
          </ul>
        </div>

        <ReviewDetail title="Gambling" subTitle={formData.gambling} />
        <ReviewDetail title="Adult Content" subTitle={formData.adultContent} />
        <ReviewDetail title="Crypto/Web3.o" subTitle={formData.crypto} />

        <div className="divider my-6"></div>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Case Study</h3>
          <label
            htmlFor="caseStudy"
            className="flex items-center cursor-pointer gap-2 justify-center text-[#3772FF]"
          >
            <AiOutlineEdit size={22} />
            <span className="font-medium">Edit</span>
            <input
              id="caseStudy"
              type="file"
              className="hidden"
              onChange={handleUploadCaseStudy}
            />
          </label>
        </div>

        <div>
          <p className="text-xl">Uploaded Doc</p>

          <div className="flex items-center h-12  w-max mt-3 border border-gray-200">
            <div className="h-full flex items-center justify-center w-9 border-0 bg-[#d9d9d9] rounded-l">
              <FaRegFileLines size={20} className="" />
            </div>
            <span className="flex-1 text-center px-4">
              {caseStudyFile?.name}
            </span>
            <button className="px-6 rounded-r flex items-center justify-center border-l border-gray-200">
              View
            </button>
          </div>
        </div>

        <div className="divider my-6"></div>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Content Offerings</h3>
          <button
            type="button"
            onClick={() => setStep(2)}
            className="flex items-center gap-2 justify-center text-[#3772FF]"
          >
            <AiOutlineEdit size={22} />
            <span className="font-medium">Edit</span>
          </button>
        </div>

        <div className="mt-6">
          {offerings.map((val, index) => (
            <div
              key={index}
              className="w-full border p-4 rounded-lg border-gray-300"
            >
              <h3 className="text-[#464646] text-xl font-semibold">
                {val.offering.value}
              </h3>

              <div className="flex items-center gap-2 my-4">
                <div className="flex items-center justify-center gap-2 bg-[#EDEDED] p-2 py-3 rounded">
                  <MdOutlinePayments size={20} />
                  <span className="text-sm text-[#3E3E3E] font-medium">
                    Media Kit Price: {formatPrice(Number(val.mediaKitPrice))}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2 bg-[#EDEDED] p-2 py-3 rounded">
                  <MdOutlinePayments size={20} />
                  <span className="text-sm text-[#3E3E3E] font-medium">
                    Discounted Price:{formatPrice(Number(val.discountPrice))}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 bg-[#EDEDED] p-2 py-3 rounded">
                <span className="text-xs font-medium">Features</span>
                <div className="flex gap-2 flex-wrap">
                  {val.features.map((obj: string, idx: number) => (
                    <div className="bg-white rounded p-2 text-sm" key={idx}>
                      {obj}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button label="Done" onClick={onSubmit} />
      </div>
    </>
  );
};

export default ReviewStep;

const ReviewDetail = ({
  title,
  subTitle,
  isImg,
}: {
  title: string;
  subTitle: any;
  isImg?: boolean;
}) => {
  return (
    <div className="space-y-2">
      <p className="text-xl text-[#5E5E5E]">{title}</p>
      {isImg ? (
        <img
          src={subTitle}
          alt="image"
          className="w-24 h-[78px] rounded border border-gray-300 object-cover"
        />
      ) : (
        <p className="text-xl text-black">{subTitle}</p>
      )}
    </div>
  );
};
