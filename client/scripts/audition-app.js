
var initializer = true;

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

var basicBackgroundColorPalette = ['#225533',
'#44bbcc',
'#88dddd',
'#bbeeff',
'#0055bb',
'#334433',
'#6699aa',
'#88aaaa',
'#aacccc',
'#447799'
];



var adArray;

// jQuery stuff
$(document).ready(function() {


  for(var x=0;x<basicBackgroundColorPalette.length;x++) {
    $('.palette-background').append('<li class="palette-small-box" style="background-color:'+ basicBackgroundColorPalette[x] +' ">');
  }



  // Initialize a few things
  $('.upVote').text('Awesome');
  $('.noVote').text('Meh.  What\'s next?');
  $('.downVote').text('This... this sucks.');

  $('.creative').css({'background-color': stylings.adUnitBackgroundColor,
  'color': stylings.adUnitFontColor,
  'font-size': stylings.adUnitFontSize});

  // load ads
  getAds(listAds);

  // increment view count on click
  // also need to load ad display
  $('.list-ad-items').on('click','a.link-ad',function(e) {
    e.preventDefault();
    var $element = $(this);
    putAd($element.data('specialLink'),'views');
    getAd($element.data('specialLink'),displayAd);
  });

  $('.upVote').on('click',function(e) {
    e.preventDefault();
    var $element = $(this);
    putAd($element.data('specialLink'),'upVote');
  });

  $('.noVote').on('click',function(e) {
    e.preventDefault();
    var $element = $(this);
    console.log(adArray);
    var nextAd = Math.floor(Math.random() * adArray.results.length);
    console.log(adArray.results[nextAd].objectId);
    getAd(adArray.results[nextAd].objectId,displayAd);
  });

  $('.downVote').on('click',function(e) {
    e.preventDefault();
    var $element = $(this);
    putAd($element.data('specialLink'),'downVote');
  });

  $('button.button-submit').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    var adObj = {
      selectorValue: $('input.form-entry-selector').val(),
      verbValue: $('input.form-entry-verb').val()
    };

    adObj.adTextValue = adObj.selectorValue.split(' ').join('-') + '-' + adObj.verbValue.split(' ').join('-');

    $('input.form-entry-selector').empty(),
    $('input.form-entry-verb').empty()

    // send it to parse
    sendAd(adObj,getAd);
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
        styling: {
          adUnitBackgroundColor: 'blue',
          adUnitFontColor:'white',
          adUnitLogo: 'HackReactor',
          adUnitLogoPlacement: 'bottom-right',
          adUnitFontSize: '32px'
        },
        urlCode: ad.adTextValue,
        upVote: 0,
        downVote: 0,
        views: 0,
        userID: null
      }),
      contentType: 'application/json',
      success: function (data) {
        // reload listing of ads
        getAds(listAds);
        console.log(data.objectId);
        callback(data.objectId,callback);

        console.log('Message Saved!');
        console.log('POST: ',data);
/*           callback(message); */
      },
      error: function (data) {
        console.log('Error:', data);
      }
    });
  };

var getAd = function (adObjectID,callback) {
// ad is an object with the text values and style settings for a submitted ad
  console.log(adObjectID);

  $.ajax({
    url: parseSettings.address + '/' + adObjectID,
/*     data: 'order=-views', */
    type: 'GET',
    headers: parseSettings.headers,
    contentType: 'application/json',
    success: function (data) {
      console.log('Single Ad Retrieved');
      console.log(data);
      displayAd(data);


/*
       callback(data,function() {
          console.log('Callback to display from getAd');
          displayAd(data.objectId);
        });
*/
    },
    error: function(xhr, status, errorThrown) {
      console.log('Sorry, but we could not fetch this ad.');
    }
  });
};

var getAds = function (callback) {
// ad is an object with the text values and style settings for a submitted ad

  $.ajax({
    url: parseSettings.address,
    data: 'order=-views',
    type: 'GET',
    headers: parseSettings.headers,
    contentType: 'application/json',
    success: function (data) {
      console.log(data);
/*         console.log('Feast Your Eyes On This!'); */
      callback(data);
    },
    error: function(xhr, status, errorThrown) {
      console.log('Sorry, but we could not fetch any messages.');
    }
  });
};



var putAd = function (adObjectID,incrementingValue,callback) {
// ad is an object with the text values and style settings for a submitted ad

  var dataValue = {};
  dataValue[incrementingValue] = {__op:"Increment",amount:1};

  $.ajax({
    url: parseSettings.address + '/' + adObjectID,
    type: 'PUT',
    headers: parseSettings.headers,
    data: JSON.stringify(dataValue),
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


var displayAd = function(adObject) {
  console.log('In Display Ad');
  console.log(adObject);
  // Display ad regardless of whether the object has returned from the server
  var selectorDisplay = adObject.selector/*  || $('input.form-entry-selector').val() */;
  var verbDisplay = adObject.verb/*  || $('input.form-entry-verb').val() */;

  console.log(adObject.objectId);


  $('.creative').data('special-link',adObject.objectId);
  $('.upVote').data('special-link',adObject.objectId);
  $('.downVote').data('special-link',adObject.objectId);
  $('.noVote').data('special-link',adObject.objectId);
    console.log($('.creative').data());

    if(selectorDisplay === '') {
      $('.creative-text').text('').append('.' +verbDisplay);
    } else {
      $('.creative-text').text('').append('$(\'' + selectorDisplay + '\').' +verbDisplay);
    }

}

// helper function to build links with unique data values
var linkMaker = function(linkCode, displayText) {
  return ['<a href="#" class="link-ad" data-special-link="', linkCode, '">',displayText,'</a>'].join('');
};

var listAds = function(data) {
  // remove everything from list
  adArray = data;

  $('.list-ad-items').empty();

  for(var i=0;i<data.results.length;i++) {
    var adDisplayText = data.results[i].selector + ' ' + data.results[i].verb;
    $('.list-ad-items').append('<li class="link-container">' + linkMaker(data.results[i].objectId,adDisplayText) + '<span class="view-badge">&nbsp;' + data.results[i].views + '&nbsp;</span>');
  }
};

// these will be environmental variables once I bolt this to a server
    /*
Application ID: pFPhY4IgGeg9xzz9T2Nlwp0uVnwY5poF1tduiBPm
Client Key: GK3xEiJ3QJKqAOCEONxsIn3JmnrfreoAbLFt9Vf9
Javascript Key: hT5mDLt92uke5hmUKu4UcjRugbpJpOTzl8ShMnMc
.NET Key: GPniWyo9uOw98ZWQMY4iWlSL5yeNtXfCOyCgpQoS
REST API Key: NXyEtXaN81pZbET54tJxyvbhZ7U4KjWat3IlESjG
Master Key: 6cWCDkv5BriPUkug2jlgExrZ1eE9eKZjlOMVSj94
*/