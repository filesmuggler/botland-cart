console.log("Shopify succesfully loaded!");
(function() {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
      return;
    }
    window.hasRun = true;
  
    /**
     * Given a URL to a beast image, remove all existing beasts, then
     * create and style an IMG node pointing to
     * that image, then insert the node into the document.
     */
    function shopifyCsv() {
        console.log("csv");
    }

    function shopifyXlsx() {
        console.log("xlsx");
    }

    function shareCart() {
        console.log("share");
    }
  
    
  
    /**
     * Listen for messages from the background script.
     * Call "beastify()" or "reset()".
    */
    browser.runtime.onMessage.addListener((message) => {
      if (message.command === "shopify-csv") {
        shopifyCsv();
      } else if (message.command === "shopify-xlsx") {
        shopifyXlsx();
      } else if (message.command === "share") {
        shareCart();
      }
    });
  
  })();