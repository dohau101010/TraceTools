document.addEventListener("DOMContentLoaded", function () {
  const saokeButton = document.getElementById("saoke");

  saokeButton.addEventListener("click", function () {
    // Chuyển đến trang mới
    window.open("bill.html", "_blank"); // Thay "ten_trang_moi.html" bằng đường dẫn trang mới
  });
});

document
  .getElementById("work-product-box")
  .addEventListener("click", function () {
    document.getElementById("work-item-popup").style.display = "flex"; // Hiện popup
  });

document.getElementById("close-popup").addEventListener("click", function () {
  document.getElementById("work-item-popup").style.display = "none"; // Đóng popup
});

document.getElementById("request-btn").addEventListener("click", function () {
  document.getElementById("file-input").click(); // Mở hộp thoại chọn file
});
document
  .getElementById("file-input")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) {
      alert("Vui lòng chọn một file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target.result; // Dữ liệu gốc
      uploadFile(file); // Tải lên file gốc
    };
    reader.readAsArrayBuffer(file); // Đọc file dưới dạng ArrayBuffer
  });

// Hàm tải lên Firebase
function uploadFile(file) {
  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child(`Design/${file.name}`); // Sử dụng tên tệp gốc

  // Hiển thị thông báo tải lên
  document.getElementById("upload-status").style.display = "block";

  const uploadTask = fileRef.put(file); // Tải lên file

  uploadTask.on(
    "state_changed",
    function (snapshot) {
      // Theo dõi tiến trình tải lên
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    function (error) {
      console.error("Error uploading file:", error);
      document.getElementById("upload-status").style.display = "none"; // Ẩn thông báo tải lên
      alert("Có lỗi xảy ra khi tải lên: " + error.message);
    },
    function () {
      // Tải lên hoàn tất
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log("File available at", downloadURL);
        document.getElementById("upload-status").style.display = "none"; // Ẩn thông báo tải lên
        alert("Request Successful, Get a Power File now!"); // Hiển thị thông báo
        document.getElementById("close-popup").click(); // Đóng popup
      });
    }
  );
}

// Down file...........................................................
document.getElementById("fetch-btn").addEventListener("click", function () {
  fetchFile();
});

function fetchFile() {
  const invoiceRef = firebase.storage().ref().child("Design/Invoice.pdf");

  // Kiểm tra xem file Invoice.pdf có tồn tại không
  invoiceRef
    .getDownloadURL()
    .then(function () {
      // Nếu tồn tại, tiếp tục tải file CERT.txt
      const certRef = firebase.storage().ref().child("Design/CERT.txt");
      const statusBar = document.createElement("div");
      statusBar.id = "status-bar";
      statusBar.style.width = "100%";
      statusBar.style.height = "5px";
      statusBar.style.backgroundColor = "blue";
      document.body.appendChild(statusBar);

      certRef
        .getDownloadURL()
        .then(function (url) {
          const link = document.createElement("a");
          link.href = url;
          link.download = "CERT.txt"; // Đặt tên file khi tải xuống
          document.body.appendChild(link);
          link.click(); // Tự động click để tải file
          document.body.removeChild(link);

          // Cập nhật thanh trạng thái
          statusBar.style.width = "100%"; // Hoàn thành tải xuống
          alert("File has been downloaded successfully!"); // Thông báo khi tải xong
        })
        .catch(function (error) {
          console.error("Error fetching CERT.txt:", error);
          alert("Error fetching CERT.txt: " + error.message); // Thông báo lỗi
        })
        .finally(function () {
          // Ẩn thanh trạng thái sau khi hoàn thành
          setTimeout(() => {
            document.body.removeChild(statusBar);
          }, 2000); // Ẩn sau 2 giây
        });
    })
    .catch(function () {
      // Nếu file Invoice.pdf không tồn tại
      alert("You do not have permission for this decision!");
    });
}

// .........................................................

function handleFileDownload() {
  var fileRef = firebase.storage().ref().child("Design/Invoice.pdf");

  fileRef
    .getDownloadURL()
    .then(function (url) {
      // Create a link element to initiate download
      var link = document.createElement("a");
      link.href = url;
      link.download = "Invoice.pdf"; // Suggest filename for download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(function (error) {
      // Handle errors
      console.error("Download error:", error);
      alert("Error downloading file: " + error.message);
    });
}

// Set up event listener for GET ISSUE button
document.getElementById("saoke1").addEventListener("click", handleFileDownload);
