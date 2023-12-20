import dash_sad from "../assets/dash_sad_2.png"

type PropsType = {
    goHome: () => void;
}

export default function RegisterFailScreen({goHome}: PropsType) {
  return (
    <div className="flex justify-center items-center w-full h-full">
        <div className="w-full md:w-1/2 mx-10 py-2 px-6 md:px-28 bg-gray-100 rounded-lg shadow-md flex flex-col items-center">
            <h1 className="text-5xl font-extrabold text-error">Fail!!</h1>
            <p className="text-lg font-bold text-center">Sorry 🥺 Your request to register failed because of unexpected reasons, try again later</p>
            <button onClick={goHome} className="secondary-button my-5">Go Home</button>
            <img src={dash_sad} alt="" width={200} />
        </div>
    </div>
  );
}
