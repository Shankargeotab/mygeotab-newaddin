window.geotab = window.geotab || {};
window.geotab.addin = window.geotab.addin || {};

window.geotab.addin.plowStatus = {
  initialize(api, state, addinReady) {
    console.log("✅ Plow Status Add-in Initialized");
    addinReady();
  },

  focus(api, state) {
    console.log("🔵 Plow Status Add-in Focused");

    const container = document.getElementById("plowStatusContainer");
    const statusElement = document.getElementById("status");
    const refreshBtn = document.getElementById("refreshBtn");

    if (!container || !statusElement || !refreshBtn) {
      console.error("❌ One or more DOM elements not found.");
      return;
    }

    const updatePlowStatus = async () => {
      try {
        const data = await api.call("Get", {
          typeName: "StatusData",
          search: {
            diagnosticSearch: {
              id: [
                "DiagnosticAux6Id",
                "DiagnosticThirdPartyAux6Id",
                "DiagnosticIgnitionId"
              ]
            }
          }
        });

        const ignitionData = data.find(item => item.diagnostic.id === "DiagnosticIgnitionId");
        const auxData = data.filter(item =>
          item.diagnostic.id === "DiagnosticAux6Id" ||
          item.diagnostic.id === "DiagnosticThirdPartyAux6Id"
        );

        if (!ignitionData || auxData.length === 0) {
          statusElement.innerText = "⚠️ Data missing or incomplete.";
          return;
        }

        const ignitionOn = ignitionData.value === 1;
        const activeVehicles = auxData.filter(item => item.value === 1 && ignitionOn);

        if (activeVehicles.length === 0) {
          statusElement.innerText = "❌ No vehicles with Plow ON and Ignition ON.";
        } else {
          let vehicleList = "<strong>✅ Vehicles with Plow ON and Ignition ON:</strong><br>";
          activeVehicles.forEach(item => {
            vehicleList += `Vehicle ID: ${item.device.id} <br>`;
          });
          statusElement.innerHTML = vehicleList;
        }
      } catch (error) {
        console.error("❌ Error fetching plow status:", error);
        statusElement.innerText = "⚠️ Error loading plow status.";
      }
    };

    refreshBtn.onclick = updatePlowStatus;
    updatePlowStatus();
  },

  blur(api, state) {
    console.log("🟡 Plow Status Add-in Blurred");
    // Optionally hide or reset the container here
  }
};

