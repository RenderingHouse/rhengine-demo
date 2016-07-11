var _selections = {};
var _rendering = false;

$(document).ready(function () {
  $('[data-toggle="offcanvas"]').click(function () {
    $('.row-offcanvas').toggleClass('active')
  });

  // retrieve data
  getData();

});

var constructHeader = function(pal) {
  var panelHdrId = 'paletteHdr' + pal.id;
  var panelItemId = 'paletteItem' + pal.id;
  var heading =               
    '<div class="panel-heading" role="tab" id="' + panelHdrId + '">' +
    '<h4 class="panel-title">' +
    '<a role="button" data-toggle="collapse" data-parent="#accordion" href=' + '"#' + panelItemId + '" ' +
    'aria-expanded="true" aria-controls="' + panelItemId + '">' +
    pal.name +
    '</a>' +
    '</h4>' +
    '<div class="swatch sm"></div>' +
    '</div>';
  return $(heading);
}

var constructItem = function(pal, baseUrl) {
  var panelHdrId = 'paletteHdr' + pal.id;
  var panelItemId = 'paletteItem' + pal.id;

  var content = $('<div>').attr({'class': 'panel-body', 'data-id': pal.id});
  var options = pal.options;
  for (var i = 0; i < options.length; i++) {
    var opt = options[i];
    var optItem = $('<div>').attr({'class': 'swatch', 'data-id': opt.id});
    if (opt.swatch) {
      optItem.css({'background-image': 'url(' + baseUrl + opt.swatch + ')'});
    }
    else {
      optItem.css({'background-color': '#' + opt.hex});
    }
    content.append(optItem);
  }

  var item = $('<div id="' + panelItemId + '" class="panel-collapse collapse" role="tabpanel"' + 
  'aria-labelledby="' + panelHdrId + '"></div>');
  item.append(content);
  return item;
};

var displayImage = function() {
  $('.spinner').removeClass('inactive');
  _rendering = true;
  $('body').addClass('wait-on-rendering');
  // make an API call to display the exterior image
  var api = 'http://rendering.house/api/v1/ext/demo/nbr/Hamptons%20at%20Umstead/plan/Oakwood/elev/B/palette?';
  var pals = '';
  var sels = '';
  for (var selected in _selections) {
    pals += selected + ',';
    sels += _selections[selected] + ',';
  }
  pals = pals.substring(0, pals.length-1);
  sels = sels.substring(0, sels.length-1);
  api += 'pal=' + pals + '&sel=' + sels + '&o=uri&w=740';

  var xhr = new XMLHttpRequest();
  xhr.open("get", api, true);
  xhr.onload = function(){  //instead of onreadystatechange
    //do something
    if (xhr.status === 200) {
      try {
        $('#main-image').attr({'src': xhr.response});
        $('.spinner').addClass('inactive');
        _rendering = false;
        $('body').removeClass('wait-on-rendering');
      } catch (ex) {  
        console.log(ex);
      }
    }
  };
  xhr.onerror = function() {
    console.log('network error');
    _rendering = false;
    $('body').removeClass('wait-on-rendering');
  };
  xhr.send();

};

var getData = function() {
  var api = '//rendering.house/api/v1/info/demo/nbr/Hamptons%20at%20Umstead/plan/Oakwood/elev/B';

  var xhr = new XMLHttpRequest();
  xhr.open("get", api, true);
  xhr.onload = function(){  //instead of onreadystatechange
    //do something
    if (xhr.status === 200) {
      try {
        var data = JSON.parse(xhr.response);
        // populate side panel
        populateAccordion(data);
        handleClicks();       
        initSelections(data);
        displayImage();
      } catch (ex) {  
        console.log(ex);
      }
    }
  };
  xhr.onerror = function() {
    console.log('network error');
  };
  xhr.send();
};

var handleClicks = function() {
  $('.swatch').click(function(ev) {
    if (_rendering) {
      // no action
      return;
    }
    $(this).parent().children('.swatch').removeClass('active');
    $(this).addClass('active');
    var paletteHdrSwatch = $('#paletteHdr' + $(this).parent().attr('data-id') + ' .swatch');
    if ($(this).css('background-image') !== 'none') {
      paletteHdrSwatch.css({'background-image': $(this).css('background-image')});
    }
    else {
      paletteHdrSwatch.css({'background-color': $(this).css('background-color')});
    }
    updateSelections($(this).parent().attr('data-id'), $(this).attr('data-id'));
  });
}

var initSelections = function(data) {
  _selections = {};
  var palettes = data.palettes;
  $.each(palettes, function(i, pal) {
    _selections[pal.id] = pal.options[0].id;
  });

  for (var selected in _selections) {
    var swatch =  $('.swatch[data-id="' + _selections[selected] + '"]');
    swatch.parent().children('.swatch').removeClass('active');
    swatch.addClass('active');
    var paletteHdrSwatch = $('#paletteHdr' + swatch.parent().attr('data-id') + ' .swatch');
    if (swatch.css('background-image') !== 'none') {
      paletteHdrSwatch.css({'background-image': swatch.css('background-image')});
    }
    else {
      paletteHdrSwatch.css({'background-color': swatch.css('background-color')});
    }
  }
};

var populateAccordion = function(data) {
  var group = $('#accordion');
  var palettes = data.palettes;
  $.each(palettes, function(i, pal) {
    var parent = $('<div>').attr({'class': 'panel panel-default'});
    var heading = constructHeader(pal);    
    parent.append(heading);
    var item = constructItem(pal, data.baseUrl);
    parent.append(item);
    group.append(parent);
  });
}

var updateSelections = function(palId, selectionId) {
  _selections[palId] = selectionId;
  displayImage();
}
