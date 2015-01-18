Router.configure
  load: ->
    $('html, body').animate({ scrollTop: 0 }, 400)
    $('.content').hide().fadeIn(1000)

  waitOn: ->
    return Meteor.subscribe('messages')

Router.map ->
  @route 'Home',
    path: '/'
