window.geotab = window.geotab || {};
window.geotab.addin = window.geotab.addin || {};

window.geotab.addin.plow_status_addin = {
  initialize(api, state, addinReady) {
    console.log("✅ Plow Status Add-in Initialized");
    addinReady();
  },

  focus(api, state) {
    console.log("🔵 Plow Status Add-in Focused");

    const container   = document.getElementById("plowStatusContainer");
    const statusElem  = document.getElementById("status");
    const refreshBtn  = document.getElementById("refreshBtn");
    if (!container || !statusElem || !refreshBtn) {
      console.error("❌ Missing DOM elements");
      return;
    }

    const updatePlowStatus = async () => {
      try {
        const toDate = new Date();
        const fromDate = new Date(toDate.getTime() - 5 * 60 * 1000);

        const data = await api.call("Get", {
          typeName: "StatusData",
          search: {
            fromDate,
            toDate,
            diagnosticSearch: {
              id: [
                "DiagnosticAux6Id",
                "DiagnosticThirdPartyAux6Id",
                "DiagnosticIgnitionId"
              ]
            }
          }
        });

        const ignData = data.find(d => d.diagnostic.id === "DiagnosticIgnitionId");
        const auxData = data.filter(d =>
          d.diagnostic.id === "DiagnosticAux6Id" ||
          d.diagnostic.id === "DiagnosticThirdPartyAux6Id"
        );

        if (!ignData || auxData.length === 0) {
          statusElem.innerText = "⚠️ Data missing or incomplete.";
          return;
        }

        const ignitionOn     = ignData.value === 1;
        const activeVehicles = auxData.filter(d => d.value === 1 && ignitionOn);

        if (activeVehicles.length === 0) {
          statusElem.innerText = "❌ No vehicles with Plow ON and Ignition ON.";
        } else {
          let html = "<strong>✅ Vehicles with Plow ON and Ignition ON:</strong><br>";
          activeVehicles.forEach(d => {
            html += `Vehicle ID: ${d.device.id}<br>`;
          });
          statusElem.innerHTML = html;
        }
      } catch (e) {
        console.error("❌ Error fetching plow status:", e);
        statusElem.innerText = "⚠️ Error loading plow status.";
      }
    };

    refreshBtn.onclick = updatePlowStatus;
    updatePlowStatus();
  },

  blur(api, state) {
    console.log("🟡 Plow Status Add-in Blurred");
  }
};
