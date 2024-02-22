import { useCallback, useMemo } from "react";
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import { getInvoiceDefinition } from "./definition";

// @ts-ignore
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function useInvoiceDoenload(id: string) {
  const docDefinition = useMemo(
    () =>
      getInvoiceDefinition({
        productName: "string",
        invoiceNumber: "string",
        lastDayOfMonthString: "string",
        paymentDeadline: "string",
        buyerName: "string",
        buyerNo: "string",
        buyerAddress: "string",
        productQty: 4,
        productPrice: 3,
      }),
    [id],
  );

  const downloadInvoice = useCallback(() => {
    pdfMake.createPdf(docDefinition).download();
  }, [docDefinition]);

  return downloadInvoice;
}
