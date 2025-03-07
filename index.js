window.geotab.addin.plowStatus = {
    initialize(api, state, addinReady) {
        console.log("✅ Plow Status Add-in Initialized");

        // Ensure function is globally accessible for map toolbar button
        window.updatePlowStatus = async function () {
            try {
                console.log("🔍 Fetching Plow Status Data...");
                
                // Fetch all vehicles with Aux 6 or Third-party Aux 6 ON
                const data = await api.call("GetFeed", {
                    typeName: "StatusData",
                    search: {
                        diagnosticSearch: {
                            id: ["Aux6", "ThirdPartyAux6"] // Checking for both Aux 6 and Third-party Aux 6
                        }
                    }
                });

                console.log("✅ Data Received:", data);

                // Ensure status container exists before modifying it
                const statusElement = document.getElementById("status");
                if (!statusElement) {
                    console.error("❌ Status element not found in DOM!");
                    return;
                }

                // Filter vehicles where Aux 6 or Third-party Aux 6 is ON (value === 1)
                const activeVehicles = data.data.filter(item => item.value === 1);
                
                // Display results
                if (activeVehicles.length === 0) {
                    statusElement.innerText = "No vehicles with Plow ON. Not plowing now.";
                } else {
                    let vehicleList = "<strong>Vehicles with Plow ON:</strong><br>";
                    activeVehicles.forEach(item => {
                        vehicleList += `🚜 Vehicle ID: ${item.device.id} <br>`;
                    });
                    statusElement.innerHTML = vehicleList;
                }
            } catch (error) {
                console.error("❌ Error fetching plow status:", error);
                document.getElementById("status").innerText = "Error loading plow status.";
            }
        };

        addinReady();
    },

    focus(api, state) {
        console.log("✅ Plow Status Add-in Focused");

        // Ensure container exists before modifying it
        const container = document.getElementById("plowStatusContainer");
        if (container) {
            container.style.display = "block";
        } else {
            console.error("❌ plowStatusContainer element not found!");
        }

        // Ensure status message element exists
        const statusElement = document.getElementById("status");
        if (statusElement) {
            statusElement.innerText = "Plow Status Add-in Loaded!";
        } else {
            console.error("❌ Status element not found!");
        }

        // Call update function when the Add-in is focused
        window.updatePlowStatus();
    }
};

