window.geotab.addin.plowStatus = (function () {
    return {
        initialize(api, state, addinReady) {
            console.log("✅ Plow Status Add-in Initialized");
            addinReady();
        },

        focus(api, state) {
            console.log("🎯 Plow Status Add-in Focused");

            function createPanel() {
                let container = document.getElementById("plowStatusContainer");

                if (!container) {
                    let sidePanel = document.querySelector('.side-panel-content');
                    if (!sidePanel) {
                        console.error("❌ Side panel not found! Can't attach add-in.");
                        return;
                    }

                    container = document.createElement("div");
                    container.id = "plowStatusContainer";
                    container.style.background = "white";
                    container.style.padding = "15px";
                    container.style.borderTop = "2px solid black";
                    container.style.zIndex = "1000";
                    container.style.boxShadow = "2px 2px 10px rgba(0,0,0,0.2)";
                    container.style.fontFamily = "Arial, sans-serif";
                    container.innerHTML = `
                        <h2>Plow Status</h2>
                        <p id="status">Fetching status...</p>
                        <button id="updatePlowStatusButton" style="margin-top: 10px; padding: 5px 10px; cursor: pointer;">Refresh Status</button>
                    `;
                    
                    sidePanel.appendChild(container);
                    console.log("📌 Plow Status Container Added to Side Panel");

                    document.getElementById("updatePlowStatusButton").addEventListener("click", window.updatePlowStatus);
                }

                container.style.display = "block";
                container.style.visibility = "visible";
                container.style.opacity = "1";
            }

            // Ensure add-in stays visible
            createPanel();
            setInterval(createPanel, 2000);

            window.updatePlowStatus = async function () {
                console.log("🔄 updatePlowStatus() function called!");

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
                    console.error("⚠️ Error fetching plow status:", error);
                    document.getElementById("status").innerText = "Error loading plow status.";
                }
            };

            window.updatePlowStatus();
        },

        blur() {
            console.log("Plow Status Add-in Blurred");
        }
    };
})();
