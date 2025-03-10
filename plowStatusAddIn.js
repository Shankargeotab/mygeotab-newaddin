window.geotab.addin.plowStatus = {
    initialize(api, state, addinReady) {
        console.log("Plow Status Add-in Initialized");
        addinReady();
    },
    focus(api, state) {
        console.log("Plow Status Add-in Focused");

        let container = document.getElementById("plowStatusContainer");
        if (container) {
            container.style.display = "block";
            container.style.visibility = "visible";
            container.style.opacity = "1";
            console.log("Container is now visible!");
        } else {
            console.error("Container NOT FOUND! Check index.html");
            return;
        }

        document.getElementById("status").innerText = "Loading plow status...";

        window.updatePlowStatus = async function () {
            console.log("updatePlowStatus() function called!");

            try {
                const data = await api.call("Get", {
                    typeName: "StatusData",
                    search: {
                        diagnosticSearch: { id: ["Aux6", "ThirdPartyAux6"] }
                    }
                });

                if (!data || !data.length) {
                    console.warn("No status data received from Geotab API.");
                    document.getElementById("status").innerText = "No vehicles with Plow ON.";
                    return;
                }

                const activeVehicles = data.filter(item => item.value === 1);
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

        window.updatePlowStatus();
    },
    blur(api, state) {
        console.log("Plow Status Add-in Blurred");
        // Remove hiding logic to keep it visible
    }
};
