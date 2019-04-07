function br_updateCounter(tableid) {
    var counter = $(tableid + "tbody tr:not(.none)").length;
    $(".br_counter").text("(" + counter + ")");
}

// Adds the tab to the page
function br_injectTab(name, pagename, position) {
  var css_name = name.replace(" ", "_");
  var error = false;
  
  if ($("ul[role='tablist']").length > 0) {
      $("ul[role='tablist'] li:nth-child(" + position + ")").before(
          '<li><a href="#' + css_name + '_content" id="' + css_name + '" role="tab" data-toggle="tab">'+ name + '</a></li>'
      );
  } else {
      error = true;
  }
  
  if (pagename.includes("clients")){
    target = '.tab-content.client-tabs';
  }
  else if (pagename == 'supporttickets'){
      target = '.tab-content.admin-tabs';
  }
  else{ target = null; }

  if ($(target).length > 0) {
      $(target).append( // WHMCS 6+ blend template
          '<div class="tab-pane" id="' + css_name + '_content"><div id="tab_content"><i class="fas fa-spinner fa-spin"></i> Loading...</div></div>'
      );
  } else {
      error = true;
  }
  
  if (error) console.error('busyrack_admin_tabs.js: unsupported admin template.');
}
// Shows the tab content
function br_loadBZTab(module_name,target,type,offset,callback) {
    location.hash = '#'+target;
    $.post("addonmodules.php?module=" + module_name + "&action="+type, { 
        action: type, 
        id: refid, 
        userid: userid,
        target: target, 
        offset: offset 
    }).done(function(data){
      if ($('#' + target + " #tab_content").length > 0) {
          $('#' + target + " #tab_content").html(data);
      } else if ($("#tab"+target+"box #tab_content").length > 0) {
          $("#tab"+target+"box #tab_content").html(data);
      }
      callback(data);
    }).fail(function(error){
      console.log(error.responseText);
      if ($('#' + target + " #tab_content").length > 0) {
          $('#' + target + " #tab_content").html(error.responseText);
      }
    });
}