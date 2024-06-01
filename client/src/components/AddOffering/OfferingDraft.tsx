import { useCallback, useState } from "react";
import { useAddOfferingContext } from "../../hooks/useGlobalState";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

const OfferingDraft = () => {
  const { offerings } = useAddOfferingContext();
  const [show, setShow] = useState(true);

  const toggleShow = useCallback(() => setShow((prev) => !prev), []);

  return (
    <div className="border rounded w-full bg-[#f1f1f1] border-[#DBDBDB] p-3">
      <div
        onClick={toggleShow}
        className="flex items-center justify-between cursor-pointer py-2 border-l-2 border-black pl-2"
      >
        <p className="text-xl text-[#3C3C3C]">Content Distribution</p>
        <IoMdArrowDropdown />
      </div>
      {show && (
        <div className="bg-[#F9F9F9]  w-full ">
          {offerings.map((offering, index) => (
            <div
              key={index}
              className="flex h-11 px-4 items-center gap-2 border-b border-[#DBDBDB] last:border-b-0 rounded"
            >
              <FaCheckCircle />
              <span>{offering.offering.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OfferingDraft;
