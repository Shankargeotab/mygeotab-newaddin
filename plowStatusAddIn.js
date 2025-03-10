window.geotab.addin.plowStatus = {
    initialize(api, state, addinReady) {
        console.log("✅ Plow Status Add-in Initialized");
        addinReady();
    },

    focus(api, state) {
        console.log("🎯 Plow Status Add-in Focused");

        let container = document.getElementById("plowStatusContainer");
        if (!container) {
            container = document.createElement("div");
            container.id = "plowStatusContainer";
            container.style.cssText = "position: fixed; bottom: 20px; left: 20px; background: white; padding: 10px; border: 1px solid black; z-index: 10000;";
            container.innerHTML = `
                <h2>Plow Status</h2>
                <p id="status">Fetching status...</p>
                <button id="updatePlowStatusButton">Refresh</button>
            `;
            document.body.appendChild(container);
            document.getElementById("updatePlowStatusButton").addEventListener("click", window.updatePlowStatus);
        }

        container.style.display = "block";

        window.updatePlowStatus = async function () {
            console.log("🔄 Fetching plow status...");

            try {
                const data = await api.call("GetFeed", {
                    typeName: "StatusData",
                    search: {
                        diagnosticSearch: { id: ["Aux6", "ThirdPartyAux6"] }
                    }
                });

                const activeVehicles = data.data.filter(item => item.value === 1);
                document.getElementById("status").innerText = activeVehicles.length 
                    ? `Plows Active: ${activeVehicles.length}` 
                    : "No plows active.";
            } catch (error) {
                console.error("⚠️ Error fetching plow status:", error);
                document.getElementById("status").innerText = "Error fetching status.";
            }
        };

        window.updatePlowStatus();
    },

    blur(api, state) {
        console.log("🔄 Preventing disappearance...");
        let container = document.getElementById("plowStatusContainer");
        if (container) {
            container.style.display = "block"; // Prevent hiding
        }
    }
};
