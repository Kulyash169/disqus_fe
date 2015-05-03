var check=0;

(function() {
		// get email and name from local storage
		var mainEmail = localStorage.getItem("email");
		var mainName = localStorage.getItem("name");
		var empty = false;

		// check 2 inputs (if is empty, then fill it with value from local storage), else it will be empty
		if(mainEmail!=null || mainName!=null){
			var emailInput = document.getElementById("inputEmail");
			emailInput.value=mainEmail;
			var nameInput = document.getElementById("textArea");
			nameInput.value=mainName;
			empty = false;
		}
		// check for NULL when pressed on email or name
		$('.col-lg-10 > input').keyup(function() {
			empty = false;
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
		if (empty) {
				$('#focusedInput').attr('disabled', 'disabled');
			} else {
				$('#focusedInput').removeAttr('disabled');
			}


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


		//set GET query
		$.ajax({url: 'http://127.0.0.1:8000/api/v1/comment/', 
			success: function(result){
			//get all comments
				for (var i=0;i<result.objects.length;i++){

					var list = document.getElementById("listID");
			    		if(check!=0){
			    			var separator = document.createElement("div");
			    			separator.setAttribute("class","list-group-separator");
			    			list.appendChild(separator);
			    		}
			    		
			    		//CREATE NEW ELEMENT (ITEM)
			    		var item = document.createElement("div");
			    		item.setAttribute("class","list-group-item");
			    		list.appendChild(item);

			    			// Icon of comment 
				    		var icon = document.createElement("div");
				    		icon.setAttribute("class","row-action-primary");
				    		item.appendChild(icon);

				    			// get picture from Gravatar
				    			var q = document.getElementById('inputEmail').value;
					    		var pic = document.createElement("img");
					    		gravatar = result.objects[i].image;
					    		pic.setAttribute("class","circle");
					    		pic.setAttribute("src",gravatar);
					    		icon.appendChild(pic);

					    	// Content of comment 
				    		var content = document.createElement("div");
				    		content.setAttribute("class","row-content");
				    		item.appendChild(content);

				    			//Create a current date
								var day = result.objects[i].pub_time;
								var today = day.substring(0,10);
								var dd = today.substring(8,10);
								var mm = today.substring(5,7);
								var yyyy = today.substring(2,4);

								//Set a current date
					    		var time = document.createElement("div");
					    		time.setAttribute("class","least-content");
					    		time.appendChild(document.createTextNode(dd+'.'+mm+'.'+yyyy));
					    		content.appendChild(time);

					    		//Set a user name
					    		var header = document.createElement("h4");
					    		header.setAttribute("class","list-group-item-heading");
					    		header.appendChild(document.createTextNode(result.objects[i].author_title));
					    		content.appendChild(header);

					    		//Set a comment
					    		var comment = document.createElement("p");
					    		comment.setAttribute("class","list-group-item-text");
					    		comment.appendChild(document.createTextNode(result.objects[i].text));
					    		content.appendChild(comment);
					    		
					    		check=1;
				}
			}
		});


		$('#focusedInput').keyup(function(event) {


	    	if(event.keyCode == 13){
	    		
	    		//put mail and name to localStorage
	    		var email=document.getElementById("inputEmail").value;
				localStorage.setItem("email",email);
				var name=document.getElementById("textArea").value;
				localStorage.setItem("name",name);

				//set POST query 
				var pic = document.getElementById("inputEmail");
				var name = document.getElementById("textArea");

				var data1 = JSON.stringify(
					{
						"text": document.getElementById('focusedInput').value,
						"author_title": name.value,
						"image":'http://www.gravatar.com/avatar/'+CryptoJS.MD5(pic.value)
					}
				);

				$.ajax({
				url: 'http://127.0.0.1:8000/api/v1/comment/',
				type: 'POST',
				contentType: 'application/json',
				data: data1,
				dataType: 'json',
				processData: false
				});

			}

	    	
    	});



}).call(this);
