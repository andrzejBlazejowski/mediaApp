"use client";

import React from "react";
import { Button } from "@radix-ui/themes";

import { usePurchaseListDownload } from "./usePurchaseListDownload";

export default function Page() {
  const downloadTransictions = usePurchaseListDownload(1);

  return (
    <>
      <Button onClick={downloadTransictions}>make pdf</Button>
    </>
  );
}
