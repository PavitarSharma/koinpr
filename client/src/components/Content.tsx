import React from "react";
import { IContent, IOffering } from "../types";
import { RiShareBoxFill } from "react-icons/ri";
import { LuEye, LuGlobe, LuBookmark } from "react-icons/lu";
import { MdAddBox } from "react-icons/md";
import { formatPrice } from "../utils";
import { useNavigate } from "react-router-dom";

interface ContentProps {
  data: IContent;
}

const Content: React.FC<ContentProps> = ({ data }) => {
  const navigate = useNavigate();
  if (!data) return null;

  const {
    companyLogo,
    regions,
    offerings,
    websiteName,
    websiteUrl,
    visited,
    _id,
  } = data;

  return (
    <>
      {offerings?.map((offering: IOffering, idx: number) => {
        return (
          <div
            key={idx}
            className="w-full border border-gray-300 rounded-lg  bg-white shadow"
          >
            <div className="p-4">
              <div className="flex justify-between items-start">
                <img
                  onClick={() => navigate(`/content/${_id}/product/${offering?._id}`)}
                  src={companyLogo?.url}
                  alt={`${websiteName}`}
                  className="w-11 h-11 rounded-full object-cover cursor-pointer"
                />

                <a target="_blank" href={websiteUrl} className="flex items-center gap-1">
                  <span className="text-xs text-[#5E5E5E]">{websiteUrl}</span>
                  <RiShareBoxFill size={16} className="text-[#3772FF]" />
                </a>
              </div>
              <h3 className="font-medium text-black text-lg my-2">
                {websiteName}
              </h3>

              <div className="flex gap-4">
                <div className="flex items-center gap-1 bg-[#EFF4FF] px-1 py-0.5 rounded">
                  <LuEye size={16} className="text-[#434343]" />
                  <span className="text-xs text-[#434343]">{visited}</span>
                </div>

                <div className="flex items-center gap-2 bg-[#EFF4FF] px-1 py-0.5 rounded">
                  <LuGlobe size={16} className="text-[#434343]" />
                  <div className="flex gap-1 flex-1 flex-wrap">
                    {regions.map((region: string, ridx: number) => {
                      return (
                        <span key={ridx} className="text-xs text-[#434343]/80">
                          {`${region} ${
                            ridx !== regions.length - 1 ? "," : ""
                          }`}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 my-2">
                <div className="flex items-center gap-1 bg-[#EFF4FF] px-1 py-0.5 rounded">
                  <span className="text-[#434343] text-xs">KPR</span>
                  <span className="text-xs text-[#434343]">7.1/10</span>
                </div>

                <div className="flex items-center gap-1 bg-[#EFF4FF] px-1 py-0.5 rounded">
                  <span className="text-xs text-[#434343]">
                    {offering?.offering}
                  </span>
                </div>
              </div>
            </div>
            <div className="divider"></div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[13px] text-[#999999]">
                  Starting from
                </span>
                <span className="font-semibold text-black">
                  {formatPrice(Number(offering.mediaKitPrice), "INR")}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button>
                  <LuBookmark size={24} className="text-light-gray" />
                </button>
                <button>
                  <MdAddBox size={24} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Content;
