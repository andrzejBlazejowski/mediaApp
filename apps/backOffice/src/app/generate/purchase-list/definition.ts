import { TDocumentDefinitions } from "pdfmake/interfaces";

interface Params {
  generationDate: string;
  dateFrom: string;
  dateTo: string;
  itemsCount: string;
  avaragePrice: string;
  no: string;
  date: string;
  name: string;
  price: string;
  qty: string;
  totalPrice: string;
}

export function getTransactionsListDefinition(params: Params) {
  const {
    generationDate,
    dateFrom,
    dateTo,
    totalPrice,
    itemsCount,
    avaragePrice,
    no,
    date,
    name,
    price,
    qty,
  } = params;

  var dd: TDocumentDefinitions = {
    content: [
      {
        style: "tableExample",
        layout: "noBorders",
        table: {
          widths: ["*", "*"],
          body: [
            [
              `Media App ltd,
                            NIP: 55-344-666-34, 
                            Adres: DOLNOŚLĄSKIE, Wrocław, ul. Rynek 3, 53-307 Wrocław`,
              {
                text: `Wrocław, ${generationDate}
                                    city, date`,
                style: "alignRight",
              },
            ],
          ],
        },
      },
      { text: "Transaction summary", style: "header" },
      { text: "Date Ranges", style: "subheader" },
      {
        layout: "noBorders",
        table: {
          body: [
            ["Date From", "Date To"],
            [`${dateFrom}`, `${dateTo}`],
          ],
        },
      },
      { text: "Summary Data", style: "subheader" },
      {
        layout: "noBorders",
        table: {
          body: [
            ["Price in total", "Items count", "Avarage price"],
            [totalPrice, itemsCount, avaragePrice],
          ],
        },
      },
      { text: "List of transictions", style: "subheader" },
      {
        style: "tableExample",
        table: {
          widths: [25, 75, "*", 75, 40, 75],
          body: [
            [
              {
                text: "No.",
                style: "tableHeader",
              },
              {
                text: "Date",
                style: "tableHeader",
              },
              {
                text: "Name",
                style: "tableHeader",
              },
              {
                text: "Price",
                style: "tableHeader",
              },
              {
                text: "Qty.",
                style: "tableHeader",
              },
              {
                text: "Total Price",
                style: "tableHeader",
              },
            ],
            [no, date, name, price, qty, totalPrice],
          ],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      alignRight: {
        alignment: "right",
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        fillColor: "#DDD",
        color: "black",
      },
    },
    defaultStyle: {
      // alignment: 'justify'
    },
  };

  return dd;
}
