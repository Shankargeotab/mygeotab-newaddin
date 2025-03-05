window.geotab.addin.plowStatus = {
    initialize(api, state, addinReady) {
        console.log("Plow Status Add-in Initialized");
        addinReady();
    },
    focus(api, state) {
        console.log("Plow Status Add-in Focused");
        window.updatePlowStatus = async function () {
            try {
                const data = await api.call("GetFeed", {
                    typeName: "StatusData",
                    search: {
                        diagnosticSearch: { id: "Aux6" },
                        deviceSearch: { id: state.device.id }
                    }
                });

                const status = data.data.length > 0 && data.data[0].value === 1 ? "Plow is Active" : "Plow is Inactive";
                document.getElementById("status").innerText = status;
            } catch (error) {
                console.error("Error fetching plow status:", error);
            }
        };
    }
};
