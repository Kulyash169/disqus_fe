var check=0, hostName, allComments=0,getComments,setComment;

(function() {
	getComments = function(){
		
		$.ajax({url: 'http://127.0.0.1:8000/api/v1/comment/?currentUrl='+hostName, 
			success: function(result){
				if(hostName!=""){
				all = result.objects.length;
				//get all comments
					if(allComments<all){
						for (var i=allComments;i<result.objects.length;i++){
							var name1 = result.objects[i].author_title;
							var comment1 = result.objects[i].text;
							var time1 = result.objects[i].pub_time;
							var image1 = result.objects[i].image;
							setComment(name1,comment1,time1,image1);
							allComments=result.objects[i].id;
						}
						allComments=all;
					}

						//set HEAD of panel 
						var q = document.getElementById("number");
						q.innerHTML= result.objects.length+" comments";

						chrome.browserAction.setBadgeText({
			              text: result.objects.length + ''
			            });
						
				}
				}
			});

		};


	// function that create a new item (comment)
	setComment = function(name,comment1,time,image){
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
	    		gravatar = image;
	    		pic.setAttribute("class","circle");
	    		pic.setAttribute("src",gravatar);
	    		icon.appendChild(pic);

	    	// Content of comment 
    		var content = document.createElement("div");
    		content.setAttribute("class","row-content");
    		item.appendChild(content);

    			//Create a current date
    			var curTime;
				var day = time;
				var today = day.substring(0,10);
				var dd = today.substring(8,10);
				var mm = today.substring(5,7);
				var yyyy = today.substring(2,4);
				curTime = dd+'.'+mm+'.'+yyyy;
				
				//Set a current date
	    		var time = document.createElement("div");
	    		time.setAttribute("class","least-content");
	    		time.appendChild(document.createTextNode(curTime));
	    		content.appendChild(time);

	    		//Set a user name
	    		var header = document.createElement("h4");
	    		header.setAttribute("class","list-group-item-heading");
	    		header.appendChild(document.createTextNode(name));
	    		content.appendChild(header);

	    		//Set a comment
	    		var comment = document.createElement("p");
	    		comment.setAttribute("class","list-group-item-text");
	    		comment.appendChild(document.createTextNode(comment1));
	    		content.appendChild(comment);
	    		
	    		check=1;
	}


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
		} 
		else {
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

		//sent some message and get message from background.js... 
		//...we send it cause it can't take message, if we don't send message 
		var port = chrome.extension.connect({name: "Sample Communication"});
		port.postMessage("new mes");

		port.onMessage.addListener(function(msg) {
		  hostName = msg;  
		});
		console.log ("host: "+hostName);		
		
		getComments();
		setInterval(getComments,100);


		
		
		$('#focusedInput').keyup(function(event) {

			//when we presen ENTER
	    	if(event.keyCode == 13){
	    		// console.log ("hostName: "+hostName);
	    		
	    		//put mail and name to localStorage
	    		var email=document.getElementById("inputEmail").value;
				localStorage.setItem("email",email);
				var name=document.getElementById("textArea").value;
				localStorage.setItem("name",name);

				//set all needed values (name, comment text, date, etc...)
				var pic = 'http://www.gravatar.com/avatar/'+CryptoJS.MD5(document.getElementById("inputEmail").value);
				var name = document.getElementById("textArea").value;
				var comment = document.getElementById('focusedInput').value;
				var today = new Date();
				var mm = today.getMonth()+1;
				var str = today.toDateString();
				var y=str.substring(13,15);
				var d = str.substring(8,10);
				var m;
				if(mm<10){
					m='0'+mm;
				}
				else{
					m=mm;
				}
				var time = d+'.'+m+'.'+y;

				

				//set data that will be added to query
				var data1 = JSON.stringify(
					{
						"text": comment,
						"author_title": name,
						"image":pic,
						"currentUrl":hostName
					}
				);

				//set POST query 
				$.ajax({
				url: 'http://127.0.0.1:8000/api/v1/comment/',
				type: 'POST',
				contentType: 'application/json',
				data: data1,
				dataType: 'json',
				processData: false
				});
				//update comments
				
				getComments();


				//when ENTER is pressed, text field will be empty
				var emptyText=document.getElementById("focusedInput");
				emptyText.value="";

				//encrease a comment number
				//allComments++;

				// set change in HEAD of Panel
				// var q = document.getElementById("number");
				// q.innerHTML= allComments+" comments";

				
			}
	    	
    	});

  






}).call(this);
