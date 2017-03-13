$(document).ready(function() {


  $("button#reset").on("click", function(){
    chrome.storage.sync.set({
      clipboards: new Array(),
    }, function() {
      alert("Sıfırlandı.");
    });
  });
  //////////////////////////////

    chrome.storage.sync.get({
      clipboards: {},
    }, function(items) {

          console.log(items.clipboards);
          $.each( items.clipboards, function( key, value ) {
            $("div#history ul").append('<li>' + value.text + '</li>');
          });
          ///// Filtreleme /////
          $('input[type="text"]#search').keyup(function(){

            var that = this, $allListElements = $('div#history ul > li');

            var $matchingListElements = $allListElements.filter(function(i, li){
                var listItemText = $(li).text().toUpperCase(), 
                    searchText = that.value.toUpperCase();
                return ~listItemText.indexOf(searchText);
            });

            $allListElements.hide();
            $matchingListElements.show();

        });
        // keyup end
    });



    /*var i;
    for (i = 0; i < clipboardHistory.length; i++) {
      console.log(i);
    }*/

    /*var obj = {
      "flammable": "inflammable",
      "duh": "no duh"
    };
    $.each( obj, function( key, value ) {
      console.log( key + ": " + value );
    });*/


});