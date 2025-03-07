window.geotab.addin.plowStatus = {
    initialize(api, state, addinReady) {
        console.log("Plow Status Add-in Initialized");
        addinReady();
    },
    focus(api, state) {
        console.log("Plow Status Add-in Focused");

        // Ensure the container is visible
        document.getElementById("plowStatusContainer").style.display = "block";

        window.updatePlowStatus = async function () {
            try {
                // Fetch all vehicles with Aux 6 or Third-party Aux 6 ON
                const data = await api.call("GetFeed", {
                    typeName: "StatusData",
                    search: {
                        diagnosticSearch: {
                            id: ["Aux6", "ThirdPartyAux6"] // Checking for both Aux 6 and Third-party Aux 6
                        }
                    }
                });
                
                // Filter vehicles where Aux 6 or Third-party Aux 6 is ON (value === 1)
                const activeVehicles = data.data.filter(item => item.value === 1);
                
                // Display results
                const statusElement = document.getElementById("status");
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
