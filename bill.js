document.addEventListener("DOMContentLoaded", function () {
  const search = document.querySelector(".input-group input"),
    table_rows = document.querySelectorAll("tbody tr"),
    table_headings = document.querySelectorAll("thead th");

  // 1. Searching for specific data of HTML table
  search.addEventListener("input", searchTable);

  function searchTable() {
    table_rows.forEach((row, i) => {
      let table_data = row.textContent.toLowerCase(),
        search_data = search.value.toLowerCase();

      row.classList.toggle("hide", table_data.indexOf(search_data) < 0);
      row.style.setProperty("--delay", i / 25 + "s");
    });

    document
      .querySelectorAll("tbody tr:not(.hide)")
      .forEach((visible_row, i) => {
        visible_row.style.backgroundColor =
          i % 2 == 0 ? "transparent" : "#0000000b";
      });
  }

  // 2. Sorting | Ordering data of HTML table
  table_headings.forEach((head, i) => {
    let sort_asc = true;
    head.onclick = () => {
      table_headings.forEach((head) => head.classList.remove("active"));
      head.classList.add("active");

      document
        .querySelectorAll("td")
        .forEach((td) => td.classList.remove("active"));
      table_rows.forEach((row) => {
        row.querySelectorAll("td")[i].classList.add("active");
      });

      head.classList.toggle("asc", sort_asc);
      sort_asc = head.classList.contains("asc") ? false : true;

      sortTable(i, sort_asc);
    };
  });

  function sortTable(column, sort_asc) {
    [...table_rows]
      .sort((a, b) => {
        let first_row = a
            .querySelectorAll("td")
            [column].textContent.toLowerCase(),
          second_row = b
            .querySelectorAll("td")
            [column].textContent.toLowerCase();

        return sort_asc
          ? first_row < second_row
            ? 1
            : -1
          : first_row < second_row
          ? -1
          : 1;
      })
      .map((sorted_row) =>
        document.querySelector("tbody").appendChild(sorted_row)
      );
  }

  // 3. Converting HTML table to PDF
  const pdf_btn = document.querySelector("#toPDF");
  const customers_table = document.querySelector("#customers_table");

  const toPDF = function (customers_table) {
    const rows = customers_table.querySelectorAll("tbody tr");
    let totalQuantity = 0;
    let totalPrices = 0;

    // Bắt đầu từ hàng thứ 2 (index 1)
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const quantityCell = row.querySelector("td:nth-child(6)"); // Cột thứ 6
      const totalCell = row.querySelector("td:nth-child(7)"); // Cột thứ 7

      const quantity =
        parseFloat(
          quantityCell ? quantityCell.innerText.replace(/\./g, "") : "0"
        ) || 0; // Loại bỏ dấu chấm
      const total =
        parseFloat(totalCell ? totalCell.innerText.replace(/\./g, "") : "0") ||
        0; // Loại bỏ dấu chấm

      totalQuantity += quantity;
      totalPrices += total;
    }

    // Hàm định dạng số với dấu chấm
    function formatNumber(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Định dạng số
    }

    const totalRow = `
        <tr>
          <td><strong>TT</strong></td>
          <td><strong>#</strong></td>
          <td><strong>#</strong></td>
          <td><strong>#</strong></td>
          <td><strong>#</strong></td>
          <td><strong>${formatNumber(totalQuantity)}</strong></td>
          <td><strong>${formatNumber(totalPrices)}</strong></td>
        </tr>
      `;

    const modifiedTable = customers_table.innerHTML.replace(
      /(<\/tbody>)/,
      totalRow + "$1"
    );

    const printDate = new Date().toLocaleDateString(); // Lấy ngày giờ hiện tại

    const html_code = `
      <!DOCTYPE html>
      <html>
      <head>
        <link rel="stylesheet" type="text/css" href="style.css">
        <style>
          @media print {
            @page {
              margin: 1cm;
            }
              #hate {
                display: none !important;
            }
            #haha {
                font-size: 25px;
            }
            img, .input-group, .export__file {
              display: none !important;
            }
            .watermark {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-30deg);
              font-size: 100px;
              color: rgba(0, 0, 0, 0.1);
              white-space: nowrap;
              pointer-events: none;
              z-index: -1;
            }
            main.table {
              border-radius: 0 !important;
              box-shadow: none !important;
              background-color: transparent !important;
            }

            .table__body {
              border-radius: 0;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              border: 2px solid #000;
              table-layout: fixed;
            }
            th, td {
              padding: 10px;
              border: 2px solid #000;
              color: black;
              text-align: center;
              vertical-align: middle;
              word-wrap: break-word;
              word-break: break-all;
            }
            tr:nth-child(even) td {
              background-color: #f2f2f2;
            }
            tr:nth-child(odd) td {
              background-color: white;
            }
            thead th span.icon-arrow {
              display: none;
            }
            th:first-child, td:first-child {
              width: 50px;
            }
            th:nth-child(6), td:nth-child(6) {
              width: 100px;
            }
            th:nth-child(7), td:nth-child(7) {
              width: 120px;
            }
            th:nth-child(2), td:nth-child(2) {
              width: 180px;
            }
            th:nth-child(5), td:nth-child(5) {
              width: 100px;
            }
            body {
              font-size: 10px;
              font-family: Arial, sans-serif;
            }
            table, tr, td, th {
              page-break-inside: avoid;
            }
            body {
              zoom: 90%;
            }
            /* Style for detail report */
            .detail-report {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
              margin-bottom: 20px;
              text-align: center;
            }
            .detail-report {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            text-align: center;
            }

            .detail-report th,
            .detail-report td {
            border: 1px solid #000;
            padding: 10px;
            font-weight: bold;
            }

            .detail-report th {
            text-align: center;
            border-bottom: 2px solid #000; /* Dòng kẽ dưới dày hơn cho tiêu đề */
            }

          }
        </style>
      </head>
      <body>
      <h1 id = "haha" >Customer's Orders Statement</h1>
        <div class="watermark">DTH TRACE REPORT</div>
        <table class="detail-report">
          <tr>
            <th>Detail Report</th>
            <th>Component Order Statement</th>
          </tr>
          <tr>
            <td>Raised Date</td>
            <td>${printDate}</td>
          </tr>
          <tr>
            <td>Approval</td>
            <td>Commited</td>
          </tr>
        </table>
        <main class="table" id="customers_table">${modifiedTable}</main>
      </body>
      </html>`;

    const new_window = window.open();
    new_window.document.write(html_code);

    setTimeout(() => {
      new_window.print();
      new_window.close();
    }, 400);
  };

  pdf_btn.onclick = () => {
    toPDF(customers_table);
  };
});
