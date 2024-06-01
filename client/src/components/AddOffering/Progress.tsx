import { FaCheck } from "react-icons/fa";
import { ADD_OFFERING_STEPS } from "../../constants";
import { useAddOfferingContext } from "../../hooks/useGlobalState";
import Title from "../Title";

const Progress = () => {
  const {  step, complete } = useAddOfferingContext();
  return (
    <div className="card lg:w-[246px] h-max">
      <Title title="Progress" />
      <div className="divider my-4"></div>
      <div className="space-y-4">
        {ADD_OFFERING_STEPS.map((stp, index) => {
          //   const isActive = index + 1 <= step;
          const isCurrentStep = index + 1 === step;
          const isCompleted = index + 1 < step || complete

          return (
            <div key={index} className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-white border ${
                  isCompleted
                    ? "bg-[#20B038] "
                    : isCurrentStep
                    ? "border-[#20B038] border-2"
                    : "border-[#5E5E5E]"
                }`}
              >
                {isCompleted ? <FaCheck /> : null}
              </div>
              <p
                className={`${
                  isCompleted || isCurrentStep
                    ? "text-light-gray"
                    : "text-[#5E5E5E]"
                }`}
              >
                {stp}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Progress;
