# Dash Events

Dash Events is a web application designed to streamline event registration processes while providing administrators with tools to manage events, view participant details, and send customized emails.

## Features

- **Event Registration:** Users can browse a list of events and register for their preferred ones.
- **Admin Dashboard:** Accessible via "/admin", it allows administrators to:
  - View detailed event information.
  - Manage participants registered for events.
  - Send customized emails with configurable subject, salutation, and signature.
  - Incorporate participant names into email salutations.
  
## Tech Stack

- **Frontend:**
  - Built with React, Vite, TypeScript, and Tailwind CSS for a responsive and interactive user interface.
- **Backend:**
  - Powered by Python Flask to manage server-side operations and handle emails send.

## Getting Started

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/imad_fen/dash-event.git
    cd dash-event
    ```

2. **Install Dependencies:**
    - Navigate to the `client` directory for the frontend dependencies and the `server` directory for the backend dependencies.
    ```bash
    cd client
    npm install # or yarn install
    cp .env.example .env # Create a .env file and add the VITE_SERVER_URL
    ```
    ```bash
    cd ../server
    pip install -r requirements.txt
    cp .env.example .env # Create a .env file and add SECRET_KEY, SENDER_ADDRESS, and SENDER_PASSWORD
    ```

3. **Setup Environment Variables:**

    - In the `client` directory, create a `.env` file and add the following:
    ```
    VITE_SERVER_URL="http://127.0.0.1:5000"
    ```

    - In the `server` directory, create a `.env` file and add the following:
    ```
    SECRET_KEY=<random 64 chars>
    SENDER_ADDRESS=<email sender address>
    SENDER_PASSWORD=<email sender app password>
    ```
      **NOTE:**
    + For senders with gmail, the program needs the <b>Google App-Password</b>, you can generate one from <a href="https://myaccount.google.com/apppasswords" target="_blank">HERE.

      </a> Learn more about <b>Google App-Password</b> from here: https://support.google.com/accounts/answer/185833?hl=en

5. **Run the Application:**
    - Start the frontend server.
    ```bash
    # Frontend
    cd client
    npm run dev
    ```
    - And the backend server.
    ```bash
    # Backend
    cd server
    python main.py
    ```

6. **Access the Application:**
    - Open your browser and visit `http://localhost:5173` for the user interface and `http://localhost:5173/admin` for the admin dashboard.

## Admin Credentials

To access the admin dashboard, use the following static credentials:
- Username: "dash123"
- Password: "cooldash23"

## Configuration

- **Customizing Emails:**
  - Inside the admin dashboard, administrators can compose emails with configurable subject lines, salutations, and signatures. The option to include participant names in the salutation is available.
