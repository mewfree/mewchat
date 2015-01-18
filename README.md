# MewChat
Trying to make a simple webchat in Meteor


Live demo: http://mewchat.meteor.com/ (managed by a third party)

http://188.165.61.14:4500/ (dev)


Misc:
-----
* The time displayed next to each message is the poster's local time. This is a feature, not a bug.
* Only last 30 messages are currently shown. It is easily customizable.


Features:
--------
* Reactive webchat built in Meteor
* Anonymous mode
* Each user is identified by a unique ID to protect from nick theft
* Uses https://github.com/okgrow/meteor-persistent-session for persistent sessions (across pages reload)
* Uses https://github.com/davidmerfield/randomColor for random green color
* Uses https://github.com/mizzao/meteor-timesync to get server time due to issues with clients not in sync
* Number of unread messages is shown in the title tag


To-do:
------
* Create multiple chatrooms
* Let users choose a color
* Let users choose how many messages they want to see
