window.geotab.addin.plowStatus = (function () {
    return {
        initialize(api, state, addinReady) {
            console.log("✅ Plow Status Add-in Initialized");
            addinReady();
        },

        focus(api, state) {
            console.log("🎯 Plow Status Add-in Focused");

            function ensureContainerExists() {
                let container = document.getElementById("plowStatusContainer");

                if (!container) {
                    container = document.createElement("div");
                    container.id = "plowStatusContainer";
                    container.style.position = "absolute";
                    container.style.top = "80px";
                    container.style.right = "20px";
                    container.style.background = "white";
                    container.style.padding = "15px";
                    container.style.border = "2px solid black";
                    container.style.zIndex = "1000";
                    container.style.boxShadow = "2px 2px 10px rgba(0,0,0,0.2)";
                    container.style.fontFamily = "Arial, sans-serif";
                    container.innerHTML = `
                        <h2>Plow Status</h2>
                        <p id="status">Fetching status...</p>
                        <button id="updatePlowStatusButton" style="margin-top: 10px; padding: 5px 10px; cursor: pointer;">Refresh Status</button>
                    `;
                    document.body.appendChild(container);
                    console.log("📌 Plow Status Container Added to DOM");

                    document.getElementById("updatePlowStatusButton").addEventListener("click", window.updatePlowStatus);
                }

                container.style.display = "block";
                container.style.visibility = "visible";
                container.style.opacity = "1";
            }

            // 🔄 Keep checking if the container exists every 2 seconds
            ensureContainerExists();
            setInterval(ensureContainerExists, 2000);

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
                    document.getElementBy
