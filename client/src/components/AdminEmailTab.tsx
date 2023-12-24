import EmailEntry from "./EmailEntry";
import { EmailOptions } from "../types/EmailMessage";
import { useForm } from "react-hook-form";
import { useState } from "react";
import handleSendEmail from "../utils/handleSendEmail";
import EmailOptionsForm from "./EmailOptionsForm";
import { Event } from "../types/Event";
import ConfirmDialogSendEmails from "./ConfirmDialogSendEmails";
import SuccessDialog from "./SuccessDialog";
import FailSendEmailDialog from "./FailSendEmailDialog";

type PropsType = {
  selectedEvent: Event;
};

export default function AdminEmailTab({ selectedEvent }: PropsType) {
  const [html, setHtml] = useState("");
  const { register, getValues, reset } = useForm<EmailOptions>();
  const [loading, setLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [failDialog, setFailDialog] = useState(false);

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

    const result = await handleSendEmail({
      eventId: selectedEvent.id,
      body: html,
      options,
    });

    if (result) {
      resetFields();
      setSuccessDialog(true);
    } else {
      setFailDialog(true);
    }

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
      <ConfirmDialogSendEmails
        isOpen={confirmDialog}
        reponseWith={handleConfirmationResonse}
      />
      <SuccessDialog
        isOpen={successDialog}
        close={() => setSuccessDialog(false)}
      />
      <FailSendEmailDialog
        isOpen={failDialog}
        onClose={() => setFailDialog(false)}
      />
    </div>
  );
}
