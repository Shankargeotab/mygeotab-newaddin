window.geotab.addin.plowStatus = {
    initialize(api, state, addinReady) {
        console.log("Plow Status Add-in Initialized");
        addinReady();
    },
    focus(api, state) {
        console.log("Plow Status Add-in Focused");

        // Function to fetch and display plow status in the Map Panel
        window.updatePlowStatus = async function () {
            console.log("Fetching plow status...");
            try {
                const data = await api.call("GetFeed", {
                    typeName: "StatusData",
                    search: {
                        diagnosticSearch: {
                            id: ["Aux6", "ThirdPartyAux6"]
                        }
                    }
                });

                console.log("API response:", data);
                const activeVehicles = data.data.filter(item => item.value === 1);
                let statusPanel = document.getElementById("plowStatusPanel");

                if (!statusPanel) {
                    statusPanel = document.createElement("div");
                    statusPanel.id = "plowStatusPanel";
                    statusPanel.style.position = "absolute";
                    statusPanel.style.top = "50px";
                    statusPanel.style.right = "10px";
                    statusPanel.style.padding = "10px";
                    statusPanel.style.background = "white";
                    statusPanel.style.border = "1px solid #ccc";
                    statusPanel.style.boxShadow = "2px 2px 10px rgba(0, 0, 0, 0.1)";
                    document.body.appendChild(statusPanel);
                }

                if (activeVehicles.length === 0) {
                    statusPanel.innerHTML = "<strong>No vehicles with Plow ON. Not plowing now.</strong>";
                } else {
                    let vehicleList = "<strong>Vehicles with Plow ON:</strong><br>";
                    activeVehicles.forEach(item => {
                        vehicleList += `Vehicle ID: ${item.device.id} <br>`;
                    });
                    statusPanel.innerHTML = vehicleList;
                }
            } catch (error) {
                console.error("Error fetching plow status:", error);
                alert("Error loading plow status.");
            }
        };

        // Automatically update the Plow Status on map load
        window.updatePlowStatus();
    }
};
