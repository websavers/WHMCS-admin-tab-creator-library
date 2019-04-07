You must create a [WHMCS addon module](https://developers.whmcs.com/addon-modules/) for this to work. Include the busyrack_admin_tabs.js file in the module's templates/js folder (optional location, but that's WHMCS's preferred standardized location for module javascript). Then add the following to your module's hooks.php file with the following edits:
- You'll probably want to change the 'my_tab_name' values throughout
- You will need to change 'my_module_name'
- If you intend to insert your tab into the supportickets pages, the conditional that compares `$vars['filename']` should be changed from 'clients' to 'supporttickets'.
- The [sample addon module](https://github.com/WHMCS/sample-addon-module) provided by WHMCS on Github also includes an admin controller class. In this controller, you can use a function like `getlist()` (or whatever name you wish) and that function would handle the AJAX response to br_loadBZTab() found below (which calls 'getlist', but you can modify that if you wish).

```
add_hook("AdminAreaFooterOutput", 10, function($vars){
    
  if (substr($vars['filename'], 0, 7) == 'clients' && $vars['filename'] != 'clients'){ //only include on clients* pages (like clientssummary)
    
    $userid = (empty($_REQUEST['userid']))? 0:$_REQUEST['userid'];
    $refid = (empty($_REQUEST['id']))? 0:$_REQUEST['id'];

    return "<script src='{$vars['WEB_ROOT']}/modules/addons/my_module_name/templates/js/busyrack_admin_tabs.js'></script>\n";
<script>
    var target = 'my_tab_name';
    var userid = $userid;
    var refid = $refid;
    var position = 9;
    br_injectTab('my_tab_name', '{$vars['filename']}', position);
    
    jQuery(document).ready(function($){
      $('#my_tab_name').click(function(){
        br_loadBZTab('my_tab_name', 'my_tab_name_content', 'getlist', 0, function(){
          //put your javascript code to run after loading the tab here.
        });
      });
    });
      
      //On page load
      if (window.location.href.indexOf('#my_tab_name') > -1){
        $('#my_tab_name').click(); //switch to tab
      }
      
    });
    </script>";
  }

});
```

**Huge thanks to the folks at [BusyRack](https://www.busyrack.com) for allowing me to modify and publish their tab insertion javascript.
