Messages = new Mongo.Collection("messages");

if (Meteor.isClient) {
  //Sessions stuff...
  Session.setDefaultPersistent("anon", "");
  Session.setDefaultPersistent("color", "");
  Session.setDefaultPersistent("nick", "");
  Session.setDefaultPersistent("notif", 0);

  if (Session.get("anon") == "") {
    Session.setPersistent("anon", Math.random().toString(36).substring(7));
  }

  if (Session.get("color") == "") {
    Session.setPersistent("color", randomColor({hue: 'green'}));
  }

  Template.chat.helpers({
    messages: function () {
      //we're looking for the last 25 messages, so we have to sort from
      //older to newer, and limit the result to 25, but we still want it
      //from newer to older (common practice in webchats) so we fetch and
      //reverse the array!
      return Messages.find({}, {sort: {sentAt: -1}, limit: 30}).fetch().reverse();
    }
  });

  Template.chat.events({
    //when a user have action near the chat, clear the notif count
    "click, focus, keypress": function (event) {
      Session.setPersistent("notif", 0);
    }
  });

  Template.write.events({
    "submit .new-message": function (event) {
      var text = event.target.text.value;
      var anon = Session.get("anon");
      var color = Session.get("color");
      Session.setPersistent("nick", event.target.author.value);
      //users can stay anonymous, if so, randomize a author name
      if (event.target.author.value == "") {
        var author = anon;
      } else {
        var author = event.target.author.value;
      }

      //date stuff
      var date = new Date();
      var dateh = date.getHours();
      var dateh = ("0" + dateh).slice(-2);
      var datem = date.getMinutes();
      var datem = ("0" + datem).slice(-2);

      //if message is not blank, insert in db
      if (text != "") {
        Messages.insert({
          text: text,
          author: author,
          anon: anon,
          color: color,
          sentAt: TimeSync.serverTime(),
          sentAtH: dateh,
          sentAtM: datem
        });
      //no need for a notif on messages we send ourselves!
      Session.setPersistent("notif", 0);
      }
      //clear the text field so the user can enter a new message
      event.target.text.value = "";
      return false;
    }
  });

  Template.write.helpers({
    nick: function () {
      return Session.get("nick");
    }
  });

  Template.write.rendered = function() {
    setTimeout(Session.setPersistent("notif", 0),3000);
  };

  Tracker.autorun(function () {
    //init is needed because we have to wait for the first
    //messages to be loaded first
    var initializing = true;
    Messages.find().observe({
      added: function (item) {
        if (!initializing) {
          var notifv = Session.get("notif");
          notifv++;
          Session.setPersistent("notif", notifv);
          //if new message, we increment the previous notif count
        }
      }
    });
    initializing = false;

    if (Session.get("notif") == 0) {
      document.title = "MewChat";
    } else {
      //showing the number of unread messages
      document.title = "("+Session.get("notif")+") MewChat";
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}
