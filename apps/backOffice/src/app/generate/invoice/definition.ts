import { TDocumentDefinitions } from "pdfmake/interfaces";

interface Params {
  productName: string;
  invoiceNumber: string;
  buyDate: string;
  paymentDeadline: string;
  buyerName: string;
  buyerNo: string;
  buyerAddress: string;
  productQty: number;
  productPrice: number;
}

export function getInvoiceDefinition(params: Params) {
  const {
    productName,
    invoiceNumber,
    buyDate,
    paymentDeadline,
    buyerName,
    buyerNo,
    buyerAddress,
    productQty,
    productPrice,
  } = params;

  const headerTable = {
    leftColumn: {
      width: 180,
      height: 40,
    },
    rightColumn: {
      width: 300,
      height: 20,
    },
  };
  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        style: "tableExample",
        table: {
          headerRows: 1,
          widths: [
            headerTable.leftColumn.width,
            "*",
            headerTable.rightColumn.width,
          ],
          body: [
            [
              [
                {
                  table: {
                    widths: [
                      headerTable.leftColumn.width / 2,
                      headerTable.leftColumn.width / 2,
                    ],
                    heights: [headerTable.leftColumn.height],
                    body: [
                      [
                        {
                          text: "Invoice No. : ",
                          alignment: "center",
                          fillColor: "#DDD",
                        },
                        {
                          text: invoiceNumber,
                          alignment: "center",
                        },
                      ],
                    ],
                  },
                },
              ],
              "",
              [
                {
                  table: {
                    widths: [headerTable.rightColumn.width],
                    heights: [
                      headerTable.rightColumn.height,
                      headerTable.rightColumn.height,
                    ],
                    body: [
                      [
                        {
                          text: `Wrocław, ${buyDate}`,
                          alignment: "center",
                        },
                      ],
                      [
                        {
                          text: "city, date",
                          alignment: "center",
                          fillColor: "#DDD",
                        },
                      ],
                    ],
                  },
                },
              ],
            ],

            [
              [
                {
                  table: {
                    widths: [
                      headerTable.leftColumn.width / 2,
                      headerTable.leftColumn.width / 2,
                    ],
                    heights: [
                      headerTable.leftColumn.height / 2,
                      headerTable.leftColumn.height / 2,
                    ],
                    body: [
                      [
                        {
                          text: "Payment deadline",
                          alignment: "center",
                          fillColor: "#DDD",
                        },
                        {
                          text: "Payment form",
                          alignment: "center",
                          fillColor: "#DDD",
                        },
                      ],
                      [
                        {
                          text: paymentDeadline,
                          alignment: "center",
                        },
                        {
                          text: "bank transfer",
                          alignment: "center",
                        },
                      ],
                    ],
                  },
                },
              ],
              "",
              [
                {
                  table: {
                    widths: [headerTable.rightColumn.width],
                    heights: [
                      headerTable.rightColumn.height,
                      headerTable.rightColumn.height,
                    ],
                    body: [
                      [
                        {
                          text: "Date of issue",
                          alignment: "center",
                          fillColor: "#DDD",
                        },
                      ],
                      [
                        {
                          text: buyDate,
                          alignment: "center",
                        },
                      ],
                    ],
                  },
                },
              ],
            ],

            [
              [
                {
                  table: {
                    widths: [headerTable.leftColumn.width + 10],
                    heights: [
                      headerTable.leftColumn.height / 2,
                      headerTable.leftColumn.height * 1.5,
                    ],
                    body: [
                      [
                        {
                          text: "Seller",
                          alignment: "center",
                          fillColor: "#DDD",
                        },
                      ],
                      [
                        {
                          text: `Media App ltd,
                            NIP: 55-344-666-34, 
                            Adres: DOLNOŚLĄSKIE, Wrocław, ul. Rynek 3, 53-307 Wrocław`,
                          alignment: "left",
                        },
                      ],
                    ],
                  },
                },
              ],
              "",
              [
                {
                  table: {
                    widths: [headerTable.rightColumn.width],
                    heights: [
                      headerTable.rightColumn.height,
                      headerTable.rightColumn.height * 3,
                    ],
                    body: [
                      [
                        {
                          text: "Buyer",
                          fillColor: "#DDD",
                          alignment: "center",
                        },
                      ],
                      [
                        {
                          text: `${buyerName},
                            NIP: ${buyerNo},
                            Adres: ${buyerAddress}`,
                          alignment: "left",
                        },
                      ],
                    ],
                  },
                },
              ],
            ],
          ],
        },
        layout: "noBorders",
      },
      {
        table: {
          widths: [515],
          body: [
            [
              {
                text: "Split payment mechanism",
                alignment: "center",
              },
            ],
            [
              {
                table: {
                  widths: [100, 400],
                  body: [
                    [
                      {
                        border: [false, false, true, false],
                        text: `Bank,
                          account number`,
                        fillColor: "#DDD",
                        alignment: "center",
                      },
                      {
                        border: [false, false, false, false],
                        text: `Santander Bank Polska S.A.,
                          68 1910 1048 2679 9176 9177 0001`,
                        alignment: "center",
                      },
                    ],
                  ],
                  layout: "noBorders",
                },
              },
            ],
          ],
        },
      },
      {
        style: "tableExample",
        table: {
          widths: [20, 130, 27, 40, 65, 40, 65, 65],
          body: [
            [
              {
                text: "No.",
                fillColor: "#DDD",
                alignment: "center",
              },
              {
                text: "name",
                fillColor: "#DDD",
                alignment: "center",
              },
              {
                fillColor: "#DDD",
                text: "qty",
                alignment: "center",
              },
              {
                text: "net cost",
                fillColor: "#DDD",
                alignment: "center",
              },
              {
                text: "gross cost",
                fillColor: "#DDD",
                alignment: "center",
              },
              {
                text: "VAT rate",
                fillColor: "#DDD",
                alignment: "center",
              },
              {
                text: "VAT value",
                fillColor: "#DDD",
                alignment: "center",
              },
              {
                text: "value with VAT",
                fillColor: "#DDD",
                alignment: "center",
              },
            ],
            [
              {
                text: "1",
                alignment: "center",
              },
              {
                text: productName,
                alignment: "center",
              },
              {
                text: productQty,
                alignment: "center",
              },
              {
                text: productPrice,
                alignment: "center",
              },
              {
                text: productPrice * productQty,
                alignment: "center",
              },
              {
                text: "23%",
                alignment: "center",
              },
              {
                text: productPrice * productQty * 0.23,
                alignment: "center",
              },
              {
                text: productPrice * productQty * 1.23,
                alignment: "center",
              },
            ],
            [
              {
                border: [false, false, false, false],
                text: "",
                alignment: "center",
              },
              {
                border: [false, false, false, false],
                text: "",
                alignment: "center",
              },
              {
                border: [false, false, false, false],
                text: "",
                alignment: "center",
              },
              {
                text: "RAZEM",
                fillColor: "#DDD",
                alignment: "center",
              },
              {
                text: productPrice * productQty,
                alignment: "center",
              },
              {
                text: "23%",
                alignment: "center",
              },
              {
                text: productPrice * productQty * 0.23,
                alignment: "center",
              },
              {
                text: productPrice * productQty * 1.23,
                alignment: "center",
              },
            ],
          ],
        },
      },
      {
        style: "tableExample",
        table: {
          headerRows: 1,
          widths: [
            headerTable.leftColumn.width,
            "*",
            headerTable.rightColumn.width,
          ],
          body: [
            [
              [
                {
                  table: {
                    widths: [
                      headerTable.leftColumn.width,
                      headerTable.leftColumn.width,
                    ],
                    heights: [
                      headerTable.leftColumn.height,
                      headerTable.leftColumn.height,
                    ],
                    body: [
                      [
                        {
                          text: "Invoice issued by ",
                          fillColor: "#DDD",
                          alignment: "center",
                        },
                      ],
                      [
                        {
                          text: "CEO of MEdia App ltd",
                          alignment: "center",
                        },
                      ],
                    ],
                  },
                },
              ],
              "",
              [
                {
                  table: {
                    // widths: [headerTable.rightColumn.width],
                    // heights: [
                    //   headerTable.rightColumn.height,
                    //   headerTable.rightColumn.height,
                    // ],
                    body: [
                      [
                        {
                          text: "Rate",
                          fillColor: "#DDD",
                          alignment: "center",
                        },
                        {
                          text: "net value",
                          fillColor: "#DDD",
                          alignment: "center",
                        },
                        {
                          text: "VAT amount",
                          fillColor: "#DDD",
                          alignment: "center",
                        },
                        {
                          text: "value with VAT",
                          fillColor: "#DDD",
                          alignment: "center",
                        },
                      ],
                      [
                        {
                          text: "zw.",
                          alignment: "center",
                        },
                        {
                          text: "",
                          alignment: "center",
                        },
                        {
                          text: "",
                          alignment: "center",
                        },
                        {
                          text: "",
                          alignment: "center",
                        },
                      ],
                      [
                        {
                          text: "5%",
                          alignment: "center",
                        },
                        {
                          text: "",
                          alignment: "center",
                        },
                        {
                          text: "",
                          alignment: "center",
                        },
                        {
                          text: "",
                          alignment: "center",
                        },
                      ],
                      [
                        {
                          text: "8%",
                          alignment: "center",
                        },
                        {
                          text: "",
                          alignment: "center",
                        },
                        {
                          text: "",
                          alignment: "center",
                        },
                        {
                          text: "",
                          alignment: "center",
                        },
                      ],
                      [
                        {
                          text: "23%",
                          alignment: "center",
                        },
                        {
                          text: productPrice * productQty,
                          alignment: "center",
                        },
                        {
                          text: productPrice * productQty * 0.23,
                          alignment: "center",
                        },
                        {
                          text: productPrice * productQty * 1.23,
                          alignment: "center",
                        },
                      ],
                    ],
                  },
                },
              ],
            ],
          ],
        },
        layout: "noBorders",
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
      tableOpacityExample: {
        margin: [0, 5, 0, 15],
        fillColor: "blue",
        fillOpacity: 0.3,
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: "black",
      },
    },
    defaultStyle: {
      // alignment: 'justify'
      font: "Roboto",
      // bold: true,
    },
  };

  return docDefinition;
}
