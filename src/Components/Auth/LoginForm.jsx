import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Field from "../../Common/Field";
import { useAuth } from "../../Hooks/useAuth.js";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();

  useEffect(() => {
    console.log("Auth state updated:", auth);
  }, [auth]);

  const submitForm = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData,
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        const { user, token } = response.data;

        if (token) {
          const authToken = token.accessToken;
          const refreshToken = token.refreshToken;
          setAuth({ user, authToken, refreshToken });
          console.log(auth);
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      setError("root.random", {
        type: "random",
        message: `Email with ${formData.email} is not found`,
      });
    }
  };

  return (
    <form action="" onSubmit={handleSubmit(submitForm)}>
      <div className="mb-6">
        <Field label="Email" error={errors.email} htmlFor="email">
          <input
            {...register("email", {
              required: "Email id is required",
            })}
            type="email"
            id="email"
            name="email"
            className={`w-full p-3 bg-[#030317] border ${
              errors.email ? "border-red-500" : "border-white/20"
            }  rounded-md focus:outline-none focus:border-indigo-500 `}
          />
        </Field>
      </div>

      <div className="mb-6">
        <Field label="Password" htmlFor="password" error={errors.password}>
          <input
            {...register("password", {
              required: "Password is Required",
              minLength: {
                value: 6,
                message: "Your password must be at least 6 characters",
              },
            })}
            className={`w-full p-3 bg-[#030317] border ${
              errors.password ? "border-red-500" : "border-white/20"
            }  rounded-md focus:outline-none focus:border-indigo-500 `}
            type="password"
            name="password"
            id="password"
          />
        </Field>
      </div>
      <p className="text-center m-2">{errors?.root?.random?.message}</p>

      <Field>
        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
          >
            Login
          </button>
        </div>
      </Field>

      <p className="text-center">
        Dont have an account?{" "}
        <Link to="/register" className="text-indigo-600 hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
}
