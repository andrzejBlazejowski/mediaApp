"use client";

import React from "react";
import { Button } from "@radix-ui/themes";

import { useInvoiceDoenload } from "./usePurchaseListDownload";

export default function Page() {
  const downloadTransictions = useInvoiceDoenload("string");

  return (
    <>
      <Button onClick={downloadTransictions}>make pdf</Button>
    </>
  );
}
