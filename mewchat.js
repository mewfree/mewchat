Messages = new Mongo.Collection("messages");

if (Meteor.isClient) {
  Template.chat.helpers({
    messages: function () {
      return Messages.find({});
    }
  });

  Template.write.events({
    "submit .new-message": function (event) {
      var text = event.target.text.value;
      var author = Math.random().toString(36).substring(7);
      
      Messages.insert({
        text: text,
        author: author,
        sentAt: new Date()
      });
      event.target.text.value = "";
      return false;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}
