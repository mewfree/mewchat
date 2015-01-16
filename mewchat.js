Messages = new Mongo.Collection("messages");

if (Meteor.isClient) {
  Session.setDefaultPersistent("anon", "")
  Session.setDefaultPersistent("color", "")

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

  Template.message.helpers({
    color: function () {
      return Session.get("color");
    }
  });

  Template.write.events({
    "submit .new-message": function (event) {
      var text = event.target.text.value;
      var anon = Session.get("anon");
      //users can stay anonymous, if so, randomize a author name
      if (event.target.author.value == "") {
        var author = anon;
      } else {
        var author = event.target.author.value;
      }

      //if message is not blank, insert in db
      if (text != "") {
        Messages.insert({
          text: text,
          author: author,
          anon: anon,
          sentAt: new Date()
        });
      }
      //clear the text field so the user can enter a new message
      event.target.text.value = "";
      return false;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}
