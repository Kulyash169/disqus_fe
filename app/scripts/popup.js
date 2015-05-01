var check=0;
var count=0;
(function() {
	
	$('.col-lg-10 > input').keyup(function() {
		var empty = false;
		$('.col-lg-10 > input').each(function() {
			if ($(this).val() == '') {
			empty = true;
			}
		});

		if (empty) {
			$('#focusedInput').attr('disabled', 'disabled');
		} else {
			$('#focusedInput').removeAttr('disabled');
		}
		});

		$('#focusedInput').keyup(function() {
			var empty = false;
			if ($(this).val() == '') {
				empty = true;
			}
			if (empty) {
				document.getElementById("focusedInput").className = "form-control empty";
			} else {
				document.getElementById("focusedInput").className = "form-control";
			}
		});

		$('#focusedInput').keyup(function(event) {
	    	if(event.keyCode == 13){
	    		var list = document.getElementById("listID");
	    		if(check!=0){
	    			var separator = document.createElement("div");
	    			separator.setAttribute("class","list-group-separator");
	    			list.appendChild(separator);
	    		}
	    		//CREATE NE ELEMENT (ITEM)
	    		var item = document.createElement("div");
	    		item.setAttribute("class","list-group-item");
	    		list.appendChild(item);

	    			// Icon of comment 
		    		var icon = document.createElement("div");
		    		icon.setAttribute("class","row-action-primary");
		    		item.appendChild(icon);

			    		var pic = document.createElement("i");
			    		pic.setAttribute("class","mdi-file-folder");
			    		icon.appendChild(pic);

			    	// Content of comment 
		    		var content = document.createElement("div");
		    		content.setAttribute("class","row-content");
		    		item.appendChild(content);

		    			//Create a current date
						var today = new Date();
						var dd = today.getDate();
						var mm = today.getMonth()+1; 
						var yyyy = today.getFullYear();

						if(dd<10) {
						dd='0'+dd
						} 

						if(mm<10) {
						mm='0'+mm
						} 

						today = dd+'.'+mm+'.'+yyyy;

						//Set a current date
			    		var time = document.createElement("div");
			    		time.setAttribute("class","least-content");
			    		time.appendChild(document.createTextNode(today));
			    		content.appendChild(time);

			    		//Set a user name
			    		var header = document.createElement("h4");
			    		header.setAttribute("class","list-group-item-heading");
			    		header.appendChild(document.createTextNode(document.getElementById("textArea").value));
			    		content.appendChild(header);

			    		//Set a comment
			    		var comment = document.createElement("p");
			    		comment.setAttribute("class","list-group-item-text");
			    		comment.appendChild(document.createTextNode(document.getElementById("focusedInput").value));
			    		content.appendChild(comment);
			    		
			    		check=1;
			    		count++;
			

	    	}
    	});



}).call(this);
