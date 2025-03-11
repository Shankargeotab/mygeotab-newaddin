window.geotab.addin.plowStatus = {
    initialize(api, state, addinReady) {
        try {
            console.log("✅ Plow Status Add-in Initialized");
            addinReady();
        } catch (error) {
            console.error("❌ Error during initialization:", error);
        }
    },
    focus(api, state) {
        try {
            console.log("🔵 Plow Status Add-in Focused");
            let container = document.getElementById("plowStatusContainer");
            if (!container) {
                console.error("❌ Container NOT FOUND! Check index.html");
                return;
            }

            container.style.display = "block";
            container.style.visibility = "visible";
            container.style.opacity = "1";

            let statusElement = document.getElementById("status");
            statusElement.innerText = "🔄 Fetching plow status...";

            console.log("📡 Sending API request to get plow status...");

            window.updatePlowStatus = async function () {
                try {
                    const data = await api.call("Get", {
                        typeName: "StatusData",
                        search: {
                            diagnosticSearch: [
                                { id: "DiagnosticAux6Id" },
                                { id: "DiagnosticThirdPartyAux6Id" },
                                { id: "DiagnosticIgnitionId" }
                            ]
                        }
                    });

                    console.log("📡 API Response:", data);

                    if (!data || data.length < 3) {
                        console.warn("⚠️ Not all status data received from Geotab API.");
                        statusElement.innerText = "Data incomplete.";
                        return;
                    }

                    const ignitionData = data.find(item => item.diagnostic.id === "DiagnosticIgnitionId");
                    const auxData = data.filter(item => 
                        item.diagnostic.id === "DiagnosticAux6Id" || 
                        item.diagnostic.id === "DiagnosticThirdPartyAux6Id"
                    );

                    if (!ignitionData || !auxData || auxData.length === 0) {
                        console.warn("⚠️ Ignition or Aux data not found.");
                        statusElement.innerText = "Data missing.";
                        return;
                    }

                    const ignitionOn = ignitionData.value === 1; // Assuming 1 represents "on"
                    const activeVehicles = auxData.filter(item => item.value === 1 && ignitionOn);

                    console.log("🚜 Active Vehicles with Plow ON and Ignition ON:", activeVehicles);

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

            // Delay API call to ensure Geotab API is fully loaded
            setTimeout(() => {
                window.updatePlowStatus();
            }, 500);
        } catch (error) {
            console.error("❌ Error during focus:", error);
        }
    },
    blur(api, state) {
        console.log("🟡 Plow Status Add-in Blurred - But NOT Hiding it");
    }
};
