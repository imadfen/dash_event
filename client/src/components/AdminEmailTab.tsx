import EmailEntry from "./EmailEntry";
import { EmailOptions } from "../types/EmailMessage";
import { useForm } from "react-hook-form";
import { useState } from "react";
import handleSendEmail from "../utils/handleSendEmail";
import EmailOptionsForm from "./EmailOptionsForm";
import { Event } from "../types/Event";
import ConfirmDialog from "./ConfirmDialog";
import SuccessDialog from "./SuccessDialog";

type PropsType = {
  selectedEvent: Event;
};

export default function AdminEmailTab({ selectedEvent }: PropsType) {
  const [html, setHtml] = useState("");
  const { register, getValues, reset } = useForm<EmailOptions>();
  const [loading, setLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);

  const resetFields = () => {
    setHtml("");
    reset();
  };

  const handleSubmit = async () => {
    setConfirmDialog(true);
  };

  const handleConfirmationResonse = (response: boolean) => {
    if (response) {
      requestEmailSend();
    }

    setConfirmDialog(false);
  };

  const requestEmailSend = async () => {
    setLoading(true);
    const options = getValues();

    await handleSendEmail({
      eventId: selectedEvent.id,
      body: html,
      options,
    });

    resetFields();
    setSuccessDialog(true);
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <div className="bg-white bg-opacity-50 w-screen h-full z-50 fixed top-0 left-0"></div>
      ) : (
        <div className="mx-auto w-[90%] flex">
          <EmailEntry value={html} setValue={setHtml} />
          <EmailOptionsForm register={register} handleSubmit={handleSubmit} />
        </div>
      )}
      <ConfirmDialog
        isOpen={confirmDialog}
        reponseWith={handleConfirmationResonse}
      />
      <SuccessDialog
        isOpen={successDialog}
        close={() => setSuccessDialog(false)}
      />
    </div>
  );
}
