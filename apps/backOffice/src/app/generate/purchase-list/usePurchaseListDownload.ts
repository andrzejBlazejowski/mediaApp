import { useCallback, useMemo } from "react";
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import { getTransactionsListDefinition } from "./definition";

// @ts-ignore
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function useInvoiceDoenload(id: string) {
  const docDefinition = useMemo(
    () =>
      getTransactionsListDefinition({
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
      }),
    [id],
  );

  const downloadTransiction = useCallback(() => {
    pdfMake.createPdf(docDefinition).download();
  }, [docDefinition]);

  return downloadTransiction;
}
