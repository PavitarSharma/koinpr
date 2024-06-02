import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormSchema } from "../schemas";
import { Button, Input } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

type Schema = z.infer<typeof SignUpFormSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
  } = useForm<Schema>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  useEffect(() => {
    document.title = "Sign Up"
  }, [])

  const onSubmit = async (data: Schema) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/user/signup", data);
      console.log(response.data);
      enqueueSnackbar("Register successfully", { variant: "success" });
      navigate("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      enqueueSnackbar(error.response?.data?.message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-20 flex items-center justify-center p-4">
      <form className="max-w-xl w-full p-4 rounded-lg shadow border border-gray-300 space-y-4">
        <h1 className="text-2xl font-semibold">Sign Up</h1>
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <Input
              id="name"
              value={value}
              onChange={onChange}
              label="Name"
              error={errors.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <Input
              id="email"
              value={value}
              onChange={onChange}
              label="Email"
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <Input
              id="password"
              value={value}
              onChange={onChange}
              label="Password"
              error={errors.password?.message}
            />
          )}
        />
        <Button
          disabled={loading}
          label="Sign Up"
          onClick={handleSubmit(onSubmit)}
        />

        <p className="text-center my-4">
          <span className="text-light-gray">Already have an account?</span>{" "}
          <Link to="/login" className="font-semibold">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
