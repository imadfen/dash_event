import { useForm } from "react-hook-form";
import { Event } from "../types/Event";
import handleAddEvent from "../utils/handleAddEvent";
import { useState } from "react";

type FormInputs = Omit<Event, "id">;

type PropsType = {
  isOpen: boolean;
  onDone: () => void;
  onClose: () => void;
};

export default function NewEventDialog({ isOpen, onDone, onClose }: PropsType) {
  const [errorAddEvent, setErrorAddEvent] = useState(false);
  const [loadingNewEvent, setLoadingNewEvent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    setErrorAddEvent(false);
    setLoadingNewEvent(true);
    const result = await handleAddEvent(data);
    if (result) {
      onDone();
    } else {
      setErrorAddEvent(true);
    }
    setLoadingNewEvent(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0">
      <div className="max-w-md max-h-[80%] mx-auto bg-white p-8 rounded-md shadow-md absolute z-30 inset-10 overflow-y-scroll">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              disabled={loadingNewEvent}
              {...register("name", { required: "Name is required" })}
              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-semibold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              disabled={loadingNewEvent}
              {...register("description", {
                required: "Description is required",
              })}
              rows={3}
              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
            />
            {errors.description && (
              <span className="text-red-500 text-sm">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-semibold mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              disabled={loadingNewEvent}
              {...register("date", { required: "Date is required" })}
              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
            />
            {errors.date && (
              <span className="text-red-500 text-sm">
                {errors.date.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="time" className="block text-sm font-semibold mb-2">
              Time
            </label>
            <input
              type="time"
              id="time"
              disabled={loadingNewEvent}
              {...register("time", { required: "Time is required" })}
              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
            />
            {errors.time && (
              <span className="text-red-500 text-sm">
                {errors.time.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-semibold mb-2"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              disabled={loadingNewEvent}
              {...register("location", { required: "Location is required" })}
              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
            />
            {errors.location && (
              <span className="text-red-500 text-sm">
                {errors.location.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-semibold mb-2">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              disabled={loadingNewEvent}
              {...register("image", { required: "Image URL is required" })}
              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
            />
            {errors.image && (
              <span className="text-red-500 text-sm">
                {errors.image.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={loadingNewEvent}
            className="bg-blue-500 text-white border-2 border-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
          <button
            type="button"
            disabled={loadingNewEvent}
            className="mx-3 bg-white text-blue-500 border-2 border-blue-500 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-300"
            onClick={onClose}
          >
            Cancel
          </button>
          {errorAddEvent && <span className="text-xs font-bold text-red-400">Something went wrong!</span>}
        </form>
      </div>
      <div className="bg-black opacity-30 w-full h-full absolute top-0 left-0 z-10" />
    </div>
  );
}
