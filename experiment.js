var http = require('https');

var API_KEY = "API_KEY_HERE";
var VIDEO_FETCH_LIMIT = 20;

var GET_VIDEOS = "https://www.googleapis.com/youtube/v3/search?key={K}&channelId={C}&part=snippet,id&order=date&maxResults=" + VIDEO_FETCH_LIMIT;
var GET_CHANNEL_ID = "https://www.googleapis.com/youtube/v3/channels?key={K}&forUsername={U}&part=id";
var GET_VIEW_COUNT = "https://www.googleapis.com/youtube/v3/videos?id={V}&part=contentDetails,statistics&key={K}";
var GET_SUB_COUNT = "https://gdata.youtube.com/feeds/api/users/{U}?alt=json";


var getAllVideos = function(chanellId, callback) {
    http.get(GET_VIDEOS.replace("{K}", API_KEY).replace("{C}", chanellId), function (res) {
        var data = "";
        res.on('data', function(chunk) {
            data += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(data);

            if (!obj.items || obj.items.length == 0) {
                throw 'Failed to get videos!';
            }

            var toReturn = [ ];

            for (var i in obj.items) {
                var video = obj.items[i];

                var id = video.id.videoId;

                toReturn.push(id);
            }

            callback(toReturn);
        });
    });
};

var getVideoViews = function(videoId, callback) {
    http.get(GET_VIEW_COUNT.replace("{V}", videoId).replace("{K}", API_KEY), function(res) {
        var data = "";
        res.on('data', function(chunk) {
            data += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(data);

            if (!obj.items || obj.items.length == 0) {
                callback(0);
            } else {
                var views = obj.items[0].statistics.viewCount;

                callback(views);
            }
        })
    })
};

var getAverageViews = function(channelUsername, _callback) {
    var uri = GET_CHANNEL_ID.replace("{K}", API_KEY).replace("{U}", channelUsername);
    http.get(uri, function(res) {
        var data = "";
        res.on('data', function(chunk) {
            data += chunk;
        });
        res.on('end', function() {
            var obj = JSON.parse(data);

            if (!obj.items || obj.items.length == 0) {
                console.log(data);
                console.log(obj);
                throw 'Failed to get channel ID for ' + channelUsername;
            }

            var cID = obj.items[0].id;

            getAllVideos(cID, function(videos) {
                var totalViews = 0;
                var i = 0;
                var callback = function(viewCount) {
                    totalViews = parseInt(viewCount) + parseInt(totalViews);
                    if (i + 1 >= videos.length) {
                        _callback(parseFloat(totalViews) / parseFloat(videos.length));
                    } else {
                        i++;
                    }
                };

                for (var z = 0; z < videos.length; z++) {
                    getVideoViews(videos[z], callback);
                }
            });
        });
    });
};

var getSubscriberCount = function(username, callback) {
    http.get(GET_SUB_COUNT.replace("{U}", username), function(res) {
        var data = "";
        res.on('data', function(chunk) {
            data += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(data);

            var subCount = obj.entry.yt$statistics.subscriberCount;

            callback(subCount);
        })
    })
};

var getSubscriberToViewRatio = function(username, callback) {
    getAverageViews(username, function(avg) {
        getSubscriberCount(username, function(sub) {
            var value = parseFloat(avg) / parseFloat(sub);
            var obj = {
                ratio: value,
                username: username
            };
            callback(obj);
        });
    });
};

var youtubers = [
    //top youtubers
    "Smosh",
    "PewDiePie",
    "HolaSoyGerman",
    "nigahiga",
    "Machinima",
    "VanossGaming",
    "RayWilliamJohnson",

    //my own subscription
    "ExtraCreditz",
    "ashens",
    "SecretAgentBob",
    "GameGrumps",
    "hotdiggedydemon",
    "jacksfilms",
    "JonTronShow"
];

var sortAndDisplay = function() {
    finalArray.sort(function(a, b) {
        return b.ratio - a.ratio;
    });

    for (var t in finalArray) {
        var percent = finalArray[t].ratio * 100.0;
        var rounded = Math.round(percent * 100) / 100;
        console.log("Youtuber: " + finalArray[t].username + "     Ratio: " + rounded + "%");
    }
};

var total = 0;
var finalArray = [ ];
var callback = function(obj) {
    finalArray.push(obj); //Add our result to the final array

    if (total + 1 >= youtubers.length) { //Is this the last item?
        sortAndDisplay(); //Sort the array and display it
    } else {
        total++; //Add one to total and wait for the next one
    }
};

for (var i in youtubers) {
    getSubscriberToViewRatio(youtubers[i], callback);
}

