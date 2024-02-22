"use client";

import React from "react";
import { Button } from "@radix-ui/themes";

import { useInvoiceDoenload } from "./useInvoiceDownload";

export default function Page() {
  const downloadInvoice = useInvoiceDoenload(3);

  return (
    <>
      <Button onClick={downloadInvoice}>make pdf</Button>
    </>
  );
}
