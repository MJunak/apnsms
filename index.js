var apn = require('apn');
var restify = require('restify');

var options = {
  token: {
    key: "AuthKey_MEHE37DJ3R.p8",
    keyId: "MEHE37DJ3R",
    teamId: "4Q77N6NASC"
  },
  production: true
};


var server = restify.createServer();
server.get('/notification', respond);
server.post('/notification', respond);

// todo implement logic
function respond(req,res,next)
{
    var apnProvider = new apn.Provider(options);

  
    var note = new apn.Notification();

    note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    note.badge = 3;
    note.sound = "ping.aiff";
    note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
    note.payload = {'messageFrom': 'John Appleseed'};
    note.topic = "<your-app-bundle-id>";

    apnProvider.send(note, "asd").then( (result) => {
    // see documentation for an explanation of result
    });

    res.send(200);
}

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});


