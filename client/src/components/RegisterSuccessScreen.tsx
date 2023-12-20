import dashChat from "../assets/dash_chat.png"

type PropsType = {
    goHome: () => void;
}

export default function RegisterSuccessScreen({goHome}: PropsType) {
  return (
    <div className="flex justify-center items-center w-full h-full">
        <div className="w-full md:w-1/2 mx-10 py-2 px-6 md:px-28 bg-gray-100 rounded-lg shadow-md flex flex-col items-center">
            <h1 className="text-5xl font-extrabold text-primary">Success!!</h1>
            <p className="text-lg font-bold text-center">Congratulations! You&apos;re officially in for a fantastic time at our event. Get ready to chill and have a blast! 🎉✨</p>
            <button onClick={goHome} className="secondary-button my-5">Go Home</button>
            <img src={dashChat} alt="" />
        </div>
    </div>
  );
}
