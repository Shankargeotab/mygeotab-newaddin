 * The function is called whenever the Add-In button is clicked.
 *
 * @param {object} api - The GeotabApi object for making calls to MyGeotab.
 * @param {object} state - The page state object allows access to URL, page navigation, and global group filter.
 */
window.geotab.addin.plowStatusAddIn = function(api, state) {
  return {
    initialize: function(api, state, addinReady) {
      console.log("Plow Status Add-in Initialized");
      addinReady();
    },

    focus: function(api, state) {
      console.log("Plow Status Add-in Focused");

      // Attach button to the map toolbar if not already added
      let toolbar = document.querySelector(".leaflet-bar");
      if (toolbar && !document.getElementById("plowStatusToolbarButton")) {
        let button = document.createElement("button");
        button.id = "plowStatusToolbarButton";
        button.innerText = "Check Plow Status";
        button.style.padding = "5px";
        button.style.cursor = "pointer";

        button.onclick = function () {
          document.getElementById("plowStatusAddIn-app").style.display = "block";
          updatePlowStatus();
        };

        toolbar.appendChild(button);
      }

      // Function to fetch and update plow status
      async function updatePlowStatus() {
        try {
          const data = await api.call("GetFeed", {
            typeName: "StatusData",
            search: {
              diagnosticSearch: {
                id: ["Aux6", "ThirdPartyAux6"] // Checking for both Aux 6 and Third-party Aux 6
              }
            }
          });

          const activeVehicles = data.data.filter(item => item.value === 1);
          
          const statusElement = document.getElementById("status");
          if (activeVehicles.length === 0) {
            statusElement.innerText = "No vehicles with Plow ON.";
          } else {
            let vehicleList = "<strong>Vehicles with Plow ON:</strong><br>";
            activeVehicles.forEach(item => {
              vehicleList += `Vehicle ID: ${item.device.id} <br>`;
            });
            statusElement.innerHTML = vehicleList;
          }
        } catch (error) {
          console.error("Error fetching plow status:", error);
          document.getElementById("status").innerText = "Error loading plow status.";
        }
      }
      
      // Run the function when the Add-in loads
      updatePlowStatus();
    }
  };
};
