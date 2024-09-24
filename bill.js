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
        <td><strong>${formatNumber(
          totalQuantity
        )}</strong></td> <!-- Định dạng lại số -->
        <td><strong>${formatNumber(
          totalPrices
        )}</strong></td> <!-- Định dạng lại số -->
      </tr>
    `;

    const modifiedTable = customers_table.innerHTML.replace(
      /(<\/tbody>)/,
      totalRow + "$1"
    );

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
          img, .input-group, .export__file {
            display: none !important;
          }
          .watermark {
            position: fixed; /* Đặt dấu chìm cố định */
            top: 50%;
            left: 50%;
             transform: translate(-50%, -50%) rotate(-30deg); /* Dịch chuyển và nghiêng 30 độ */
            font-size: 100px; /* Kích thước chữ của dấu chìm */
            color: rgba(0, 0, 0, 0.1); /* Màu sắc và độ trong suốt của dấu chìm */
            white-space: nowrap; /* Không cho xuống dòng */
            pointer-events: none; /* Không ảnh hưởng đến tương tác với bảng */
            z-index: -1; /* Đưa dấu chìm ra phía sau */
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
            border: 1px solid #000;
            table-layout: fixed; /* Cố định kích thước bảng */
          }
          th, td {
            padding: 10px;
            border: 1px solid #000;
            color: black;
            text-align: center; /* Căn giữa theo chiều ngang */
            vertical-align: middle; /* Căn giữa theo chiều dọc */
            word-wrap: break-word; /* Tự động xuống dòng nếu quá dài */
            word-break: break-all;  /* Ngắt từ nếu không vừa */
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
          /* Điều chỉnh chiều rộng cho cột Quantity */
          th:nth-child(6), td:nth-child(6) {
            width: 100px; /* Hẹp lại cho cột Quantity */
          }
          /* Điều chỉnh chiều rộng cho cột Quantity */
          th:nth-child(7), td:nth-child(7) {
            width: 120px; /* Hẹp lại cho cột Quantity */
          }
          th:nth-child(2), td:nth-child(2) {
            width: 180px; /* Hẹp lại cho cột Quantity */
          }
          th:nth-child(5), td:nth-child(5) {
            width: 100px; /* Hẹp lại cho cột Quantity */
          }
          body {
            font-size: 10px;
            font-family: Arial, sans-serif;
          }
          table, tr, td, th {
            page-break-inside: avoid; /* Ngăn không cho bảng bị cắt khi in */
          }
          body {
            zoom: 90%;
          }
        }
      </style>
    </head>
    <body>
      <div class="watermark">DTH TRACE REPORT</div> <!-- Phần tử dấu chìm -->
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
