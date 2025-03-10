window.geotab.addin.plowStatusMap = function(api, state) {
    return {
        initialize: function() {
            console.log("Plow Status Map Add-in Initialized");
        },
        focus: function() {
            console.log("Plow Status Map Add-in Focused");

            // Ensure toolbar exists
            let toolbar = document.querySelector(".leaflet-bar");
            if (!toolbar) {
                console.error("Map toolbar not found!");
                return;
            }

            // Prevent duplicate button creation
            if (document.getElementById("plowStatusButton")) {
                console.warn("Plow Status button already exists!");
                return;
            }

            let plowButton = document.createElement("button");
            plowButton.id = "plowStatusButton";
            plowButton.innerText = "Show Plow Status";
            plowButton.style.padding = "5px";
            plowButton.style.cursor = "pointer";

            plowButton.onclick = function() {
                alert("Fetching Plow Status...");
                state.open("Plow Status Add-in");
            };

            toolbar.appendChild(plowButton);
            console.log("Plow Status button added to map toolbar!");
        },
        blur: function() {
            console.log("Plow Status Map Add-in Blurred");
        }
    };
};
