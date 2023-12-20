import dash from "../assets/dash.png";

type PropsType = {
  isOpen: boolean;
  close: () => void;
};

export default function SuccessDialog({ isOpen, close }: PropsType) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
      <div className="relative bg-white rounded-lg p-8 w-96">
        <h2 className="text-2xl text-primary font-extrabold mb-4 text-center">
          Yaay!
        </h2>
        <p className="text-center mb-6 text-lg">
          Your email messages are being sent for the participants.
        </p>
        <div className="flex justify-center">
          <img src={dash} alt="" className="w-2/3" />
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={close}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
