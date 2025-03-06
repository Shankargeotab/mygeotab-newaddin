window.geotab.addin.plowStatus = {
    initialize(api, state, addinReady) {
        console.log("Plow Status Add-in Initialized");
        addinReady();
    },
    focus(api, state) {
        console.log("Plow Status Add-in Focused");

        // Add a custom button to the map toolbar
        if (!document.getElementById("plowStatusButton")) {
            const button = document.createElement("button");
            button.id = "plowStatusButton";
            button.innerText = "Show Plow Status";
            button.style.padding = "10px";
            button.style.margin = "5px";
            button.style.cursor = "pointer";
            button.style.background = "#0078D4";
            button.style.color = "white";
            button.style.border = "none";
            button.style.borderRadius = "5px";

            // Append button to the map toolbar
            document.querySelector(".geotabMapToolbar")?.appendChild(button);

            // Attach click event
            button.addEventListener("click", window.updatePlowStatus);
        }

        // Ensure function is globally accessible
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

                if (activeVehicles.length === 0) {
                    alert("No vehicles with Plow ON. Not plowing now.");
                } else {
                    let vehicleList = "Vehicles with Plow ON:\n";
                    activeVehicles.forEach(item => {
                        vehicleList += `Vehicle ID: ${item.device.id}\n`;
                    });
                    alert(vehicleList);
                }
            } catch (error) {
                console.error("Error fetching plow status:", error);
                alert("Error loading plow status.");
            }
        };
    }
};
