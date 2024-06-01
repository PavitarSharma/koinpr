/* eslint-disable @typescript-eslint/no-explicit-any */
import Select from "../../Select";
import Title from "../../Title";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { features, offerings as OfferingData } from "../../../constants";
import Input from "../../Input";
import { LuDollarSign } from "react-icons/lu";
import Button from "../../Button";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineExclamationCircle, AiOutlineEdit } from "react-icons/ai";
import { MdOutlinePayments } from "react-icons/md";
import { useAddOfferingContext } from "../../../hooks/useGlobalState";
import { AddContentOfferinfStepFormSchema } from "../../../schemas";
import { formatPrice } from "../../../utils";
import { useState } from "react";
import { useSnackbar } from "notistack";

type Schema = z.infer<typeof AddContentOfferinfStepFormSchema>;



const AddContentOfferingsStep = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { offerings, setOfferings, setFormData, nextStep } =
    useAddOfferingContext();
  const [editOffering, setEditOffering] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<Schema>({
    resolver: zodResolver(AddContentOfferinfStepFormSchema),
    defaultValues: {
      mediaKitPrice: "",
      discountPrice: "",
      features: [],
      offering: { value: "", label: "" },
    },
  });

  const onSubmit = (data: Schema) => {
    setOfferings((prev) => [data, ...prev]);
    setFormData((prevData: any) => ({
      ...prevData,
      ...offerings,
    }));
    reset();
  };

  const goNext = () => {
    if (!offerings.length) {
      enqueueSnackbar("Please add at least one offering", {
        variant: "warning",
      });
      return;
    }
    nextStep();
  };

  const handleEditOffering = (data: any, index: number) => {
    setEditOffering(index);
    setValue("features", data.features);
    setValue("discountPrice", data.discountPrice);
    setValue("offering", data.offering);
    setValue("mediaKitPrice", data.mediaKitPrice);
  };

  const editForm = () => {
    if (editOffering !== null) {
      // Retrieve the offering data being edited
      const editedOffering = offerings[editOffering];

      // Update the values of the offering being edited
      editedOffering.offering = getValues("offering");
      editedOffering.mediaKitPrice = getValues("mediaKitPrice");
      editedOffering.discountPrice = getValues("discountPrice");
      editedOffering.features = getValues("features");

      // Update state with the modified offering
      setOfferings((prevOfferings) => [
        ...prevOfferings.slice(0, editOffering),
        editedOffering,
        ...prevOfferings.slice(editOffering + 1),
      ]);

      // Reset the editOffering state and form errors
      setEditOffering(null);
      reset();
    }
  };

  return (
    <>
      <Title title="Add Content Offerings" />

      <div className="mt-6">
        {offerings.map((val, index) => (
          <div
            key={index}
            className="w-full border p-4 rounded-lg border-gray-300"
          >
            <div className="flex items-center justify-between w-full">
              <h3 className="text-[#464646] text-xl font-semibold">
                {val.offering.value}
              </h3>
              <button
                type="button"
                onClick={() => handleEditOffering(val, index)}
                className="flex items-center gap-2 justify-center text-[#3772FF]"
              >
                <AiOutlineEdit size={22} />
                <span className="font-medium">Edit</span>
              </button>
            </div>

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

      <form className="space-y-6 mt-6">
        {offerings.length > 0 && (
          <div className="flex items-center justify-between">
            <h5 className="text-lg font-semibold">New Offering</h5>
            {editOffering && (
              <button
                type="button"
                onClick={editForm}
                className="bg-[#3772FF] text-white p-2 rounded"
              >
                Save
              </button>
            )}
          </div>
        )}
        <Controller
          control={control}
          name="offering"
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <Select
              id="offering"
              value={value}
              onChange={onChange}
              label="Select Offering"
              options={OfferingData}
              error={
                errors.offering?.value?.message ||
                errors.offering?.label?.message
              }
            />
          )}
        />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          <Controller
            control={control}
            name="mediaKitPrice"
            render={({ field: { value, onChange }, formState: { errors } }) => (
              <Input
                id="mediaKitPrice"
                value={value}
                onChange={onChange}
                label="Media Kit Price"
                error={errors.mediaKitPrice?.message}
                startIcon={LuDollarSign}
              />
            )}
          />
          <Controller
            control={control}
            name="discountPrice"
            render={({ field: { value, onChange }, formState: { errors } }) => (
              <Input
                id="discountPrice"
                value={value || ""}
                onChange={onChange}
                label="Discount Price"
                error={errors.discountPrice?.message}
                startIcon={LuDollarSign}
              />
            )}
          />
        </div>

        <div className="space-y-2">
          <span className="text-sm text-[#474747]/80 font-medium">
            Features{" "}
            {errors.features?.message && (
              <small className="text-xs text-red-400 ml-2">
                ({errors.features?.message})
              </small>
            )}
          </span>
          <div className="space-y-4">
            {features.map((val, idx) => (
              <div key={idx} className="flex gap-3">
                <input
                  type="checkbox"
                  id={`gambling-${val}`}
                  value={val}
                  {...register("features")}
                  className="rounded-lg border border-gray-300 p-2 w-5 h-5 outline-0 text-gray-700"
                />
                <label htmlFor={val}>{val}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="text-[#3772FF] space-x-2 text-xl flex items-center justify-center"
          >
            <IoMdAdd />
            <span className="font-medium">Add Example</span>
          </button>

          <div className="flex items-center gap-2 justify-center">
            <AiOutlineExclamationCircle size={24} />
            <span className="text-sm text-[#474747]">
              why this is important?
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between w-full !mt-10">
          <Button label="Next" onClick={goNext} />
          <Button
            label="Add new offerings"
            outline
            icon={IoMdAdd}
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </>
  );
};

export default AddContentOfferingsStep;
