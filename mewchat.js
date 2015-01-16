Messages = new Mongo.Collection("messages");

if (Meteor.isClient) {
  Template.chat.helpers({
    messages: function () {
      return Messages.find({}, {sort: {sentAt: -1}, limit: 20, sort: {sentAt: 1}});
    }
  });

  Template.write.events({
    "submit .new-message": function (event) {
      var text = event.target.text.value;
      if (event.target.author.value == "") {
        var author = Math.random().toString(36).substring(7);
      } else {
        var author = event.target.author.value;
      }
      
      if (text != "") {
        Messages.insert({
          text: text,
          author: author,
          sentAt: new Date()
        });
      }
      event.target.text.value = "";
      return false;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}
