// Get elements
const taskButtons2 = document.querySelectorAll("#task_button2");
const popup2 = document.getElementById("popup2");
const closePopupBtn2 = document.getElementById("closePopupBtn2");

// Add event listener to task buttons
taskButtons2.forEach((button) => {
  button.addEventListener("click", function () {
    popup2.style.display = "flex"; // Show the popup2
  });
});

// Close popup2 when clicking on 'Close' button
closePopupBtn2.addEventListener("click", function () {
  popup2.style.display = "none"; // Hide the popup2
});

// Optional: Close popup2 when clicking outside of it
window.addEventListener("click", function (event) {
  if (event.target === popup2) {
    popup2.style.display = "none"; // Hide the popup2 if clicked outside
  }
});

// // ..........................Upload file2.................................
// Function to show popup2
function showPopup() {
  document.getElementById("popup2").style.display = "block";
}

// Function to close popup2
function closePopup() {
  document.getElementById("popup2").style.display = "none";
}

// Function to handle file2 upload
function handleFileUpload() {
  var fileInput2 = document.createElement("input");
  fileInput2.type = "file";
  fileInput2.style.display = "none";
  document.body.appendChild(fileInput2);

  fileInput2.addEventListener("change", function () {
    var file2 = fileInput2.files[0];
    if (!file2) {
      alert("No file2 selected!");
      return;
    }

    var type2 = "Task_03"; // Modify as needed
    var storage2 = firebase.storage();
    var storageRef2 = storage2.ref();
    var thisRef2 = storageRef2.child(type2).child(file2.name).put(file2);

    thisRef2.on(
      "state_changed",
      function (snapshot) {
        // Track upload progress if needed
      },
      function (error) {
        // Handle unsuccessful uploads
        console.error("Upload error:", error);
      },
      function () {
        // Handle successful uploads
        thisRef2.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          alert("Uploaded successfully!");
          saveMessage(downloadURL);
        });
      }
    );
  });

  fileInput2.click();
}

// Set up event listeners
document.getElementById("task_button2").addEventListener("click", showPopup);
document.getElementById("closePopupBtn2").addEventListener("click", closePopup);
document
  .getElementById("concludeBtn2")
  .addEventListener("click", handleFileUpload);

// // .................Download file2..................
// Function to handle file2 download
function handleFileDownload() {
  var fileName2 = "TID9232401.rar";

  var folderPath2 = "Task_03"; // Path to the folder
  var storage2 = firebase.storage();
  var storageRef2 = storage2.ref();
  var fileRef2 = storageRef2.child(folderPath2).child(fileName2); // Set path to the file2

  fileRef2
    .getDownloadURL()
    .then(function (url) {
      // Create a link2 element to initiate download
      var link2 = document.createElement("a");
      link2.href = url;
      link2.download = fileName2; // Suggest filename for download
      document.body.appendChild(link2);
      link2.click();
      document.body.removeChild(link2);
    })
    .catch(function (error) {
      // Handle errors
      console.error("Download error:", error);
      alert("Error downloading file2: " + error.message);
    });
}

// Set up event listener for GET ISSUE button
document
  .getElementById("getIssueBtn2")
  .addEventListener("click", handleFileDownload);

document.getElementById("verifyBtn2").addEventListener("click", function () {
  // Hiển thị hộp thoại nhập số
  const inputNumber = prompt("Please enter a number:");

  // Kiểm tra nếu người dùng đã nhập số
  if (inputNumber !== null) {
    const number = parseInt(inputNumber, 10); // Chuyển đổi sang số nguyên

    // Kiểm tra xem số nhập vào có bằng 123 không
    if (number === 161106101010) {
      alert("Your progress is done."); // Hiển thị thông báo
      const taskRef = firebase.database().ref("Task3_STT"); // Đường dẫn tới dữ liệu

      taskRef
        .set(1) // Thiết lập giá trị là 0
        .catch((error) => {
          console.error("Error setting value:", error); // Xử lý lỗi nếu có
        });
    } else {
      alert("The number you entered is incorrect."); // Thông báo số sai
    }
    document.getElementById("popup2").style.display = "none"; // Ẩn popup
  }
});

// Giả sử bạn đã cấu hình Firebase và có một biến database để truy cập Realtime Database
const database = firebase.database();

function updateTaskStatus() {
  const taskRef = database.ref("Task3_STT"); // Đường dẫn tới dữ liệu

  taskRef
    .once("value")
    .then((snapshot) => {
      const statusValue = snapshot.val(); // Lấy giá trị từ snapshot

      // Cập nhật văn bản và màu sắc của Task3_status dựa vào giá trị
      let statusText;
      let statusColor;

      switch (statusValue) {
        case 3:
          statusText = "COMPLETED";
          statusColor = "green"; // Màu xanh lá
          break;
        case 0:
          statusText = "NEW";
          statusColor = "purple"; // Màu tím
          break;
        case 1:
          statusText = "INPROGRESS";
          statusColor = "blue"; // Màu xanh dương
          break;
        case 2:
          statusText = "REWORK";
          statusColor = "red"; // Màu đỏ
          break;
        default:
          statusText = "UNKNOWN"; // Nếu không thuộc các trường hợp trên
          statusColor = "black"; // Màu đen cho giá trị không xác định
      }

      // Cập nhật văn bản và màu sắc
      const taskStatusElement = document.getElementById("Task3_status");
      taskStatusElement.innerText = statusText;
      taskStatusElement.style.color = statusColor; // Đặt màu chữ
      taskStatusElement.style.fontWeight = "bold"; // Chữ đậm
    })
    .catch((error) => {
      console.error("Error getting data:", error);
    });
}

// Gọi hàm để cập nhật trạng thái
updateTaskStatus();
