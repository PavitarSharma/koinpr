/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { BackPage, SuccessMessage } from "../components";
import useContent from "../hooks/useContent";
import { IContent, IOffering } from "../types";
import { RiShareBoxFill, RiShoppingCart2Line } from "react-icons/ri";
import { GoShareAndroid } from "react-icons/go";
import { BsBookmark } from "react-icons/bs";
import { formatPrice } from "../utils";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
  FaTelegramPlane,
  FaTiktok,
} from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { axiosInstance } from "../config";
import { useState } from "react";

const ContentDetail = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { contentId, offeringId } = useParams();
  const { data } = useContent(contentId as string);
  const [message, setMessage] = useState("")

  const addToCartMutation = useMutation({
    mutationKey: ["carts", { action: "addToCart" }],
    mutationFn: async (values: any) => {
      const response = await axiosInstance.post("/carts/add", values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("todayqToken")}`,
        },
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      // enqueueSnackbar("Item added to your cart", { variant: "success" });
      setMessage("Item added to your cart")
    },
    onError: (error: any) => {
      enqueueSnackbar(error?.response?.data.message, { variant: "error" });
    },
  });

  if (!data) return null;

  const {
    companyLogo,
    websiteName,
    websiteUrl,
    websiteDescription,
    visited,
    regions,
    contentLanguages,
    offerings,
  } = data as IContent;

  const offering = offerings?.find((obj: IOffering) => obj._id === offeringId);
  const { mediaKitPrice } = offering as IOffering;

  const handleAddToCart = async () => {
    const data = {
      contentId,
      offeringId,
    };

    addToCartMutation.mutate(data);
  };

  return (
    <div className="container-box">
      { message && <SuccessMessage message={message} setMessage={setMessage} />}
      <BackPage page="Product Details" />

      <div className="card shadow-lg my-6">
        <div className="flex sm:items-center justify-between sm:flex-row flex-col gap-6">
          <div className="flex items-center gap-4">
            <img
              src={companyLogo.url}
              alt={websiteName}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-2xl text-black">{websiteName}</h3>
              <a
                target="_blank"
                href={websiteUrl}
                className="flex items-center gap-1"
              >
                <span className="text-xs text-[#5E5E5E]">{websiteUrl}</span>
                <RiShareBoxFill size={16} className="text-[#3772FF]" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-[#3772FF] rounded py-3 font-medium px-5 border border-gray-300">
              See Case Study
            </button>
            <button className="p-3 border border-gray-300 rounded">
              <GoShareAndroid size={24} className="text-light-gray" />
            </button>
            <button className="p-3 border border-gray-300 rounded">
              <BsBookmark size={24} className="text-light-gray" />
            </button>
          </div>
        </div>

        <div className="my-6 flex items-center gap-4">
          <div className="bg-[#F0EBFD] border border-[#DBDBDB] flex flex-col items-center justify-center gap-2 w-[138px] h-[70px] rounded-lg p-4">
            <span className="text-[#5E5E5E] text-sm font-medium">
              Visitiors
            </span>
            <span className="text-[#434343] font-semibold text-xl">
              {visited}
            </span>
          </div>
          <div className="bg-[#EAF6FD] border border-[#DBDBDB] flex flex-col items-center justify-center gap-2 w-[138px] h-[70px] rounded-lg p-4">
            <span className="text-[#5E5E5E] text-sm font-medium">Metric 2</span>
            <span className="text-[#434343] font-semibold text-xl">4.9 M</span>
          </div>
          <div className="bg-[#EAF7F0] border border-[#DBDBDB] flex flex-col items-center justify-center gap-2 w-[138px] h-[70px] rounded-lg p-4">
            <span className="text-[#5E5E5E] text-sm font-medium">
              KPR Metric
            </span>
            <span className="text-[#434343] font-semibold text-xl">7.1/10</span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={addToCartMutation.isPending}
          className="my-6 flex items-center gap-2 bg-[#0A0A0A] py-3 px-4 rounded cursor-pointer text-white"
        >
          <RiShoppingCart2Line size={22} />
          <span className="font-medium">Add to cart</span>
          <span className="font-semibold">
            {formatPrice(Number(mediaKitPrice), "INR")}
          </span>
        </button>

        <div className="divider my-6"></div>

        <div className="my-6">
          <h3 className="text-xl font-semibold">{websiteName}</h3>

          <p className="my-4">{websiteDescription}</p>
        </div>

        <div className="my-6 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          <div>
            <h3 className="text-xl font-semibold">Social Media</h3>
            <div className="flex flex-wrap gap-4 mt-3">
              <FaFacebookF className="text-[#434343] w-5 h-5" />
              <FaTwitter className="text-[#434343] w-5 h-5" />
              <FaInstagram className="text-[#434343] w-5 h-5" />
              <FaLinkedin className="text-[#434343] w-5 h-5" />
              <FaYoutube className="text-[#434343] w-5 h-5" />
              <FaTiktok className="text-[#434343] w-5 h-5" />
              <FaWhatsapp className="text-[#434343] w-5 h-5" />
              <FaTelegramPlane className="text-[#434343] w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Regions</h3>
            <div className="flex flex-wrap  gap-1 mt-3">
              {regions?.map((region: string, index) => (
                <span className="" key={region}>
                  {region} {index !== regions?.length - 1 ? "," : ""}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Languages</h3>
            <div className="flex flex-wrap  gap-1 mt-3">
              {contentLanguages?.map((language: string, index) => (
                <span className="" key={language}>
                  {language} {index !== contentLanguages?.length - 1 ? "," : ""}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetail;
