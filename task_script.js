// Get elements
const taskButtons = document.querySelectorAll("#task_button");
const popup = document.getElementById("popup");
const closePopupBtn = document.getElementById("closePopupBtn");

// Add event listener to task buttons
taskButtons.forEach((button) => {
  button.addEventListener("click", function () {
    popup.style.display = "flex"; // Show the popup
  });
});

// Close popup when clicking on 'Close' button
closePopupBtn.addEventListener("click", function () {
  popup.style.display = "none"; // Hide the popup
});

// Optional: Close popup when clicking outside of it
window.addEventListener("click", function (event) {
  if (event.target === popup) {
    popup.style.display = "none"; // Hide the popup if clicked outside
  }
});

// // ..........................Upload file.................................
// Function to show popup
function showPopup() {
  document.getElementById("popup").style.display = "block";
}

// Function to close popup
function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// Function to handle file upload
function handleFileUpload() {
  var fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.style.display = "none";
  document.body.appendChild(fileInput);

  fileInput.addEventListener("change", function () {
    var file = fileInput.files[0];
    if (!file) {
      alert("No file selected!");
      return;
    }

    var type = "Task_01"; // Modify as needed
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var thisRef = storageRef.child(type).child(file.name).put(file);

    thisRef.on(
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
        thisRef.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          alert("Uploaded successfully!");
          saveMessage(downloadURL);
        });
      }
    );
  });

  fileInput.click();
}

// Save message to Firebase database
function saveMessage(url) {
  var messagesRef = firebase.database().ref("Checking");
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    imageurl: url,
  });
}

// Set up event listeners
document.getElementById("task_button").addEventListener("click", showPopup);
document.getElementById("closePopupBtn").addEventListener("click", closePopup);
document
  .getElementById("concludeBtn")
  .addEventListener("click", handleFileUpload);

// // .................Download file..................
// Function to handle file download
function handleFileDownload() {
  var fileName = "TID9162401.docx";

  var folderPath = "Task_01"; // Path to the folder
  var storage = firebase.storage();
  var storageRef = storage.ref();
  var fileRef = storageRef.child(folderPath).child(fileName); // Set path to the file

  fileRef
    .getDownloadURL()
    .then(function (url) {
      // Create a link element to initiate download
      var link = document.createElement("a");
      link.href = url;
      link.download = fileName; // Suggest filename for download
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
document
  .getElementById("getIssueBtn")
  .addEventListener("click", handleFileDownload);
