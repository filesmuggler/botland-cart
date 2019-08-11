console.log("Shopify succesfully loaded!");

/**
 * Read content of the cart
 */

 (function(){

  var tabela = document.getElementById("confirmCheckout").firstChild;

  for(var i = 0, row; row = tabela.rows[i]; i++)
  {
      if(row.className=="checkout-single-item"){
          
          for (var j = 0, col; col = row.cells[j]; j++) {
              //console.log("hello "+j);
              
              
              
              if(col.className=="supercheckout-name"){
                // get name of the part
                console.log(col.querySelectorAll("div a")[0].innerHTML);                    
              }
              if(col.className=="supercheckout-qty supercheckout-product-qty-input"){
                // get number of parts
                console.log(col.querySelectorAll("div input")[1].value);
              }
              if(col.className=="supercheckout-unit-total"){
                // get unit price
                console.log(col.querySelectorAll("span span")[0].innerHTML)
              }
              if(col.className=="supercheckout-total"){
                // get total price
                console.log(col.innerHTML)
                
                  
              }
              
              
              
          } 
      }
    
    
}

 })();


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
     * Save table to CSV file.
     */
    function shopifyCsv() {
        console.log("csv");
    }

    /**
     * Save table to XLSX file.
     */
    function shopifyXlsx() {
        console.log("xlsx");
    }

    /**
     * Share table as a list of elements.
     */
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