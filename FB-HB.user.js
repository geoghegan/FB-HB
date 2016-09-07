// ==UserScript==
// @name         FB-HB
// @version      3
// @description  Posts Happy Birthday on your friend's Facebok walls
// @author       Nick Geoghegan
// @match        https://*.facebook.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //functions and variables declaration, ignore this

    var url = window.location.href;

    var close_friends_list = [];
    var ignore_friends_list = [];

    function add_close_friend_uid(uid){
        close_friends_list.push(uid);
    }

    function add_ignore_friend_uid(uid){
        ignore_friends_list.push(uid);
    }

    //END functions and variables

    //#############################################
    //              CONFIGURATION
    //#############################################

    //Message to close friends
    var close_friends_message = "HAPPY BIRTHDAY!!! :) https://www.youtube.com/watch?v=oy98BU-cf_E";

    //Message to normal friends
    var normal_friends_message = "Happy Birthday! https://www.youtube.com/watch?v=0fL46NSiUGY";

    //Close Friends UID list. Example:
    add_close_friend_uid("my.better.half");

    //Ignore Friends UID list. Example:
    add_ignore_friend_uid("my.ex.wife");

    //#############################################
    //           CONFIGURATION END
    //#############################################

    //CODE functions and variables

    var ids = {
        list: {"close_friends":close_friends_list, "ignore":ignore_friends_list},
        exists: function(type,uid) {
            if(this.list[type].indexOf(uid) >= 0){
                return true;
            }
            return false;
        },
    };

    function get_uid(bp){
        return bp.querySelector('a').href.replace("https://m.facebook.com/","");
    }

    function get_list_valid_bps(bp_list){
        var valid_bps = [];
        for(var x = 0; x < bp_list.length; x++){
            var uid = get_uid(bp_list[x]);
            if(ids.exists("ignore",uid) === false){
                valid_bps.push(bp_list[x]);
                var message = normal_friends_message;
                var color = "#CBFFD7";
                //if close friend
                if(ids.exists("close_friends",uid) === true){
                    message = close_friends_message;
                    color = "#FCF480";
                }
                //prepare message and color
                bp_list[x].style.background = color;
                bp_list[x].querySelector('.inputCell').querySelector('textarea').value = message;
            }else{
                bp_list[x].style.background = "#FC8080";
            }
        }
        return valid_bps;
    }

    function send_messages(btn){
        console.log("trying to send messages");
        var v = 0;
        var l = b_list.length;
        btn.style.display = "none";
        var ss = setInterval(function(){
            if(v < l){
                if(b_list[v].childNodes[1].childNodes[0].style.display !== "none"){
                    b_list[v].querySelector('[type="submit"]').click();
                }
                v++;
            }else{
                clearInterval(ss);
                btn.style.display = "";
            }
        },2000);
    }
    //CODE
    if(url.indexOf("https://m.facebook.com/events/birthdays") === 0){
        var birthday_people_list = document.querySelector('article').querySelector('ul').childNodes;
        var b_list = get_list_valid_bps(birthday_people_list);

        //create button
        document.querySelector('article').querySelector('div').querySelector('div').childNodes[0].childNodes[0].style="margin-right:20px;";
        var btn = document.createElement("BUTTON");
        var t = document.createTextNode("Send all messages");
        btn.appendChild(t);
        var parentGuest = document.querySelector('article').querySelector('div').querySelector('div').childNodes[0].childNodes[0];
        parentGuest.parentNode.insertBefore(btn, parentGuest.nextSibling);

        btn.addEventListener("click", function(){send_messages(btn);});


    }
    if(url.indexOf("https://www.facebook.com/") === 0){
        //create button
        var go_bdays = document.createElement("a");
        var gg = document.createTextNode("Go to birthdays page to send messages.");
        go_bdays.appendChild(gg);
        go_bdays.href = "https://m.facebook.com/events/birthdays";
        var pg = document.querySelector('div.fbReminders');
        pg.parentNode.insertBefore(go_bdays, pg.nextSibling);
    }
})();
