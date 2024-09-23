// Get elements
const taskButtons3 = document.querySelectorAll("#task_button3");
const popup3 = document.getElementById("popup3");
const closePopupBtn3 = document.getElementById("closePopupBtn3");

// Add event listener to task buttons
taskButtons3.forEach((button) => {
  button.addEventListener("click", function () {
    popup3.style.display = "flex"; // Show the popup3
  });
});

// Close popup3 when clicking on 'Close' button
closePopupBtn3.addEventListener("click", function () {
  popup3.style.display = "none"; // Hide the popup3
});

// Optional: Close popup3 when clicking outside of it
window.addEventListener("click", function (event) {
  if (event.target === popup3) {
    popup3.style.display = "none"; // Hide the popup3 if clicked outside
  }
});

// // ..........................Upload file3.................................
// Function to show popup3
function showPopup() {
  document.getElementById("popup3").style.display = "block";
}

// Function to close popup3
function closePopup() {
  document.getElementById("popup3").style.display = "none";
}

// Function to handle file3 upload
function handleFileUpload() {
  var fileInput3 = document.createElement("input");
  fileInput3.type = "file";
  fileInput3.style.display = "none";
  document.body.appendChild(fileInput3);

  fileInput3.addEventListener("change", function () {
    var file3 = fileInput3.files[0];
    if (!file3) {
      alert("No file3 selected!");
      return;
    }

    var type3 = "Task_04"; // Modify as needed
    var storage3 = firebase.storage();
    var storageRef3 = storage3.ref();
    var thisRef3 = storageRef3.child(type3).child(file3.name).put(file3);

    thisRef3.on(
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
        thisRef3.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          alert("Uploaded successfully!");
          saveMessage(downloadURL);
        });
      }
    );
  });

  fileInput3.click();
}

// Set up event listeners
document.getElementById("task_button3").addEventListener("click", showPopup);
document.getElementById("closePopupBtn3").addEventListener("click", closePopup);
document
  .getElementById("concludeBtn3")
  .addEventListener("click", handleFileUpload);

// // .................Download file3..................
// Function to handle file3 download
function handleFileDownload() {
  var fileName3 = "TID9162404.docx";

  var folderPath3 = "Task_04"; // Path to the folder
  var storage3 = firebase.storage();
  var storageRef3 = storage3.ref();
  var fileRef3 = storageRef3.child(folderPath3).child(fileName3); // Set path to the file3

  fileRef3
    .getDownloadURL()
    .then(function (url) {
      // Create a link3 element to initiate download
      var link3 = document.createElement("a");
      link3.href = url;
      link3.download = fileName3; // Suggest filename for download
      document.body.appendChild(link3);
      link3.click();
      document.body.removeChild(link3);
    })
    .catch(function (error) {
      // Handle errors
      console.error("Download error:", error);
      alert("Error downloading file3: " + error.message);
    });
}

// Set up event listener for GET ISSUE button
document
  .getElementById("getIssueBtn3")
  .addEventListener("click", handleFileDownload);
