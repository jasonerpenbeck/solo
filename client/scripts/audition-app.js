
var initializer = true;

var parseSettings = {
  headers : {
    "X-Parse-Application-Id": "pFPhY4IgGeg9xzz9T2Nlwp0uVnwY5poF1tduiBPm",
    "X-Parse-REST-API-Key": "NXyEtXaN81pZbET54tJxyvbhZ7U4KjWat3IlESjG"
  },
  address : 'https://api.parse.com/1/classes/Ad'
};

var styling = styling || {
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

var basicFontPalette = [
'#F0F8FF',
'#FAEBD7',
'#00FFFF',
'#7FFFD4',
'#F0FFFF',
'#F5F5DC',
'#FFE4C4',
'#000000',
'#FFEBCD',
'#0000FF',
'#8A2BE2',
'#A52A2A',
'#DEB887',
'#5F9EA0',
'#7FFF00',
'#D2691E',
'#FF7F50',
'#6495ED',
'#FFF8DC',
'#DC143C',
'#00FFFF',
'#00008B',
'#008B8B',
'#B8860B',
'#A9A9A9',
'#006400',
'#BDB76B',
'#8B008B',
'#556B2F',
'#FF8C00',
'#9932CC',
'#8B0000',
'#E9967A',
'#8FBC8F',
'#483D8B',
'#2F4F4F',
'#00CED1',
'#9400D3',
'#FF1493',
'#00BFFF',
'#696969',
'#1E90FF',
'#B22222',
'#FFFAF0',
'#228B22',
'#FF00FF',
'#DCDCDC',
'#F8F8FF',
'#FFD700',
'#DAA520',
'#808080',
'#008000',
'#ADFF2F',
'#F0FFF0',
'#FF69B4',
'#CD5C5C',
'#4B0082',
'#FFFFF0',
'#F0E68C',
'#E6E6FA',
'#FFF0F5',
'#7CFC00',
'#FFFACD',
'#ADD8E6',
'#F08080',
'#E0FFFF',
'#FAFAD2',
'#D3D3D3',
'#90EE90',
'#FFB6C1',
'#FFA07A',
'#20B2AA',
'#87CEFA',
'#778899',
'#B0C4DE',
'#FFFFE0',
'#00FF00',
'#32CD32',
'#FAF0E6',
'#FF00FF',
'#800000',
'#66CDAA',
'#0000CD',
'#BA55D3',
'#9370DB',
'#3CB371',
'#7B68EE',
'#00FA9A',
'#48D1CC',
'#C71585',
'#191970',
'#F5FFFA',
'#FFE4E1',
'#FFE4B5',
'#FFDEAD',
'#000080',
'#FDF5E6',
'#808000',
'#6B8E23',
'#FFA500',
'#FF4500',
'#DA70D6',
'#EEE8AA',
'#98FB98',
'#AFEEEE',
'#DB7093',
'#FFEFD5',
'#FFDAB9',
'#CD853F',
'#FFC0CB',
'#DDA0DD',
'#B0E0E6',
'#800080',
'#FF0000',
'#BC8F8F',
'#041690',
'#8B4513',
'#FA8072',
'#F4A460',
'#2E8B57',
'#FFF5EE',
'#A0522D',
'#C0C0C0',
'#87CEEB',
'#6A5ACD',
'#708090',
'#FFFAFA',
'#00FF7F',
'#4682B4',
'#D2B48C',
'#008080',
'#D8BFD8',
'#FF6347',
'#40E0D0',
'#EE82EE',
'#F5DEB3',
'#FFFFFF',
'#F5F5F5',
'#FFFF00',
'#9ACD32'
];


var adArray;

// jQuery stuff
$(document).ready(function() {

  // Initialize Background Palette
  for(var x=0;x<basicBackgroundColorPalette.length;x++) {
    $('.palette-background').append('<li class="palette-small-box" style="background-color:'+ basicBackgroundColorPalette[x] +' ">');
  }

  // Initialize Font Palette
  for(var x=0;x<basicFontPalette.length;x++) {
    $('.palette-font').append('<li class="palette-small-box" style="background-color:'+ basicFontPalette[x] +' ">');
  }

  $('.palette-background').on('click','.palette-small-box',function(e) {
    e.preventDefault();
    var $element = $(this);
    console.log($element.attr('style').split(':')[1]);
    var clickedColor = $element.attr('style').split(':')[1].trim();
    styling.adUnitBackgroundColor = clickedColor;
/*     console.log(clickedColor); */
    $('.creative').removeAttr('style').css({
      'background-color': styling.adUnitBackgroundColor,
      'color': styling.adUnitFontColor,
      'font-size': styling.adUnitFontSize
      });

  });

  $('.palette-font').on('click','.palette-small-box',function(e) {
    e.preventDefault();
    var $element = $(this);
    console.log($element.attr('style').split(':')[1]);
    var clickedColor = $element.attr('style').split(':')[1].trim();
    styling.adUnitFontColor = clickedColor;
     console.log(styling.adUnitFontColor);
    $('.creative').removeAttr('style').css({
      'background-color': styling.adUnitBackgroundColor,
      'color': styling.adUnitFontColor,
      'font-size': styling.adUnitFontSize
      });

  });



  // Initialize a few things
  $('.upVote').text('Awesome');
  $('.noVote').text('Meh.  What\'s next?');
  $('.downVote').text('This... this sucks.');

  $('.creative').css({'background-color': styling.adUnitBackgroundColor,
  'color': styling.adUnitFontColor,
  'font-size': styling.adUnitFontSize});

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
        styling: styling,
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
  console.log(adObject.styling);
  styling = adObject.styling;
  console.log(styling);

  $('.creative').data('special-link',adObject.objectId);
  $('.upVote').data('special-link',adObject.objectId);
  $('.downVote').data('special-link',adObject.objectId);
  $('.noVote').data('special-link',adObject.objectId);
    console.log($('.creative').data());

  $('.creative').removeAttr('style').css({
  'background-color': styling.adUnitBackgroundColor,
  'color': styling.adUnitFontColor,
  'font-size': styling.adUnitFontSize
  });

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