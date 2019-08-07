

/**
* Listen for clicks on the buttons, and send the appropriate message to
* the content script in the page.
*/
function listenForClicks() {
    document.addEventListener("click", (e) => {        

        /**
        * Get content of the cart.
        */
        function shopifyCsv(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "shopify-csv",
            });
        }

        /**
        * Get content of the cart.
        */
       function shopifyXlsx(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "shopify-xlsx",
        });
    }

        /**
        * Share cart with a friend.
        */
        function share(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "share"
            });
        }

        /**
        * Just log the error to the console.
        */
        function reportError(error) {
            console.error(`Could not shopify: ${error}`);
        }

        /**
        * Get the active tab,
        * then call "shopify()" or "share()" as appropriate.
        */
        if (e.target.classList.contains("save-csv")) {
            browser.tabs.query({ active: true, currentWindow: true })
                .then(shopifyCsv)
                .catch(reportError);
        }
        else if (e.target.classList.contains("save-excel")) {
            browser.tabs.query({ active: true, currentWindow: true })
                .then(shopifyXlsx)
                .catch(reportError);
        }
        else if (e.target.classList.contains("share")) {
            browser.tabs.query({ active: true, currentWindow: true })
                .then(share)
                .catch(reportError);
        }
    });
}

/**
* There was an error executing the script.
* Display the popup's error message, and hide the normal UI.
*/
function reportExecuteScriptError(error) {
    console.error(`Failed to execute shopify content script: ${error.message}`);
}

/**
* When the popup loads, inject a content script into the active tab,
* and add a click handler.
* If we couldn't inject the script, handle the error.
*/
browser.tabs.executeScript({ file: "/content_scripts/shopify.js" })
    .then(listenForClicks)
    .catch(reportExecuteScriptError);