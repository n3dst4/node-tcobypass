// http://t.co/RmTu5FJa
// http://10.0.0.9:8000/RmTu5FJa
// http://t.co/loifeXrG

// http://94.19.192.54:8000/loifeXrG

var http = require('http'),
    url = require('url');
    




http.createServer(function (req, res) {
    var path;
    function error(msg, e) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end(msg + '\n');
    }

    try {
        path = url.parse(req.url).pathname;
    } catch (e) {
        error("could not parse path from url'" + req.url + "'");
        return;
    }
    
    //console.log("looking up " + path);
    
    http.get({host: "t.co", port: "80", path: path},
        function(hres){
            var location = hres.headers.location;
            if (location) {
                console.log("sending client to " + location);
                res.setHeader("Location", location);
                res.setHeader("Host", "t.co");
                res.statusCode = 301;
                res.end();
            }
            else {
                error(
                    "no redirect detected for " + path + "\n" +
                    "http status code was " + hres.statusCode + "\n" +
                    "headers:\n\n" + JSON.stringify(hres.headers)
                );
            }
        }
    ).on('error', function(e){error("http request to t.co failed");});
}).listen(80);