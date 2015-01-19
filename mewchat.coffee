Messages = new Mongo.Collection("messages")
if Meteor.isClient

  #Sessions stuff...
  Session.setDefaultPersistent "anon", ""
  Session.setDefaultPersistent "color", ""
  Session.setDefaultPersistent "nick", ""
  Session.setDefaultPersistent "notif", 0
  Session.setPersistent "anon", Random.id()  if Session.get("anon") is ""
  Session.setPersistent "color", randomColor(hue: "green")  if Session.get("color") is ""
  Template.chat.helpers messages: ->

    #we're looking for the last n messages, so we have to sort from
    #older to newer, and limit the result to n, but we still want it
    #from newer to older (common practice in webchats) so we fetch and
    #reverse the array!
    Messages.find({},
      sort:
        sentAt: -1

      limit: 50
    ).fetch().reverse()


  #when a user have action near the chat, clear the notif count
  Template.chat.events "click, focus, keypress": (event) ->
    Session.setPersistent "notif", 0
    return

  Template.write.events "submit .new-message": (event) ->
    text = event.target.text.value
    anon = Session.get("anon")
    color = Session.get("color")
    Session.setPersistent "nick", event.target.author.value

    #users can stay anonymous, if so, randomize a author name
    if event.target.author.value is ""
      author = anon.slice(0, 8)
    else
      author = event.target.author.value
    
    #date stuff
    date = new Date()
    dateh = date.getHours()
    dateh = ("0" + dateh).slice(-2)
    datem = date.getMinutes()
    datem = ("0" + datem).slice(-2)
    
    #if message is not blank, insert in db
    unless text is ""
      Messages.insert
        text: text
        author: author
        anon: anon
        color: color
        sentAt: TimeSync.serverTime()
        sentAtH: dateh
        sentAtM: datem

      if text is "/help"
        Messages.insert
          text: "We can't help you"
          author: "admin"
          anon: "admin"
          color: "#00FF00"
          sentAt: TimeSync.serverTime()
          sentAtH: dateh
          sentAtM: datem

    
    #no need for a notif on messages we send ourselves!
    Session.setPersistent "notif", 0
    
    #clear the text field so the user can enter a new message
    event.target.text.value = ""
    false

  Template.write.helpers
    nick: ->
      Session.get "nick"

    color: ->
      Session.get "color"

  Template.regen.events
    "click .regencolor": (event) ->
      Session.setPersistent "color", randomColor(hue: "green")
      return

    "click .regenid": (event) ->
      Session.setPersistent "anon", Random.id()
      return

  Tracker.autorun ->
    
    #init is needed because we have to wait for the first
    #messages to be loaded first
    initializing = true
    Messages.find().observe added: (item) ->
      unless initializing
        notifv = Session.get("notif")
        notifv++
        Session.setPersistent "notif", notifv
      return

    
    #if new message, we increment the previous notif count
    initializing = false

    elem = document.getElementById("msg")

    if Session.get("notif") is 0
      document.title = "MewChat"
    else

      #showing the number of unread messages
      document.title = "(" + Session.get("notif") + ") MewChat"
      elem.scrollTop = elem.scrollHeight
    return

if Meteor.isServer
  Meteor.startup ->

