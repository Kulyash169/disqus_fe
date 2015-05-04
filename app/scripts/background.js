(function() {
      var Stat, $this, module;

       module = typeof exports !== "undefined" && exports !== null ? exports : this;
      'use strict';

      chrome.runtime.onInstalled.addListener(function(details) {});

      Stat = {
        data: {},
        cur: null
      };

      tabChanged = function(url) {
        var lst;
        if (Stat.cur) {
          lst = Stat.data[Stat.cur];
          lst.push(new Date);
        }
        Stat.cur = url;
        lst = Stat.data[url] || [];
        lst.push(new Date);
        Stat.data[url] = lst;
        
        return Stat.data[url];
        
      };

      getDomain = function(url) {
        var myDomain;
        myDomain = document.createElement('a');
        myDomain.href = url;
        return myDomain.hostname;
      }

      updateBadge = function(host) {
        var text1;
        $.ajax({
          url: 'http://127.0.0.1:8000/api/v1/comment/?currentUrl='+host,
          success: function(result) {
            console.log ("badge text: "+result.objects.length);
            if (result.objects.length<=0) {text1="0";}
            else {text1=result.objects.length;}
            
            chrome.browserAction.setBadgeText({
              text: text1 + ''
            });
            
          }
        });
      }

      needToDo=function(url){
        myUrl = new URL(url);
        if (myUrl.protocol === 'https:' || myUrl.protocol === 'http:') {

            var host;
            host = getDomain(url);
            if (host) {
              tabChanged(host);
              chrome.extension.onConnect.addListener(function(port) {
                port.onMessage.addListener(function(msg) {
                      port.postMessage(host);
                      console.log (msg);
                });
              });
              
            }
          }
          updateBadge(host);

      };

    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
      Stat.curTabId = tabId;
      console.log ("update");
      needToDo(tab.url); 
    });


      chrome.tabs.onActivated.addListener(function(activeInfo) {
        Stat.curTabId = activeInfo.tabId;
        console.log ("active");
        return chrome.tabs.get(activeInfo.tabId, function(tab) {
          needToDo(tab.url);
        });
      });



       


      

}).call(this);
