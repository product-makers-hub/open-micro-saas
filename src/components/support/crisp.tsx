"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

import { supportConfig } from "@/config/support-config";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure(supportConfig.crispId);
  }, []);

  return null;
};

export default CrispChat;
