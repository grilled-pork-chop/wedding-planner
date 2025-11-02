
import "@/utils/i18n";

import React from "react";
import ReactDOM from "react-dom/client";

import BackgroundMusic from "@/components/BackgroundMusic";
import Invitation from "@/pages/Invitation";

import "@/styles/invitation.css";

async function bootstrap() {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Invitation />
      <BackgroundMusic />
    </React.StrictMode>
  );
}

bootstrap();
