function handleFileDownload() {
    var fileName = "BillReport.xlsx";
  
    var folderPath = "Design"; // Path to the folder
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
  