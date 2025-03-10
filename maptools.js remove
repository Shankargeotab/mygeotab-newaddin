(function () {
    window.geotab.addin.plowStatusMap = function (api, state) {
        return {
            initialize: function () {
                console.log("✅ Plow Status Map Add-in Initialized");
            },
            focus: function () {
                console.log("✅ Plow Status Map Add-in Focused");

                // Wait for the map UI to be ready
                setTimeout(() => {
                    let toolbar = document.querySelector(".leaflet-bar");
                    if (!toolbar) {
                        console.error("❌ Toolbar not found!");
                        return;
                    }

                    // Avoid adding the button multiple times
                    if (document.getElementById("plowStatusButton")) return;

                    // Create a toolbar button
                    let plowButton = document.createElement("button");
                    plowButton.id = "plowStatusButton";
                    plowButton.innerText = "🚜 Show Plow Status";
                    plowButton.style.padding = "5px";
                    plowButton.style.cursor = "pointer";
                    plowButton.style.backgroundColor = "#0078D4";
                    plowButton.style.color = "white";
                    plowButton.style.border = "none";
                    plowButton.style.borderRadius = "5px";
                    plowButton.style.margin = "5px";

                    // When clicked, update the Plow Status
                    plowButton.onclick = function () {
                        console.log("🟢 Checking Plow Status...");
                        if (window.updatePlowStatus) {
                            window.updatePlowStatus();
                        } else {
                            console.error("❌ updatePlowStatus function not found!");
                        }
                    };

                    toolbar.appendChild(plowButton);
                }, 1000);
            }
        };
    };
})();
