"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { media } from "@media/db";

export default function Page() {
  const form = useForm<z.infer<typeof media.mediasInsertSchema>>({
    resolver: zodResolver(media.mediasInsertSchema),
  });

  function onSubmit(values: z.infer<typeof media.mediasInsertSchema>) {
    console.log(values);
  }

  return <div>tbd</div>;
}
