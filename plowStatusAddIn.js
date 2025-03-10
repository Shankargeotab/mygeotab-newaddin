window.geotab.addin.plowStatus = {
    initialize(api, state, addinReady) {
        console.log("✅ Plow Status Add-in Initialized");
        addinReady();
    },
    
    focus(api, state) {
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

        // 🛠️ Add Debugging Log for API Request
        console.log("📡 Sending API request to get plow status...");

        window.updatePlowStatus = async function () {
            try {
                const data = await api.call("Get", {
                    typeName: "StatusData",
                    search: {
                        diagnosticSearch: { id: ["Aux6", "ThirdPartyAux6"] }
                    }
                });

                console.log("📡 API Response:", data); // 🛠️ Debugging: Print full response

                if (!data || !data.length) {
                    console.warn("⚠️ No status data received from Geotab API.");
                    statusElement.innerText = "No vehicles with Plow ON.";
                    return;
                }

                const activeVehicles = data.filter(item => item.value === 1);
                console.log("🚜 Active Vehicles with Plow ON:", activeVehicles);

                if (activeVehicles.length === 0) {
                    statusElement.innerText = "❌ No vehicles with Plow ON.";
                } else {
                    let vehicleList = "<strong>✅ Vehicles with Plow ON:</strong><br>";
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

        window.updatePlowStatus();
    },

    blur(api, state) {
        console.log("🟡 Plow Status Add-in Blurred - But NOT Hiding it");
    }
};
