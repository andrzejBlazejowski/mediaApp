"use client";

import React, { useState } from "react";
import { Button } from "@radix-ui/themes";

import SelectForeignKey from "~/app/_components/FormView/SelectForeignKey/SelectForeignKey";
import { useInvoiceDoenload } from "./useInvoiceDownload";

export default function Page() {
  const downloadInvoice = useInvoiceDoenload(3);
  const [purchaseId, setPurchaseId] = useState("1");

  return (
    <>
      <SelectForeignKey
        foreignKey="purchaseId"
        defaultValue={purchaseId}
        onValueChange={setPurchaseId}
      />
      <Button onClick={downloadInvoice}>make pdf</Button>
    </>
  );
}
