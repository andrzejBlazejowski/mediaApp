import { useCallback } from "react";
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import { api } from "~/utils/api";
import { getInvoiceDefinition } from "./definition";

// @ts-ignore
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function useInvoiceDoenload(id: number) {
  const rawData = api.purchase.byId.useQuery({ id });

  const downloadInvoice = useCallback(() => {
    if (rawData && rawData.data) {
      const {
        media,
        createdAt,
        qty,
        price,
        user: { name, email, address, accountNo },
        purchaseType,
      } = rawData.data;
      const deadLineDate = new Date(createdAt.getTime());

      deadLineDate.setDate(createdAt.getDate() + 14);

      const docDefinition = getInvoiceDefinition({
        productName:
          (media?.name ?? "") + " - " + purchaseType?.name ??
          purchaseType?.id ??
          "",
        invoiceNumber: `${createdAt.getFullYear()}/${createdAt.getMonth()}/${createdAt.getDay()}/${id}`,
        buyDate: createdAt.toISOString().slice(0, 10),
        paymentDeadline: deadLineDate.toISOString().slice(0, 10),
        buyerName: name ?? email ?? "",
        buyerNo: accountNo,
        buyerAddress: address,
        productQty: qty ?? 1,
        productPrice: price ?? 1,
      });
      pdfMake.createPdf(docDefinition).download("invoice");
    } else {
      return;
    }
  }, [rawData]);

  return downloadInvoice;
}
