// Đảm bảo rằng JavaScript chỉ chạy khi toàn bộ DOM đã tải xong
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn việc form gửi dữ liệu và reload trang

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Kiểm tra thông tin đăng nhập
    if (username === "DTH" && password === "DTH") {
      window.location.href = "main.html"; // Điều hướng tới trang chính
    } else {
      alert("Sai Username hoặc Password! Vui lòng thử lại.");
    }
  });
});
