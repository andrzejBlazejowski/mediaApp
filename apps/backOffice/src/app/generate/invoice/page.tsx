"use client";

import React, { useState } from "react";
import { Button } from "@radix-ui/themes";

import SelectForeignKey from "~/app/_components/FormView/SelectForeignKey/SelectForeignKey";
import { useInvoiceDoenload } from "./useInvoiceDownload";

export default function Page() {
  const [purchaseId, setPurchaseId] = useState("1");
  const downloadInvoice = useInvoiceDoenload(parseInt(purchaseId));

  return (
    <>
      <div className="flex min-h-screen flex-wrap content-center justify-center gap-10">
        <SelectForeignKey
          foreignKey="purchaseId"
          defaultValue={purchaseId}
          onValueChange={setPurchaseId}
        />
        <Button onClick={downloadInvoice}>get invoice</Button>
      </div>
    </>
  );
}
