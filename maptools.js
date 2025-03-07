(function() {
    function addPlowStatusButton() {
        console.log("Checking for map toolbar...");

        // Wait until the toolbar is loaded
        const toolbarInterval = setInterval(() => {
            const toolbar = document.querySelector(".gm-style-mtc"); // Corrected selector for Google Maps toolbar

            if (toolbar) {
                clearInterval(toolbarInterval); // Stop checking once toolbar is found

                // Prevent duplicate button creation
                if (!document.getElementById("plowStatusButton")) {
                    console.log("Adding Plow Status button...");
                    
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

                    toolbar.appendChild(button);
                    console.log("✅ Plow Status Button Added to Toolbar!");
                }
            }
        }, 1000); // Check every 1 second
    }

    // Run function when map page is fully loaded
    document.addEventListener("DOMContentLoaded", addPlowStatusButton);
})();
