(function () {
    window.geotab.addin.plowStatusMap = function (api, state) {
        return {
            initialize: function () {
                console.log("Plow Status Map Add-in Initialized");
            },
            focus: function () {
                console.log("Plow Status Map Add-in Focused");

                // Create a toolbar button
                let toolbar = document.querySelector(".leaflet-bar");
                if (!toolbar) return;

                let plowButton = document.createElement("button");
                plowButton.innerText = "Show Plow Status";
                plowButton.style.padding = "5px";
                plowButton.style.cursor = "pointer";

                plowButton.onclick = function () {
                    state.open("Plow Status Add-in");
                };

                toolbar.appendChild(plowButton);
            }
        };
    };
})();
