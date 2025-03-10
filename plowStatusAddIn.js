window.geotab.addin.plowStatus = {
    initialize(api, state, addinReady) {
        console.log("Plow Status Add-in Initialized");
        addinReady();
    },

    focus(api, state) {
        console.log("Plow Status Add-in Focused");

        // Ensure the container exists and is visible
        let container = document.getElementById("plowStatusContainer");
        if (!container) {
            container = document.createElement("div");
            container.id = "plowStatusContainer";
            container.style.position = "absolute";
            container.style.top = "60px";
            container.style.left = "10px";
            container.style.background = "white";
            container.style.padding = "10px";
            container.style.border = "1px solid black";
            container.style.zIndex = "1000";
            container.innerHTML = `<h2>Plow Status</h2><p id="status">Fetching status...</p>`;
            document.body.appendChild(container);
        } else {
            container.style.display = "block";
            container.style.visibility = "visible";
            container.style.opacity = "1";
        }

        console.log("Container is now visible!");

        // Fetch plow status data
        window.updatePlowStatus = async function () {
            console.log("updatePlowStatus() function called!");

            try {
                const data = await api.call("GetFeed", {
                    typeName: "StatusData",
                    search: {
                        diagnosticSearch: { id: ["Aux6", "ThirdPartyAux6"] }
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

        window.updatePlowStatus();
    },

    blur() {
        console.log("Plow Status Add-in Blurred - **Not hiding the UI anymore**.");
        // REMOVE the hiding logic so that it does not disappear.
    }
};
