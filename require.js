document.getElementById("overview-btn").addEventListener("click", function () {
  document.getElementById("content").innerHTML = `
        <table class="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>System Feature</th>
                    <th>Description</th>
                    <th>Main Component</th>
                    <th>Detail</th>
                    <th>Method</th>
                    <th>Work State</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>01</td>
                    <td>Collect data</td>
                    <td>Collect data from sensors</td>
                    <td>Sensor</td>
                    <td>Data on aquaculture</td>
                    <td>Read and Trace</td>
                    <td><button id="state_1">Available</button></td>
                  </tr>
                  <tr class="active">
                    <td>02</td>
                    <td>Monitor data</td>
                    <td>Monitor data and set action</td>
                    <td>Actuator</td>
                    <td>Set action for actuator</td>
                    <td>Trace</td>
                    <td><button id="state_2">Available</button></td>
                  </tr>
                  <tr>
                    <td>03</td>
                    <td>Interconnect</td>
                    <td>Communication between stations</td>
                    <td>LoRa</td>
                    <td>LoRa Module</td>
                    <td>Wireless</td>
                    <td><button id="state_3">Available</button></td>
                  </tr>
                  <tr>
                    <td>04</td>
                    <td>Control</td>
                    <td>Control actuator from a far</td>
                    <td>WiFi/LoRa/Manual</td>
                    <td>Communication</td>
                    <td>Wire & Wireless</td>
                    <td><button id="state_4">Available</button></td>
                  </tr>
                </tbody>
              </table>
`;

  document.getElementById("attendance_1").innerHTML =
    ' <img src="./img/LORA_1.jpg" alt="" style="width: 50%;"/>';
});

document.getElementById("slave-btn").addEventListener("click", function () {
  document.getElementById("content").innerHTML = `
      
        <table class="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Slave Feature</th>
              <th>Description</th>
              <th>Slave Component</th>
              <th>Detail</th>
              <th>Status</th>
              <th>Work State</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01</td>
              <td>Slave 01</td>
              <td>Collect/Trace/Control/Communication</td>
              <td>LoRa/ESP32</td>
              <td>NA</td>
              <td>0%</td>
              <td><button id="state_1">In Progress</button></td>
            </tr>
            <tr>
              <td>02</td>
              <td>Slave 02</td>
              <td>Collect/Trace/Control/Communication</td>
              <td>LoRa/ESP32</td>
              <td>NA</td>
              <td>0%</td>
              <td><button id="state_1">In Progress</button></td>
            </tr>
          </tbody>
        </table>
   
  
    `;
  document.getElementById("attendance_1").innerHTML =
    ' <img src="./img/LORA_2.jpg" alt="" style="width: 35%;"/>';
});

document.getElementById("master-btn").addEventListener("click", function () {
  document.getElementById("content").innerHTML = `
     
        <table class="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Master Feature2</th>
              <th>Description</th>
              <th>Master Component</th>
              <th>Detail</th>
              <th>Status</th>
              <th>Work State</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01</td>
              <td>Master 01</td>
              <td>Trace/Control/Communication</td>
              <td>LoRa/ESP32</td>
              <td>NA</td>
              <td>0%</td>
              <td><button id="state_1">In Progress</button></td>
            </tr>
        
          </tbody>
        </table>
    
      
    `;
  document.getElementById("attendance_1").innerHTML =
    ' <img src="./img/LORA_3.jpg" alt="" style="width: 35%;" />';
});
function handleFilesDownload() {
  // List of file names to download
  var fileNames = ["Requirement.docx", "SDK.pptx"];
  var folderPath = "Requirement"; // Path to the folder
  var storage = firebase.storage();
  var storageRef = storage.ref();

  // Function to download a single file
  function downloadFile(fileName, delay) {
<<<<<<< HEAD
    setTimeout(function () {
=======
    setTimeout(function() {
>>>>>>> 96076a555bc9b66244659413444a52d6eb8c191f
      var fileRef = storageRef.child(folderPath).child(fileName); // Set path to each file

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
          console.error("Download error for " + fileName + ":", error);
          alert("Error downloading file " + fileName + ": " + error.message);
        });
    }, delay);
  }

  // Start downloading files with increasing delays
  fileNames.forEach(function (fileName, index) {
    downloadFile(fileName, index * 1000); // Delay each download by 1 second
  });
}

// Set up event listener for FETCH BUTTON
document
  .getElementById("fetch-btn")
  .addEventListener("click", handleFilesDownload);

