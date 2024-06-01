// import React from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Controller, useFieldArray, useForm } from "react-hook-form";
// import * as z from "zod";
// import { AddContentOfferingStepFormSchema } from "../../../schemas";
// import Select from "../../Select";
// import Title from "../../Title";
// import Input from "../../Input";
// import Button from "../../Button";
// import { LuDollarSign } from "react-icons/lu";
// import { IoMdAdd } from "react-icons/io";
// import { AiOutlineExclamationCircle, AiOutlineEdit } from "react-icons/ai";
// import { MdOutlinePayments } from "react-icons/md";
// import { useAddOfferingContext } from "../../../hooks/useGlobalState";
// import { features, offerings as offeringsData } from "../../../constants";
// import { formatPrice } from "../../../utils";

// type Schema = z.infer<typeof AddContentOfferingStepFormSchema>;

// const AddContentOfferingsStep = () => {
//   const { offerings, setOfferings, setFormData } = useAddOfferingContext();
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//     watch,
//   } = useForm<Schema>({
//     resolver: zodResolver(AddContentOfferingStepFormSchema),
//     defaultValues: {
//       offerings: [
//         {
//           offering: { value: "", label: "" },
//           mediaKitPrice: "",
//           discountPrice: "",
//           features: [],
//         },
//       ],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "offerings",
//   });

//   const onSubmit = (data: Schema) => {
//     console.log(data);
//   };

//   const contentOfferings = watch("offerings");

//   return (
//     <>
//       <Title title="Add Content Offerings" />

//       <div className="mt-6">
//         {contentOfferings.map((value, index) => (
//           <div
//             key={index}
//             className="w-full border p-4 rounded-lg border-gray-300"
//           >
//             <div className="flex items-center justify-between w-full">
//               <h3 className="text-[#464646] text-xl font-semibold">
//                 {value.offering.value}
//               </h3>
//               <button className="flex items-center gap-2 justify-center text-[#3772FF]">
//                 <AiOutlineEdit size={22} />
//                 <span className="font-medium">Edit</span>
//               </button>
//             </div>

//             <div className="flex items-center gap-2 my-4">
//               <div className="flex items-center justify-center gap-2 bg-[#EDEDED] p-2 py-3 rounded">
//                 <MdOutlinePayments size={20} />
//                 <span className="text-sm text-[#3E3E3E] font-medium">
//                   Media Kit Price: {formatPrice(Number(value.mediaKitPrice))}
//                 </span>
//               </div>
//               <div className="flex items-center justify-center gap-2 bg-[#EDEDED] p-2 py-3 rounded">
//                 <MdOutlinePayments size={20} />
//                 <span className="text-sm text-[#3E3E3E] font-medium">
//                   Discounted Price: {formatPrice(Number(value.discountPrice))}
//                 </span>
//               </div>
//             </div>

//             <div className="flex flex-col gap-2 bg-[#EDEDED] p-2 py-3 rounded">
//               <span className="text-xs font-medium">Features</span>
//               <div className="flex gap-2 flex-wrap">
//                 {value.features.map((obj, index) => (
//                   <div className="bg-white rounded p-2 text-sm" key={index}>
//                     {obj}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <form className="space-y-6 mt-6">
//         {fields.map((field, index) => (
//           <div
//             key={field.id}
//             className="w-full border p-4 rounded-lg border-gray-300 mb-4 space-y-6"
//           >
//            {
//             index !== 0 &&  <div className="flex items-center justify-between w-full mb-2">
//             <h3 className="text-[#464646] text-xl font-semibold">
//               New Offering
//             </h3>
//             <button
//               type="button"
//               onClick={() => remove(index)}
//               className="flex items-center gap-2 justify-center text-[#FF3772]"
//             >
//               <AiOutlineEdit size={22} />
//               <span className="font-medium">Remove</span>
//             </button>
//           </div>
//            }

//             <Controller
//               control={control}
//               name={`offerings.${index}.offering`}
//               render={({ field: { value, onChange } }) => (
//                 <Select
//                   id={`offerings.${index}.offering`}
//                   value={value}
//                   onChange={onChange}
//                   label="Select Offering"
//                   options={offeringsData}
//                   error={
//                     errors.offerings?.[index]?.offering?.value?.message ||
//                     errors.offerings?.[index]?.offering?.label?.message
//                   }
//                 />
//               )}
//             />

//             <div className="grid grid-cols-2 gap-6">
//               <Controller
//                 control={control}
//                 name={`offerings.${index}.mediaKitPrice`}
//                 render={({ field: { value, onChange } }) => (
//                   <Input
//                     id={`offerings.${index}.mediaKitPrice`}
//                     value={value}
//                     onChange={onChange}
//                     label="Media Kit Price"
//                     error={errors.offerings?.[index]?.mediaKitPrice?.message}
//                     startIcon={LuDollarSign}
//                   />
//                 )}
//               />

//               <Controller
//                 control={control}
//                 name={`offerings.${index}.discountPrice`}
//                 render={({ field: { value, onChange } }) => (
//                   <Input
//                     id={`offerings.${index}.discountPrice`}
//                     value={value || ""}
//                     onChange={onChange}
//                     label="Discount Price"
//                     error={errors.offerings?.[index]?.discountPrice?.message}
//                     startIcon={LuDollarSign}
//                   />
//                 )}
//               />
//             </div>

//             <div className="space-y-2">
//               <span className="text-sm text-[#474747] font-medium">
//                 Features{" "}
//                 {errors.offerings?.[index]?.features?.message && (
//                   <small className="text-xs text-red-400 ml-2">
//                     ({errors.offerings?.[index]?.features?.message})
//                   </small>
//                 )}
//               </span>
//               <div className="space-y-4">
//                 {features.map((val, idx) => (
//                   <div key={idx} className="flex gap-3">
//                     <input
//                       type="checkbox"
//                       id={`offerings.${index}.features.${val}`}
//                       value={val}
//                       {...register(`offerings.${index}.features`)}
//                       className="rounded-lg border border-gray-300 p-2 w-5 h-5 outline-0 text-gray-700"
//                     />
//                     <label htmlFor={`offerings.${index}.features.${val}`}>
//                       {val}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}

//         <div className="flex items-center gap-6">
//           <button
//             type="button"
//             onClick={() =>
//               append({
//                 offering: { value: "", label: "" },
//                 mediaKitPrice: "",
//                 discountPrice: "",
//                 features: [],
//               })
//             }
//             className="text-[#3772FF] space-x-2 text-xl flex items-center justify-center"
//           >
//             <IoMdAdd />
//             <span className="font-medium">Add Offering</span>
//           </button>

//           <div className="flex items-center gap-2 justify-center">
//             <AiOutlineExclamationCircle size={24} />
//             <span className="text-sm text-[#474747]">
//               Why this is important?
//             </span>
//           </div>
//         </div>

//         <div className="flex items-center justify-between w-full !mt-10">
//           <Button onClick={handleSubmit(onSubmit)} label="Next" />
//           <Button
//             label="Add new offerings"
//             outline
//             icon={IoMdAdd}
//             onClick={() =>
//               append({
//                 offering: { value: "", label: "" },
//                 mediaKitPrice: "",
//                 discountPrice: "",
//                 features: [],
//               })
//             }
//           />
//         </div>
//       </form>
//     </>
//   );
// };

// export default AddContentOfferingsStep;
