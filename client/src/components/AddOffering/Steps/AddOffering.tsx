import Title from "../../Title";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { AddOfferinfStepFormSchema } from "../../../schemas";
import { categories, contentLanguages, regions } from "../../../constants";
import Select from "../../Select";
import Input from "../../Input";
import TextArea from "../../TextArea";
import CompanyLogo from "../CompanyLogo";
import UploadCaseStudy from "../UploadCaseStudy";
import Button from "../../Button";
import { useAddOfferingContext } from "../../../hooks/useGlobalState";
import { useEffect } from "react";

type Schema = z.infer<typeof AddOfferinfStepFormSchema>;

const AddOfferingStep = () => {
  const { nextStep, setFormData, formData } = useAddOfferingContext();
  const { register, handleSubmit, control, setValue } = useForm<Schema>({
    resolver: zodResolver(AddOfferinfStepFormSchema),
    defaultValues: {
      websiteDescription: formData?.websiteDescription || "",
      websiteName: formData?.websiteName || "",
      websiteUrl: formData?.websiteUrl || "",
      officialEmail: formData?.officialEmail || "",
      telegramId: formData?.telegramId || "",
      adultContent: formData?.adultContent || "Yes",
      gambling: formData?.gambling || "Yes",
      crypto: formData?.crypto || "Yes",
      
    },
  });

  useEffect(() => {
    if(formData) {
      setValue("category", formData.category)
      setValue("contentLanguages", formData.contentLanguages);
      setValue("regions", formData.regions);
    }
  }, [setValue, formData])

  const onSubmit = (data: Schema) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prevData: any) => ({
      ...prevData,
      ...data,
    }));
    nextStep();
  };
  return (
    <>
      <Title title="Add Offering" />
      <form className="space-y-6 mt-6">
        <Controller
          control={control}
          name="category"
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <Select
              id="category"
              value={value}
              onChange={onChange}
              label="Select Category"
              options={categories}
              error={errors.category?.message}
            />
          )}
        />

        <div className="grid grid-cols-2 gap-6">
          <Controller
            control={control}
            name="websiteName"
            render={({ field: { value, onChange }, formState: { errors } }) => (
              <Input
                id="websiteName"
                value={value}
                onChange={onChange}
                label="Website Name"
                error={errors.websiteName?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="websiteUrl"
            render={({ field: { value, onChange }, formState: { errors } }) => (
              <Input
                id="websiteUrl"
                value={value}
                onChange={onChange}
                label="Website URL"
                error={errors.websiteUrl?.message}
              />
            )}
          />
        </div>
        <Controller
          control={control}
          name="websiteDescription"
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <TextArea
              id="websiteDescription"
              value={value}
              onChange={onChange}
              label="Website Description"
              placeholder="Type description here..."
              error={errors.websiteDescription?.message}
            />
          )}
        />

        {/* Company Logo */}
        <div className="space-y-2">
          <span className="text-lg font-semibold">Company Logo</span>
          <CompanyLogo />
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          <Controller
            control={control}
            name="officialEmail"
            render={({ field: { value, onChange }, formState: { errors } }) => (
              <Input
                id="officialEmail"
                value={value}
                onChange={onChange}
                label="Official Email"
                error={errors.officialEmail?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="telegramId"
            render={({ field: { value, onChange }, formState: { errors } }) => (
              <Input
                id="te"
                value={value || ""}
                onChange={onChange}
                label="Telegram ID"
                error={errors.telegramId?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="contentLanguages"
            render={({ field: { value, onChange }, formState: { errors } }) => (
              <Select
                id="contentLanguages"
                value={value}
                onChange={onChange}
                label="Select Content Language"
                options={contentLanguages}
                isMulti
                error={errors.contentLanguages?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="regions"
            render={({ field: { value, onChange }, formState: { errors } }) => (
              <Select
                id="regions"
                value={value}
                onChange={onChange}
                label="Select 5 GEO's"
                options={regions}
                isMulti
                error={errors.regions?.message}
              />
            )}
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-sm text-[#474747]/80 font-medium">
              Gambling
            </span>
            <div className="flex items-center gap-6 ">
              {["Yes", "No"].map((val, idx) => (
                <div key={idx} className="flex gap-3">
                  <input
                    type="radio"
                    id={`gambling-${val}`}
                    value={val}
                    {...register("gambling")}
                    className="rounded-lg border border-gray-300 p-2 w-5 h-5 outline-0 text-gray-700"
                  />
                  <label htmlFor={val}>{val}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-sm text-[#474747]/80 font-medium">
              Adult Content
            </span>
            <div className="flex items-center gap-6 ">
              {["Yes", "No"].map((val, idx) => (
                <div key={idx} className="flex gap-3">
                  <input
                    type="radio"
                    id={`adultContent-${val}`}
                    value={val}
                    {...register("adultContent")}
                    className="rounded-lg border border-gray-300 p-2 w-5 h-5 outline-0 text-gray-700"
                  />
                  <label htmlFor={val}>{val}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-sm text-[#474747]/80 font-medium">
              Crypto/Web3.0
            </span>
            <div className="flex items-center gap-6 ">
              {["Yes", "No"].map((val, idx) => (
                <div key={idx} className="flex gap-3">
                  <input
                    type="radio"
                    id={`crypto-${val}`}
                    value={val}
                    {...register("crypto")}
                    className="rounded-lg border border-gray-300 p-2 w-5 h-5 outline-0 text-gray-700"
                  />
                  <label htmlFor={val}>{val}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-lg font-semibold">Upload Case study</span>
            <UploadCaseStudy />
          </div>
        </div>
        <Button label="Next" onClick={handleSubmit(onSubmit)} />
      </form>
    </>
  );
};

export default AddOfferingStep;
