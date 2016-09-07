# FB-HB
A TamperMonkey / GreaseMonkey / UserScript script that posts happy birthday to your friends Facebook wall


# Configuration
By default, everyone will get the message defined in `normal_friends_message`.

You can add close friends to the `var close_friends_list = [];` or using the example of `add_close_friend_uid("my.better.half");`. Close friends get a different message, defined in `var close_friends_message`.

You can add people to an ignore list, as well, defined in `var ignore_friends_list`.

# Why?
Because I hate social interaction with people and I believe that birthdays only exist because the calendar is a man-made construct. Time, however, will kill us all.

# Version 3!?
Yeah. 

Version 1 was back when Facebook had RSS feeds - it was simple enough to pull data from the RSS feeds, even if it was in XML.
Version 2 used the Facebook Graph API v2.0, which was deco'd on 2016-08-7. This was a nice, elegant, way of doing it.

# Why am I redirected to the mobile site?
This was the only way I could figure out how to get the script working again. Pull Requests for a more elegant solution are welcome.
