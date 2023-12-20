import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import COMMASPACE


# Auto detect the supported smtp servers from the email address
def smtp_detector(address: str):
    if "@gmail." in address:
        return "smtp.gmail.com"
    elif "@hotmail." in address or "@outlook." in address:
        return "smtp.office365.com"
    elif "@yahoo." in address:
        return "smtp.mail.yahoo.com"
    else:
        smtp = input(
            'unable to find the smtp server, you can input your smtp or type "exit" to cancel: '
        )
        return smtp


def combine_body(salutation: str, receiver: str | None, body: str, signature: str):
    if salutation != "":
        if receiver:
            salutation = f"<p>{salutation} <strong>{receiver}</strong>,</p>"
        else:
            salutation = f"<p>{salutation},</p>"

        body = f"{salutation}\n{body}"

    if signature != "":
        signature = f"<strong>,{signature}</strong>"
        body = f"{body}\n{signature}"

    return body


def send_email(
    Password: str,
    From: str,
    To: str,
    Subject="",
    salutation: str = "",
    receiver_name: str | None = None,
    html_body: str = "",
    signature: str = "",
):
    try:
        # SMTP server
        smtp_server = smtp_detector(From)
        smtp_port = 587

        # connection to the SMTP server
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(From, Password)

        # email message
        msg = MIMEMultipart()
        msg["From"] = From
        msg["To"] = COMMASPACE.join([To])
        msg["Subject"] = Subject

        # HTML text body
        html_body = combine_body(
            salutation=salutation,
            receiver=receiver_name,
            body=html_body,
            signature=signature,
        )
        if html_body != "":
            msg.attach(MIMEText(html_body, "html"))

        # send the email and close the connection
        server.sendmail(From, To, msg.as_string())
        server.quit()

    except Exception as e:
        if "Application-specific password required" in str(e):
            print(
                """Error in password: To send emails with the email provider Google "Gmail" you have to login with App-Password instead of the real password
                > learn more at https://support.google.com/mail/?p=InvalidSecondFactor
                """
            )
        else:
            print(e)


def send_for_each(
    participants,
    Password: str,
    From: str,
    Subject="",
    salutation: str = "",
    useReceiverName: bool = False,
    html_body: str = "",
    signature: str = "",
):
    for participant in participants:
        receiver_name = None
        if useReceiverName:
            receiver_name = participant["firstName"]

        send_email(
            Password=Password,
            From=From,
            To=participant["email"],
            Subject=Subject,
            salutation=salutation,
            receiver_name=receiver_name,
            html_body=html_body,
            signature=signature,
        )
