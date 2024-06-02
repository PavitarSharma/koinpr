import { BackPage, Input, Select, UploadDocModal } from "../components";
import { calculateCartTotals, formatPrice } from "../utils";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { FaExclamationCircle } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Country, State } from "country-state-city";
import { BillingFormSchema } from "../schemas";
import React, { useEffect, useState } from "react";
import { useUploadDocModal } from "../store";
import { ICart, Image } from "../types";
import useCarts from "../hooks/useCarts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useGlobalState";

type Schema = z.infer<typeof BillingFormSchema>;
const Cart = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { data: cartsData } = useCarts();
  const uploadDocStore = useUploadDocModal();
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [cartData, setCartData] = useState<ICart | null>(null);
  const [uploadDoc, setUploadDoc] = useState<Image | null>(null);
  const [getWritten, setGetWritten] = useState<{ [key: string]: boolean }>({});
  const { control, watch, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(BillingFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      telegramId: "",
      country: { value: "", label: "", isoCode: "" },
      state: { value: "", label: "" },
    },
  });

  useEffect(() => {
    document.title = "Cart";
  }, []);

  const countries = Country.getAllCountries().map((country) => ({
    value: country.name,
    label: country.name,
    isoCode: country.isoCode,
  }));

  const country = watch("country");

  const states = State.getStatesOfCountry(country.isoCode).map((state) => ({
    value: state.name,
    label: state.name,
  }));

  const handleUploadDoc = (cartData: ICart) => {
    setCartData(cartData);
    uploadDocStore.onOpen();
  };

  const updateCartMutation = useMutation({
    mutationKey: ["carts", { action: "uploadDoc" }],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (data: any) => {
      const response = await axiosInstance.patch(
        `/carts/${data.cartId}`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("todayqToken")}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      enqueueSnackbar("Updated successfully", {
        variant: "success",
      });
      uploadDocStore.onClose();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      enqueueSnackbar(error?.response?.data.message, { variant: "error" });
    },
  });

  const handleGetWritten = (
    e: React.ChangeEvent<HTMLInputElement>,
    cartId: string
  ) => {
    const checked = e.target.checked;
    setGetWritten((prevState) => ({
      ...prevState,
      [cartId]: checked,
    }));

    const value = {
      cartId: cartId,
      getWritten: checked,
    };

    updateCartMutation.mutate(value);
  };

  const { total, subTotal, totalPrice } = calculateCartTotals(cartsData);

  const createOrderMutation = useMutation({
    mutationKey: ["users", { action: "createOrder" }],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (data: any) => {
      const response = await axiosInstance.post(`/orders/create`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("todayqToken")}`,
        },
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      enqueueSnackbar("Order created successfully", {
        variant: "success",
      });
      navigate("/success");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      enqueueSnackbar(error?.response?.data.message, { variant: "error" });
    },
  });

  const onSubmit = (data: Schema) => {
    if (!user) {
      enqueueSnackbar("Please login to checkout", { variant: "error" });
      return;
    }
    const cartIds = cartsData.map((cart: ICart) => cart._id);
    const billingData = {
      totalPrice,
      billingInformation: {
        ...data,
        country: data.country.value,
        state: data.state.value,
      },
      paymentMethod,
      cart: cartIds,
    };

    createOrderMutation.mutate(billingData);
  };

  return (
    <>
      <div className="w-full shadow-lg container-box">
        <BackPage page="My Cart" />
      </div>

      <div className="container-box my-6 flex lg:flex-row flex-col gap-4">
        {/* Cart Items */}
        <div className="card lg:w-1/2 w-full">
          {/* CartItems */}
          <div className="w-full">
            <h5 className="font-semibold">Items</h5>

            <div className="my-4 flex flex-col gap-6">
              {cartsData?.length > 0 ? (
                cartsData &&
                cartsData?.map((obj: ICart, index: number) => {
                  const {
                    content: { companyLogo, websiteName, websiteDescription },
                    contentOffering: { mediaKitPrice },
                  } = obj;
                  return (
                    <div
                      key={index}
                      className="relative flex flex-1 md:flex-row flex-col justify-between gap-6"
                    >
                      <div className="flex gap-4">
                        <img
                          src={companyLogo.url}
                          alt={companyLogo.id}
                          className="w-10 h-10 object-cover rounded-full"
                        />
                        <div className="flex-1 flex flex-col">
                          <h3 className="font-semibold">{websiteName}</h3>
                          <p className="text-[#5E5E5E]">
                            {websiteDescription.length > 70
                              ? websiteDescription.substring(0, 100) + "..."
                              : websiteDescription}
                          </p>
                          <p className="text-xl font-semibold">
                            {formatPrice(Number(mediaKitPrice))}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-6 md:items-start items-center">
                        <div className="flex gap-2 items-center md:flex-col flex-row">
                          <button
                            onClick={() => handleUploadDoc(obj)}
                            className="bg-[#E4E4E4]/60 px-6 py-2 rounded-lg flex items-center justify-center gap-2 text-sm"
                          >
                            <AiOutlineCloudUpload size={20} />
                            <span className="text-sm flex-1">Upload Doc</span>
                          </button>
                          <span>or</span>
                          <div className="bg-[#E4E4E4]/60 px-6 py-2 rounded-lg flex items-center justify-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={
                                (getWritten[obj._id] !== undefined &&
                                  getWritten[obj._id]) ||
                                obj.getWritten ||
                                false
                              }
                              onChange={(e) => handleGetWritten(e, obj?._id)}
                              className="w-4 h-4 bg-transparent"
                            />
                            <span className="text-sm flex-1">
                              Get it written
                            </span>
                          </div>
                        </div>
                        <button>
                          <IoMdClose size={20} />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col gap-4">
                  <p className="text-xl font-medium">No Items in Cart</p>
                  <Link
                    to="/"
                    className="bg-black text-white py-3 px-6 rounded w-max"
                  >
                    Add Item To Cart
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Billing Details */}
        <div className="card lg:w-1/2 w-full">
          <div className="w-full bg-[#FFF3C7] p-4 rounded flex items-start gap-2 border-l-2 border-[#EEC800]">
            <span className="font-semibold">Note:</span>
            <p className="text-[#5E5E5E]">
              Please verify that the information you introduced is correct. Once
              you submit your order and the payment is confirmed, one of our
              team member will contact you within 3 business days.
            </p>
          </div>

          <div className="my-6">
            <p className="font-semibold flex items-center gap-2">
              Enter Billing Details{" "}
              <FaExclamationCircle className="text-[#808080]" size={16} />
            </p>

            <form className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <Controller
                control={control}
                name="firstName"
                render={({
                  field: { value, onChange },
                  formState: { errors },
                }) => (
                  <Input
                    id="firstName"
                    value={value}
                    onChange={onChange}
                    label="First Name*"
                    placeholder="Enter First Name"
                    error={errors.firstName?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="lastName"
                render={({
                  field: { value, onChange },
                  formState: { errors },
                }) => (
                  <Input
                    id="lastName"
                    value={value}
                    onChange={onChange}
                    label="Last Name*"
                    placeholder="Enter Last Name"
                    error={errors.lastName?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({
                  field: { value, onChange },
                  formState: { errors },
                }) => (
                  <Input
                    id="email"
                    value={value}
                    onChange={onChange}
                    label="Email ID*"
                    placeholder="Enter Email ID"
                    error={errors.email?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="telegramId"
                render={({
                  field: { value, onChange },
                  formState: { errors },
                }) => (
                  <Input
                    id="telegramId"
                    value={value}
                    onChange={onChange}
                    label="Telegram ID*"
                    placeholder="Enter Telegram ID"
                    error={errors.telegramId?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="country"
                render={({
                  field: { value, onChange },
                  formState: { errors },
                }) => (
                  <Select
                    id="country"
                    value={value}
                    onChange={onChange}
                    label="Country*"
                    options={countries}
                    placeholder="Country"
                    error={errors.country?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="state"
                render={({
                  field: { value, onChange },
                  formState: { errors },
                }) => (
                  <Select
                    id="state"
                    value={value}
                    onChange={onChange}
                    label="State*"
                    options={states}
                    placeholder="State"
                    error={errors.state?.message}
                  />
                )}
              />
            </form>
          </div>

          <div className="my-10 grid sm:grid-cols-2 grid-cols-1 sm:gap-0 gap-6">
            <div>
              <p className="font-semibold flex items-center gap-2">
                Check Out
                <FaExclamationCircle className="text-[#808080]" size={16} />
              </p>

              <p className="my-6">Select Payment Method</p>

              {/* Stripe */}
              <div className="flex items-center gap-4">
                <div
                  onClick={() => setPaymentMethod("stripe")}
                  className={`w-5 h-5 cursor-pointer rounded-full border border-black flex items-center justify-center`}
                >
                  {paymentMethod === "stripe" && (
                    <div className="bg-[#3772FF] w-3 h-3 rounded-full"></div>
                  )}
                </div>
                <span className="font-medium">Pay via</span>
                <img src="/images/stripe.png" alt="stripe" className="w-16" />
              </div>

              {/* Coingate */}
              <div className="flex items-center gap-4 mt-4">
                <div
                  onClick={() => setPaymentMethod("coingate")}
                  className={`w-5 h-5 cursor-pointer rounded-full border border-black flex items-center justify-center`}
                >
                  {paymentMethod === "coingate" && (
                    <div className="bg-[#3772FF] w-3 h-3 rounded-full"></div>
                  )}
                </div>
                <span className="font-medium">Pay via</span>
                <img src="/images/coingate.png" alt="stripe" className="w-24" />
              </div>
            </div>

            <div className="bg-[#F1F4FF] p-4">
              <div className="flex items-center justify-between my-4">
                <span className="text-[#5E5E5E]">Sub total</span>
                <span className="text-[#5E5E5E]">{subTotal}</span>
              </div>

              <div className="flex items-center justify-between my-4">
                <span className="text-[#5E5E5E]">Tax</span>
                <span className="text-[#5E5E5E]">{formatPrice(0)}</span>
              </div>

              <div className="flex items-center justify-between my-4">
                <span className="text-[#5E5E5E]">Add-ons</span>
                <span className="text-[#5E5E5E]">{formatPrice(0)}</span>
              </div>

              <div className="divider my-4"></div>

              <div className="flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">{total}</span>
              </div>

              <button
                onClick={handleSubmit(onSubmit)}
                className="text-white bg-[#0A0A0A] font-medium rounded-lg w-full h-12 my-4"
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {uploadDocStore.isOpen && (
        <UploadDocModal
          uploadDoc={uploadDoc}
          setUploadDoc={setUploadDoc}
          cartData={cartData as ICart}
        />
      )}
    </>
  );
};

export default Cart;
