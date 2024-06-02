import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema } from "../schemas";
import { Button, Input } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useGlobalState";

type Schema = z.infer<typeof LoginFormSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext()
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control } = useForm<Schema>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "josephaltmen@gmail.com",
      password: "test@1234",
    },
  });

  useEffect(() => {
    if(user) {
      navigate("/")
    }
  }, [navigate, user])

  const onSubmit = async (data: Schema) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/user/login", data);
      localStorage.setItem("todayqToken", response.data?.access_token);
      localStorage.setItem("todayqUser", JSON.stringify(response.data?.user));
      enqueueSnackbar("Login successfully", { variant: "success" });
      navigate("/");
      setUser(response.data?.user)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      enqueueSnackbar(error.response?.data?.message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-20 flex items-center justify-center">
      <form className="max-w-xl w-full p-4 rounded-lg shadow border border-gray-300 space-y-4">
        <h1 className="text-2xl font-semibold">Sign In</h1>
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
          label="Login"
          onClick={handleSubmit(onSubmit)}
        />

        <p className="text-center my-4">
          <span className="text-light-gray">Do not have an account?</span>{" "}
          <Link to="/signup" className="font-semibold">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
