# mewchat
Trying to make a simple webchat in Meteor


Live demo: http://188.165.61.14:4500/

Features:
* Reactive webchat built in Meteor
* Anonymous mode
* Each user is identified by a unique ID to protect from nick theft
* Uses https://github.com/okgrow/meteor-persistent-session for persistent sessions (across pages reload)
* Uses https://github.com/davidmerfield/randomColor for random green color
* Uses https://github.com/mizzao/meteor-timesync to get server time due to issued with clients not in sync
* Number of unread messages is shown in the <title>


To-do:
* Let users choose a color
* Let users choose how many messages they want to see
