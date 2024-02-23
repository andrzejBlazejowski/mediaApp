import { useCallback } from "react";
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import { useToast } from "~/app/_components/ui/use-toast";
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
  const rawData = api.purchase.getByDateRange.useQuery({ dateFrom, dateTo });
  const { toast } = useToast();

  const downloadTransiction = useCallback(() => {
    if (rawData && rawData.data && rawData.data.length > 0) {
      const itemsCount = rawData.data.length;
      const totalPrice = rawData.data.reduce(
        (acc, current) => acc + (current?.price ?? 0),
        0,
      );
      const avaragePrice = totalPrice / itemsCount;
      const products = rawData.data.map(
        ({ createdAt, media, price, qty }, index) => ({
          no: index.toString(),
          date: createdAt.toISOString().slice(0, 10),
          name: media.name,
          qty: (qty ?? 1).toString(),
          price: (price ?? 1).toString(),
          totalPrice: ((qty ?? 1) * (price ?? 1)).toFixed(2).toString(),
        }),
      );

      const docDefinition = getTransactionsListDefinition({
        generationDate: new Date(Date.now()).toISOString().slice(0, 10),
        dateFrom,
        dateTo,
        totalPrice: avaragePrice.toFixed(2).toString(),
        itemsCount: itemsCount.toString(),
        avaragePrice: avaragePrice.toFixed(2).toString(),
        products,
      });
      pdfMake.createPdf(docDefinition).download("transactions-list");
    } else {
      toast({
        title: "no data to print ",
        description: "You have selected wgond date range.",
      });
      return;
    }
  }, [rawData]);

  return downloadTransiction;
}
