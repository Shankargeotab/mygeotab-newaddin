window.geotab.addin.plowStatus = {
    initialize(api, state, addinReady) {
        console.log("Plow Status Add-in Initialized");
        addinReady();
    },
    focus(api, state) {
        console.log("Plow Status Add-in Focused");

        // Ensure the container exists and is visible
        let container = document.getElementById("plowStatusContainer");
        if (container) {
            container.style.display = "block";
            console.log("Container is now visible!");
        } else {
            console.error("Container NOT FOUND! Check index.html");
            return;
        }

        document.getElementById("status").innerText = "Loading plow status...";

        window.updatePlowStatus = async function () {
            console.log("updatePlowStatus() function called!");

            try {
                const data = await api.call("GetFeed", {
                    typeName: "StatusData",
                    search: {
                        diagnosticSearch: {
                            id: ["Aux6", "ThirdPartyAux6"] // Plow-related diagnostics
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
        };

        // Call the function automatically when the Add-in loads
        window.updatePlowStatus();
    },
    blur() {
        console.log("Plow Status Add-in Blurred");
        let container = document.getElementById("plowStatusContainer");
        if (container) {
            container.style.display = "none";
        }
    }
};

