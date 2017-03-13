var db;
var dbV = {
	open: function(){

		db = new Dexie("history");
		db.version(1).stores({
			history: "++id,date,full,active,favorite"
		});

    },
    close: function() {
        server.close()
    },
    addItem: function(t) {
        db.history.add({full: t, date: Date.now(), active: 1, favorite: 0});
	},
	al: function(e){
		alert(e);
	}
};

var f = {
	setBadge: function(text){
		chrome.browserAction.setBadgeText({ text: text.toString() });
	}
}


dbV.open();

// Extension

$(document).ready(function() {

	var lCText;
	db.history.count().then(function(count){ f.setBadge(count); });

	//function onNewClipboardText(value)

	function clipboardChecker(){
		var textArea = $("#paste-field");

		setTimeout(function() {
			textArea.focus();
			document.execCommand('paste');
			tVal = ((textArea.val()).trim()).replace(/\s+/g, " ");;

			if((tVal !== undefined || tVal != "") && typeof(tVal) == "string"){

				if(lCText != tVal){
					lCText = tVal;
					console.log(tVal);
					dbV.addItem(textArea.val());
					db.history.count().then(function(count){ f.setBadge(count); });
				}

			} // if tVal not undefined

			textArea.val("");
		}, 1); // setTimeout

	} // clipboardChecker end



	// System
	setInterval(clipboardChecker, 1000);
	clipboardChecker();
});