window.geotab = window.geotab || {};
window.geotab.addin = window.geotab.addin || {};

window.geotab.addin.plow_status_addin_map = function(api, state) {
  return {
    initialize() {
      console.log("🧭 Map Add-in Initialized");
    },
    focus() {
      console.log("🧭 Map Add-in Focused");
      const toolbar = document.querySelector(".leaflet-bar");
      if (!toolbar) return console.error("Toolbar not found");
      if (document.getElementById("plowStatusButton")) return;

      const btn = document.createElement("button");
      btn.id        = "plowStatusButton";
      btn.innerText = "Show Plow Status";
      btn.style.padding = "5px";
      btn.onclick = () => state.open("plow_status_addin.html");
      toolbar.appendChild(btn);
      console.log("✅ Plow Status button added");
    },
    blur() {
      const btn = document.getElementById("plowStatusButton");
      if (btn) btn.remove();
    }
  };
};
