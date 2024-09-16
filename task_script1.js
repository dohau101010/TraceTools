// Get elements
const taskButtons1 = document.querySelectorAll("#task_button1");
const popup1 = document.getElementById("popup1");
const closePopupBtn1 = document.getElementById("closePopupBtn1");

// Add event listener to task buttons
taskButtons1.forEach((button) => {
  button.addEventListener("click", function () {
    popup1.style.display = "flex"; // Show the popup1
  });
});

// Close popup1 when clicking on 'Close' button
closePopupBtn1.addEventListener("click", function () {
  popup1.style.display = "none"; // Hide the popup1
});

// Optional: Close popup1 when clicking outside of it
window.addEventListener("click", function (event) {
  if (event.target === popup1) {
    popup1.style.display = "none"; // Hide the popup1 if clicked outside
  }
});

// // ..........................Upload file1.................................
// Function to show popup1
function showPopup() {
  document.getElementById("popup1").style.display = "block";
}

// Function to close popup1
function closePopup() {
  document.getElementById("popup1").style.display = "none";
}

// Function to handle file1 upload
function handleFileUpload() {
  var fileInput1 = document.createElement("input");
  fileInput1.type = "file";
  fileInput1.style.display = "none";
  document.body.appendChild(fileInput1);

  fileInput1.addEventListener("change", function () {
    var file1 = fileInput1.files[0];
    if (!file1) {
      alert("No file1 selected!");
      return;
    }

    var type1 = "Task_02"; // Modify as needed
    var storage1 = firebase.storage();
    var storageRef1 = storage1.ref();
    var thisRef1 = storageRef1.child(type1).child(file1.name).put(file1);

    thisRef1.on(
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
        thisRef1.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          alert("Uploaded successfully!");
          saveMessage(downloadURL);
        });
      }
    );
  });

  fileInput1.click();
}

// Set up event listeners
document.getElementById("task_button1").addEventListener("click", showPopup);
document.getElementById("closePopupBtn1").addEventListener("click", closePopup);
document
  .getElementById("concludeBtn1")
  .addEventListener("click", handleFileUpload);

// // .................Download file1..................
// Function to handle file1 download
function handleFileDownload() {
  var fileName1 = "TID9162402.docx";

  var folderPath1 = "Task_02"; // Path to the folder
  var storage1 = firebase.storage();
  var storageRef1 = storage1.ref();
  var fileRef1 = storageRef1.child(folderPath1).child(fileName1); // Set path to the file1

  fileRef1
    .getDownloadURL()
    .then(function (url) {
      // Create a link1 element to initiate download
      var link1 = document.createElement("a");
      link1.href = url;
      link1.download = fileName1; // Suggest filename for download
      document.body.appendChild(link1);
      link1.click();
      document.body.removeChild(link1);
    })
    .catch(function (error) {
      // Handle errors
      console.error("Download error:", error);
      alert("Error downloading file1: " + error.message);
    });
}

// Set up event listener for GET ISSUE button
document
  .getElementById("getIssueBtn1")
  .addEventListener("click", handleFileDownload);
