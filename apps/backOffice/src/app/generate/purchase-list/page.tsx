"use client";

import type { ChangeEvent } from "react";
import React, { useState } from "react";
import { Button } from "@radix-ui/themes";

import { Input } from "~/app/_components/ui/input";
import { usePurchaseListDownload } from "./usePurchaseListDownload";

export default function Page() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const downloadTransictions = usePurchaseListDownload({ dateFrom, dateTo });
  console.log(dateFrom);

  return (
    <>
      <div className="flex min-h-screen flex-wrap content-center justify-center gap-10">
        <p>date from:</p>
        <Input
          className="w-50"
          type="date"
          value={dateFrom}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setDateFrom(e.target.value);
          }}
        />
        <p>date to:</p>
        <Input
          className="w-50"
          type="date"
          value={dateTo}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setDateTo(e.target.value);
          }}
        />
        <Button onClick={downloadTransictions}>get transictions summary</Button>
      </div>
    </>
  );
}
