window.geotab.addin.plowStatus = (api, state) => {
    return {
        initialize: function () {
            console.log("Plow Status Add-in Initialized");
        },
        focus: function () {
            console.log("Plow Status Add-in Focused");

            // Ensure the container is always visible
            let container = document.getElementById("plowStatusContainer");
            if (!container) {
                container = document.createElement("div");
                container.id = "plowStatusContainer";
                container.style.position = "absolute";
                container.style.top = "50px";
                container.style.right = "10px";
                container.style.width = "250px";
                container.style.height = "200px";
                container.style.backgroundColor = "white";
                container.style.border = "1px solid black";
                container.style.padding = "10px";
                container.style.zIndex = "1000";
                document.body.appendChild(container);
            }

            container.innerHTML = `<h3>Plow Status</h3><p id="status">Loading...</p>`;

            // Fetch Plow Status
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

                    let statusElement = document.getElementById("status");
                    if (activeVehicles.length === 0) {
                        statusElement.innerText = "No plows active.";
                    } else {
                        statusElement.innerHTML = "<strong>Plows Active:</strong><br>";
                        activeVehicles.forEach(item => {
                            statusElement.innerHTML += `Vehicle ID: ${item.device.id} <br>`;
                        });
                    }
                } catch (error) {
                    console.error("Error fetching plow status:", error);
                    document.getElementById("status").innerText = "Error loading plow status.";
                }
            };

            // Ensure it updates after loading
            window.updatePlowStatus();
        }
    };
};
