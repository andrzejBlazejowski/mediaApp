import { useCallback } from "react";
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import { api } from "~/utils/api";
import { getTransactionsListDefinition } from "./definition";

// @ts-ignore
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function usePurchaseListDownload({
  dateFrom,
  dateTo,
}: {
  dateFrom: string;
  dateTo: string;
}) {
  const rawData = api.purchase.byId.useQuery({ id });

  const downloadTransiction = useCallback(() => {
    if (rawData && rawData.data) {
      const docDefinition = getTransactionsListDefinition({
        generationDate: "string",
        dateFrom: "string",
        dateTo: "string",
        totalPrice: "string",
        itemsCount: "string",
        avaragePrice: "string",
        no: "string",
        date: "string",
        name: "string",
        price: "string",
        qty: "string",
      });
      pdfMake.createPdf(docDefinition).download();
    } else {
      return;
    }
  }, [docDefinition, dateFrom, dateTo]);

  return downloadTransiction;
}
