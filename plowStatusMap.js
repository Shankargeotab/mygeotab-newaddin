window.geotab = window.geotab || {};
window.geotab.addin = window.geotab.addin || {};

window.geotab.addin.plow_status_addin_map = function(api, state) {
  return {
    initialize: function() {
      console.log("🧭 Plow Status Map Add-in Initialized");
    },
    focus: function() {
      console.log("🧭 Plow Status Map Add-in Focused");

      const toolbar = document.querySelector(".leaflet-bar");
      if (!toolbar) {
        console.error("Map toolbar not found!");
        return;
      }

      if (document.getElementById("plowStatusButton")) {
        console.warn("Plow Status button already exists!");
        return;
      }

      const plowButton = document.createElement("button");
      plowButton.id = "plowStatusButton";
      plowButton.innerText = "Show Plow Status";
      plowButton.style.padding = "5px";
      plowButton.style.cursor = "pointer";

      plowButton.onclick = function() {
        state.open("plow_status_addin");
      };

      toolbar.appendChild(plowButton);
      console.log("✅ Plow Status button added to map toolbar!");
    },
    blur: function() {
      const plowButton = document.getElementById("plowStatusButton");
      if (plowButton) {
        plowButton.remove();
        console.log("🟡 Plow Status button removed");
      }
    }
  };
};
