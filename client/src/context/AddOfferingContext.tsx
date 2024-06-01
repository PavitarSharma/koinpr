/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useCallback, useState } from "react";
import { ADD_OFFERING_STEPS } from "../constants";
import { Image } from "../types";

// Define Context Type
export interface AddOfferingContextType {
  steps: string[];
  setSteps: React.Dispatch<React.SetStateAction<string[]>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  nextStep: () => void;
  prevStep: () => void;
  resetSteps: () => void;
  addStep: (step: string) => void;
  caseStudy: Image | null;
  setCaseStudy: React.Dispatch<React.SetStateAction<Image | null>>;
  companyLogo: Image | null;
  setCompanyLogo: React.Dispatch<React.SetStateAction<Image | null>>;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  offerings: any[];
  setOfferings: React.Dispatch<React.SetStateAction<any[]>>;
  complete: boolean;
  setComplete: React.Dispatch<React.SetStateAction<boolean>>;
  caseStudyFile: File | null;
  setCaseStudyFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export const AddOfferingContext = createContext<AddOfferingContextType | null>(
  null
);

export const AddOfferingContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [formData, setFormData] = useState<any>(null);
  const [offerings, setOfferings] = useState<any[]>([]);
  const [steps, setSteps] = useState<string[]>([""]);
  const [caseStudyFile, setCaseStudyFile] = useState<File | null>(null)
  const [step, setStep] = useState<number>(1);
  const [complete, setComplete] = useState(false);
  const [caseStudy, setCaseStudy] = useState<Image | null>(null);
  const [companyLogo, setCompanyLogo] = useState<Image | null>(null);

  const nextStep = useCallback(() => {
    step === ADD_OFFERING_STEPS.length
      ? setComplete(true)
      : setStep((prevState) => prevState + 1);
  }, [step]);

  const prevStep = useCallback(() => {
    step === 1
      ? setComplete(false)
      : setStep((prevState) => (prevState === 1 ? prevState : prevState - 1));
  }, [step]);

  const resetSteps = useCallback(() => {
    setSteps(ADD_OFFERING_STEPS);
    setStep(1);
  }, []);

  const addStep = useCallback((step: string) => {
    setSteps((prevState) => {
      if (!prevState.includes(step)) {
        return [...prevState, step];
      }
      return prevState;
    });
  }, []);

  const addOfferingValue: AddOfferingContextType = {
    steps,
    setSteps,
    step,
    setStep,
    nextStep,
    prevStep,
    resetSteps,
    addStep,
    caseStudy,
    setCaseStudy,
    companyLogo,
    setCompanyLogo,
    formData,
    setFormData,
    offerings,
    setOfferings,
    complete,
    setComplete,
    caseStudyFile, setCaseStudyFile
  };

  return (
    <AddOfferingContext.Provider value={addOfferingValue}>
      {children}
    </AddOfferingContext.Provider>
  );
};
