(function() {
    function addPlowStatusButton() {
        // Wait until the toolbar is loaded
        const toolbarInterval = setInterval(() => {
            const toolbar = document.querySelector(".mapControls"); // Target map toolbar

            if (toolbar) {
                clearInterval(toolbarInterval); // Stop checking once toolbar is found

                // Check if button already exists to prevent duplication
                if (!document.getElementById("plowStatusButton")) {
                    const button = document.createElement("button");
                    button.id = "plowStatusButton";
                    button.innerText = "Show Plow Status";
                    button.style.margin = "5px";
                    button.style.padding = "8px";
                    button.style.backgroundColor = "#0078D4";
                    button.style.color = "white";
                    button.style.border = "none";
                    button.style.cursor = "pointer";
                    button.style.borderRadius = "5px";
                    
                    button.onclick = function() {
                        console.log("Plow Status Button Clicked");
                        if (window.updatePlowStatus) {
                            window.updatePlowStatus(); // Call function from index.js
                        } else {
                            console.error("updatePlowStatus function is not available!");
                        }
                    };

                    toolbar
