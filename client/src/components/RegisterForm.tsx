import { useForm } from "react-hook-form";
import { RegistrationData } from "../types/RegistarionData";

type PropsType = {
  onSubmit: (data: RegistrationData) => void;
};

export default function RegisterForm({ onSubmit }: PropsType) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationData>();
  const isStudent = watch("isStudent");

  return (
    <div className="w-full p-6 bg-gray-100 shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-3xl font-bold mt-5 mb-10">Register</h2>
        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="firstName">
            First Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            type="text"
            id="firstName"
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName.message?.toString()}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="lastName">
            Last Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            type="text"
            id="lastName"
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message?.toString()}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message?.toString()}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="phone">
            Phone Number
          </label>
          <input
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            type="tel"
            id="phone"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid phone number",
              },
            })}
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message?.toString()}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">
            Are you a student?
            <input
              className="ml-2"
              type="checkbox"
              {...register("isStudent")}
            />
          </label>
        </div>
        {isStudent && (
          <div className="mb-4">
            <label className="block mb-2 font-bold" htmlFor="university">
              University Name
            </label>
            <input
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              type="text"
              id="university"
              {...register("university", {
                required: "University name is required for students",
              })}
            />
            {errors.university && (
              <p className="text-red-500">{errors.university.message?.toString()}</p>
            )}
          </div>
        )}
        <button
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none duration-300"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
