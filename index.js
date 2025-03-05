window.geotab.addin.plowStatus = {
    initialize(api, state, addinReady) {
        console.log("Plow Status Add-in Initialized");
        addinReady();
    },
    focus(api, state) {
        console.log("Plow Status Add-in Focused");

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
                const statusElement = document.getElementById("status");

                if (!statusElement) {
                    console.error("Element with ID 'status' not found.");
                    return;
                }

                if (activeVehicles.length === 0) {
                    statusElement.innerText = "No vehicles with Plow ON. Not plowing now.";
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
        };

        // Call the function automatically when the Add-in loads
        window.updatePlowStatus();
    }
};
