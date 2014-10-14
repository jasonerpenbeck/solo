// jQuery stuff
$(document).ready(function() {

  $('.upVote').text('Awesome');
  $('.downVote').text('Meh');

  $('.creative').css({'background-color': stylings.adUnitBackgroundColor,
  'color': stylings.adUnitFontColor,
  'font-size': stylings.adUnitFontSize});


  // load ads
  getAd(function(data) {
    // remove everything from list
    $('.list-ad-items').empty();

    for(var i=0;i<data.results.length;i++) {
      var adDisplayText = data.results[i].selector + ' ' + data.results[i].verb;
      $('.list-ad-items').append('<li class="link-container">' + linkMaker(data.results[i].objectId,adDisplayText));
    }

  });

  // increment view count on click
  // also need to load ad display
  $('.list-ad-items').on('click','a.link-ad',function(e) {
    e.preventDefault();
    var $element = $(this);
    incrementAdViewCount($element.data('specialLink'));
  });


  $('button.button-submit').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    var adObj = {}

    adObj.selectorValue = $('input.form-entry-selector').val();
    adObj.verbValue = $('input.form-entry-verb').val();
    adObj.adTextValue = adObj.selectorValue.split(' ').join('-') + '-' + adObj.verbValue.split(' ').join('-');

/*
    console.log(adObj);
    console.log(adObj.selectorValue,'.',adObj.verbValue);
*/

    // display ad
    $('.display-selector').text(adObj.selectorValue);
    $('.display-verb').text(adObj.verbValue);

    // send it to parse
    sendAd(adObj);

  });

});


var sendAd = function (ad, callback) {
// ad is an object with the text values and style settings for a submitted ad

    $.ajax({
      url: parseSettings.address,
      type: 'POST',
      headers: parseSettings.headers,
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
      url: parseSettings.address,
      type: 'GET',
      headers: parseSettings.headers,
      contentType: 'application/json',
      success: function (data) {
/*         console.log('Feast Your Eyes On This!'); */
        callback(data);
      },
      error: function(xhr, status, errorThrown) {
        console.log('Sorry, but we could not fetch any messages.');
      }
    });
  };



var incrementAdViewCount = function (adObjectID,callback) {
// ad is an object with the text values and style settings for a submitted ad
    console.log('Incrementing to: ',parseSettings.address + adObjectID);
    console.log(parseSettings.headers);

    $.ajax({
      url: parseSettings.address + '/' + adObjectID,
      type: 'PUT',
      headers: parseSettings.headers,
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
};


var parseSettings = {
  headers : {
    "X-Parse-Application-Id": "pFPhY4IgGeg9xzz9T2Nlwp0uVnwY5poF1tduiBPm",
    "X-Parse-REST-API-Key": "NXyEtXaN81pZbET54tJxyvbhZ7U4KjWat3IlESjG"
  },
  address : 'https://api.parse.com/1/classes/Ad'

};

var stylings = {
  adUnitBackgroundColor: 'blue',
  adUnitFontColor:'white',
  adUnitLogo: 'HackReactor',
  adUnitLogoPlacement: 'bottom-right',
  adUnitFontSize: '32px'

};


    /*
Application ID: pFPhY4IgGeg9xzz9T2Nlwp0uVnwY5poF1tduiBPm
Client Key: GK3xEiJ3QJKqAOCEONxsIn3JmnrfreoAbLFt9Vf9
Javascript Key: hT5mDLt92uke5hmUKu4UcjRugbpJpOTzl8ShMnMc
.NET Key: GPniWyo9uOw98ZWQMY4iWlSL5yeNtXfCOyCgpQoS
REST API Key: NXyEtXaN81pZbET54tJxyvbhZ7U4KjWat3IlESjG
Master Key: 6cWCDkv5BriPUkug2jlgExrZ1eE9eKZjlOMVSj94
*/