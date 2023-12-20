import { UseFormRegister } from "react-hook-form";
import { EmailOptions } from "../types/EmailMessage";

type PropsType = {
  register: UseFormRegister<EmailOptions>;
  handleSubmit: () => void;
};

export default function EmailOptionsForm({
  register,
  handleSubmit,
}: PropsType) {
  return (
    <div className="w-3/5 p-4 flex flex-col items-center">
      <form className="max-w-md mx-auto mt-8">
        <div className="mb-4">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            {...register("subject")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="salutation"
            className="block text-sm font-medium text-gray-700"
          >
            Salutation
          </label>
          <input
            type="text"
            id="salutation"
            {...register("salutation")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <p className="text-gray-500">Do not add a comma (,)</p>
        </div>

        <div className="mb-4">
          <label htmlFor="useReceiverName" className="flex items-center">
            <input
              type="checkbox"
              id="useReceiverName"
              {...register("useReceiverName")}
              className="mr-2 rounded"
            />
            <span className="text-sm font-medium text-gray-700">
              Use participant name
            </span>
          </label>
        </div>

        <div className="mb-4">
          <label
            htmlFor="signature"
            className="block text-sm font-medium text-gray-700"
          >
            Signature
          </label>
          <input
            type="text"
            id="signature"
            {...register("signature")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </form>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        type="button"
        onClick={handleSubmit}
      >
        Send Email
      </button>
    </div>
  );
}
