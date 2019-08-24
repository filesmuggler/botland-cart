/**
 * Global variables
 */

var tabela = document.getElementById("confirmCheckout").firstChild;
var partName, partQty, partUnitPrice, partTotalPrice, partRow, partTable;
partRow = "No.;Name of part;Quantity;Unit Price [PLN];Total Price [PLN]\n";
partTable = partRow;
var totalMoney = 0.0;

console.log("Shopify succesfully loaded!");

/**
 * Read content of the cart
 */

(function () {
  for (var i = 0, row; row = tabela.rows[i]; i++) {
    if (row.className == "checkout-single-item") {

      for (var j = 0, col; col = row.cells[j]; j++) {

        if (col.className == "supercheckout-name") {
          // get name of the part
          //console.log(col.querySelectorAll("div a")[0].innerHTML);     
          partName = col.querySelectorAll("div a")[0].innerHTML;
          partRow = i + ".;" + partName;
        }
        if (col.className == "supercheckout-qty supercheckout-product-qty-input") {
          // get number of parts
          //console.log(col.querySelectorAll("div input")[1].value);
          partQty = col.querySelectorAll("div input")[1].value;
          partRow = partRow + ";" + partQty;
        }
        if (col.className == "supercheckout-unit-total") {
          // get unit price
          //console.log(col.querySelectorAll("span span")[0].innerHTML)
          partUnitPrice = col.querySelectorAll("span span")[0].innerHTML;
          partUnitPrice = partUnitPrice.substring(0, partUnitPrice.length - 3);
          partUnitPrice = partUnitPrice.replace(',', '.');
          partRow = partRow + ";" + partUnitPrice;
        }
        if (col.className == "supercheckout-total") {
          // get total price
          //console.log(col.innerHTML)                  
          partTotalPrice = col.innerHTML;
          partTotalPrice = partTotalPrice.substring(0, partTotalPrice.length - 3);
          partTotalPrice = partTotalPrice.replace(',', '.');
          totalMoney = totalMoney + parseFloat(partTotalPrice);
          partRow = partRow + ";" + partTotalPrice + "\n";
        }
      }
      partTable = partTable + partRow;
    }
  }
  partTable = partTable + "Sum:;;;;" + totalMoney;
  
})();


(function () {
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
    console.log(partTable);
  }

  /**
   * Save table to XLSX file.
   */
  function shopifyXlsx() {
    console.log("xlsx");
    download("data.csv",partTable)
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



function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

