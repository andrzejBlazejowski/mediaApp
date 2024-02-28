"use client";

import type { ChangeEvent } from "react";
import React, { useState } from "react";
import { Button } from "@radix-ui/themes";

import { Input } from "~/app/_components/ui/input";
import { usePurchaseListDownload } from "./usePurchaseListDownload";

export default function Page() {
  const dateFromDate = new Date(Date.now());
  dateFromDate.setMonth(dateFromDate.getMonth() - 1);
  const dateToDate = new Date(Date.now());

  const [dateFrom, setDateFrom] = useState(
    dateFromDate.toISOString().substr(0, 10),
  );
  const [dateTo, setDateTo] = useState(dateToDate.toISOString().substr(0, 10));
  const downloadTransictions = usePurchaseListDownload({ dateFrom, dateTo });

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
