$(document).ready(function() {

  getAd(function(data) {
    // remove everything from list
    $('.list-ad-items').empty();

    for(var i=0;i<data.results.length;i++) {
      console.log(data.results[i]);

      var adDisplayText = data.results[i].selector + ' ' + data.results[i].verb;
      $('.list-ad-items').append('<li>' + linkMaker(data.results[i].objectId,adDisplayText));
    }

  });

  $('.list-ad-items').on('click','a.link-ad',function(e) {
    e.preventDefault();
    var $element = $(this);
    var clickedAdURLCode = $element.data('specialLink');
    console.log(clickedAdURLCode);
    incrementAdViewCount(clickedAdURLCode);
  });

  $('button.button-submit').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    var adObj = {}

    adObj.selectorValue = $('input.form-entry-selector').val();
    adObj.verbValue = $('input.form-entry-verb').val();
    adObj.adTextValue = adObj.selectorValue.split(' ').join('-') + '-' + adObj.verbValue.split(' ').join('-');

    console.log(adObj);
    console.log(adObj.selectorValue,'.',adObj.verbValue);


    $('.display-selector').text(adObj.selectorValue);
    $('.display-verb').text(adObj.verbValue);


    sendAd(adObj);

  });

});


var sendAd = function (ad, callback) {
// ad is an object with the text values and style settings for a submitted ad

    $.ajax({
      url: 'https://api.parse.com/1/classes/Ad',
      type: 'POST',
      headers: {
        "X-Parse-Application-Id": "pFPhY4IgGeg9xzz9T2Nlwp0uVnwY5poF1tduiBPm",
        "X-Parse-REST-API-Key": "NXyEtXaN81pZbET54tJxyvbhZ7U4KjWat3IlESjG"
      },
      data: JSON.stringify({
        selector: ad.selectorValue,
        verb: ad.verbValue,
        adText: ad.adTextValue,
        styling: {},
        urlCode: ad.adTextValue,
        upVote: 0,
        downVote: 0,
        views: 0,
        userID: null
      }),
      contentType: 'application/json',
      success: function (data) {
        // no callback just yet
        console.log('Message Saved!');
/*         console.log(data); */
/*           callback(message); */
      },
      error: function (data) {
        console.log('Error:', data);
      }
    });
  };

var getAd = function (callback) {
// ad is an object with the text values and style settings for a submitted ad

    $.ajax({
      url: 'https://api.parse.com/1/classes/Ad',
      type: 'GET',
      headers: {
        "X-Parse-Application-Id": "pFPhY4IgGeg9xzz9T2Nlwp0uVnwY5poF1tduiBPm",
        "X-Parse-REST-API-Key": "NXyEtXaN81pZbET54tJxyvbhZ7U4KjWat3IlESjG"
      },
      contentType: 'application/json',
      success: function (data) {
        console.log('Feast Your Eyes On This!');
        callback(data);
      },
      error: function(xhr, status, errorThrown) {
        console.log('Sorry, but we could not fetch any messages.');
      }
    });
  };

var linkMaker = function(linkCode, displayText) {
  return ['<a href="#" class="link-ad" data-special-link="', linkCode, '">',displayText,'</a>'].join('');

  // linkMaker should return
  // <a href="#" class="link-ad" data-special-link="adTextValue">adDisplayText</a>

};

var incrementAdViewCount = function (adObjectID,callback) {
// ad is an object with the text values and style settings for a submitted ad
    console.log(adObjectID);

    $.ajax({
      url: 'https://api.parse.com/1/classes/Ad/' + adObjectID,
      type: 'PUT',
      headers: {
        "X-Parse-Application-Id": "pFPhY4IgGeg9xzz9T2Nlwp0uVnwY5poF1tduiBPm",
        "X-Parse-REST-API-Key": "NXyEtXaN81pZbET54tJxyvbhZ7U4KjWat3IlESjG"
      },
      data: JSON.stringify({views:{__op:"Increment",amount:1}}),
      contentType: 'application/json',
      success: function (data) {
        console.log('Update Made');

/*         callback(data); */
      },
      error: function(xhr, status, errorThrown) {
        console.log('Sorry, but we could not update the server.');
        console.log(xhr, status, errorThrown);
      }
    });
  };



var linkMaker = function(linkCode, displayText) {
  return ['<a href="#" class="link-ad" data-special-link="', linkCode, '">',displayText,'</a>'].join('');

  // linkMaker should return
  // <a href="#" class="link-ad" data-special-link="adTextValue">adDisplayText</a>

};


    /*
Application ID: pFPhY4IgGeg9xzz9T2Nlwp0uVnwY5poF1tduiBPm
Client Key: GK3xEiJ3QJKqAOCEONxsIn3JmnrfreoAbLFt9Vf9
Javascript Key: hT5mDLt92uke5hmUKu4UcjRugbpJpOTzl8ShMnMc
.NET Key: GPniWyo9uOw98ZWQMY4iWlSL5yeNtXfCOyCgpQoS
REST API Key: NXyEtXaN81pZbET54tJxyvbhZ7U4KjWat3IlESjG
Master Key: 6cWCDkv5BriPUkug2jlgExrZ1eE9eKZjlOMVSj94
*/