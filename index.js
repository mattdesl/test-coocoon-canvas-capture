var xhr = require('xhr')
var settings = {
  DB_URL: 'http://wwwqa.mustangcustomizerservices.ford.com'
}

var CurrentUser = {}

setTimeout(function() {
  Cocoon.Social.Facebook.init({
    appId: '1497194223882925',
    version: 'v2.2'
  });

  setTimeout(function() {
    setup()
  }, 1000)
  
}, 1000)


function setup() {
  getToken(function(err, result) {
    if (err) throw err
    CurrentUser.token = result.token
    console.log('Got token', CurrentUser.token)
    console.log('Got token', result.session);
    console.log('Logging into fb')
    
    doSocialLogin(function(err, response) {
      if (err) throw err
      loadNotifications(function(err, notifications) {
        if (err) throw err
        console.log("NOTIFICATIONS", notifications)
      })
    })
  })
}

function loadNotifications(cb) {
  xhr( {
      url: settings.DB_URL + '/api/v1/my_notification/?limit=0',
      json: {},
      headers: { 'X-CSRFToken': CurrentUser.token },
      useXDR: true,
      withCredentials: true
  }, function( err, xhr, response ) {
    if (err) cb(err)
    else cb(null, response)
  })
}

function doSocialLogin(cb) {
  login(function(err, user) {
    if (err) throw err
    console.log("Got facbeook:", user)
    var names = user.userName.split(' ');
    var fname = names.shift();
    var lname = '';
    if (names.length > 0) {
      lname = names.join(' ');
    }
    console.log('foo', typeof user.userID, fname, lname)
    authenticate({
      platform: 'facebook',
      id: user.userID,
      'first_name': fname,
      'last_name': lname
    }, cb)
  })
}

function login(cb) {
  var fb = Cocoon.Social.Facebook.getSocialInterface();
  if (fb.isLoggedIn())
    requestUser(cb);
  else {
    fb.login(function(success, error) {
      if (error) {
        return cb(new Error('Failed to login to Facebook:', error.message))
      } else {
        requestUser(cb);
      }
    })
  }
}

function requestUser(cb) {
  var fb = Cocoon.Social.Facebook.getSocialInterface();
  fb.requestUser(function(user, error ) {
    if (error) return cb(error)
    else return cb(null, user)
  })
}

function authenticate(data, cb) {
  console.log('token', CurrentUser.token)
  console.log(JSON.stringify(data))
  xhr({
    url: settings.DB_URL + '/api/v1/my_user/social_login/',
    method: 'POST',
    json: data,
    headers: {
      'X-CSRFToken': CurrentUser.token
    },
    useXDR: true,
    withCredentials: true
  },
  function(err, xhr, response) {
    if (err) return cb(err)

    console.log("Login ajax success")
    cb(null, response)
  })
}

function getToken(cb) {
  xhr({
    url: settings.DB_URL + '/api/v1/my_user/startup/',
    useXDR: true,
    withCredentials: true,
    json: true
  }, function(err, xhr, response) {
    if (err) {
      cb(new Error('Failed to load user token. ' + err + '\n' + response.status))
    } else {
      if (response.status !== 'authenticated') { //<-- android only bug
        console.error("Response status", response.status)
        console.error(JSON.stringify(response))
      } 
      cb(null, {
        session: response.sessionid,
        token: response.csrftoken
      })
    }
  })
}

function doSaveAs() {
  console.log('Using token...', CurrentUser.token)
  xhr({
    url: settings.DB_URL + '/api/v1/my_car/',
    method: 'POST',
    json: {
      user: '/api/v1/my_user/2/',
      name: 'jjjjjj',
      shares: 0,
      model: 'ecoboost',
      copyable: true,
      isPublic: true,
      parts: {},
      updateLastModified: true
    },
    headers: {
      'X-CSRFToken': CurrentUser.token
    },
    useXDR: true,
    withCredentials: true
  }, function(err, xhr, response) {
    if (err)
      console.error('ERR', err)
    else {
      console.log('save successful', response.id)
    }
  })
}