import { useEffect } from "react";
import {
  AddContentOfferingsStep,
  AddOfferingProgress,
  AddOfferingStep,
  BackPage,
  OfferingDraft,
  ReviewStep,
} from "../components";
import { useAddOfferingContext } from "../hooks/useGlobalState";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const AddOffering = () => {
  const { step } = useAddOfferingContext();

  useEffect(() => {
    document.title = "Add Offering";
  }, []);

  const AddOperingSteps: { [key: number]: JSX.Element } = {
    1: <AddOfferingStep />,
    2: <AddContentOfferingsStep />,
    3: <ReviewStep />,
  };

  const Step = AddOperingSteps[step];

  return (
    <>
      <div className="container-box ">
        <BackPage page="Add Offering" />

        <div className="flex lg:flex-row flex-col md:gap-4 gap-8 mt-8">
          {/* Progress Container */}
          <AddOfferingProgress />
          {/* Form Container */}
          <div className="card  flex-1 h-max">{Step}</div>

          {/* Draft Container */}
          <div className="card lg:w-[316px] h-max">
            <div className="flex items-center justify-between">
              <h5 className="font-semibold text-xl">Your offering draft</h5>
              <AiOutlineExclamationCircle
                size={26}
                className="text-light-gray"
              />
            </div>
            <OfferingDraft />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddOffering;
