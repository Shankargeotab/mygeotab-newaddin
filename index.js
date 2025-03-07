window.geotab.addin.plowStatus = {
    initialize(api, state, addinReady) {
        console.log("Plow Status Add-in Initialized");
        addinReady();  // Notify MyGeotab that the add-in is ready
    },
    focus(api, state) {
        console.log("Plow Status Add-in Focused");

        // Ensure UI elements are visible
        document.getElementById("plowStatusContainer").style.display = "block";

        window.updatePlowStatus = async function () {
            try {
                const data = await api.call("GetFeed", {
                    typeName: "StatusData",
                    search: {
                        diagnosticSearch: {
                            id: ["Aux6", "ThirdPartyAux6"]
                        }
                    }
                });

                const activeVehicles = data.data.filter(item => item.value === 1);

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

        window.updatePlowStatus();
    },
    blur() {
        console.log("Plow Status Add-in Blurred");
        document.getElementById("plowStatusContainer").style.display = "none"; // Hide Add-in when not focused
    }
};

