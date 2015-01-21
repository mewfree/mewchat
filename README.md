# MewChat
Trying to make a simple webchat in Meteor


Live demo: http://chat.mewfree.com


Misc:
-----
* The time displayed next to each message is the poster's local time. This is a feature, not a bug.
* Only last 30 messages are currently shown. It is easily customizable.


Features:
--------
* Reactive webchat built in Meteor
* Anonymous mode
* Each user is identified by a unique ID to protect from nick theft
* Number of unread messages is shown in the title tag
* Uses https://github.com/okgrow/meteor-persistent-session for persistent sessions (across pages reload)
* Uses https://github.com/davidmerfield/randomColor for random green color
* Uses https://github.com/mizzao/meteor-timesync to get server time due to issues with clients not in sync
* Uses https://github.com/mquandalle/meteor-jade for Jade templating
* Uses built-in Coffeescript and Stylus packages for JS and CSS pre-processing


To-do:
------
* Create multiple chatrooms
* Implement private messages
* Let users choose a color
* Let users choose how many messages they want to see
* Makes http messages clickables links
