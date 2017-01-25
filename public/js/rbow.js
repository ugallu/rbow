// set links
$(function(){
console.log("e");

  $("#logout_btn").on("click", function(){
    $("#logoutform").submit();
  });
  // set menu
  $('#tables_btn').on("click",function(){
    $( "#content" ).load( "/content/tables", onTableLoad);
    history.pushState('', 'Title', '/tables');
  });
  $('#functions_btn').on("click",function(){
    $( "#content" ).load( "/content/functions", function( response, status, xhr ) {
      if ( xhr.status >=300 ) {
        location.redirect("/");
      }
    });
    history.pushState('', 'Title', '/functions');
  });
  $('#mystuff_btn').on("click",function(){
    $( "#content" ).load( "/content/mystuff", function( response, status, xhr ) {
      if ( xhr.status >=300 ) {
        location.redirect("/");
      }
    });
    history.pushState('', 'Title', '/mystuff');
  });
  $('#addtable_btn').on("click",function(){
    $( "#content" ).load( "/content/addtable", function( response, status, xhr ) {
      if ( xhr.status >=300 ) {
        location.redirect("/");
      }
    });
    history.pushState('', 'Title', '/addtable');
  });
  $('#addfunction_btn').on("click",function(){
    $( "#content" ).load( "/content/addfunction", function( response, status, xhr ) {
      if ( xhr.status >=300 ) {
        location.redirect("/");
      }
    });
    history.pushState('', 'Title', '/addfunction');
  });
  $('#profile_btn').on("click",function(){
    $( "#content" ).load( "/content/profile", function( response, status, xhr ) {
      if ( xhr.status >=300 ) {
        location.redirect("/");
      }
    });
    history.pushState('', 'Title', '/profile');
  });

  $(".popup .close").on("click",function(){
    $(".popup").hide();
  });

  // on index load:
  var currentPage = document.URL;
  currentPage = currentPage.slice(currentPage.lastIndexOf('/') + 1);
  $( "#content" ).load( "/content/" + currentPage, onTableLoad);

  function onTableLoad( response, status, xhr ){
      if(status >= 300){
        location.redirect("/");
      }
      // dev purpose
      $('.table_view_btn').on("click",function(){
        $( "#content" ).load( "/content/table/" + $(this).attr('data-id'), function(){
            $('.chunk').on("click",function(){
              $( "#content" ).load( "/content/chunk/" + $(this).attr('data-id'), function(){

              });
            });
        });

      });
      reloadProcessList();

      $('.table_add').on("click",function(){
        $.post("/table/" + $(this).attr("data-id") + "/addToList",
          {},
          function(data, status){
            reloadProcessList();
          });
      });

      $('#processing_button').on("click",function(){
        stopProcess();
      })

  }
});

var processing = false;

function startProcess(tableName){
  processing = true;
  $("#processing_status").text(tableName);
  $("#processing_button").attr("class", "fa fa-play");

}

function stopProcess(){
  processing = false;
  $("#processing_status").text("");
  $("#processing_button").attr("class", "fa fa-stop");
}

function process(tableID, tableName){
    startProcess(tableName);
    $.get("/block/" + tableID, function(data, status){
      // block exists
      if(data.block != undefined){

        var blockID = data.block._id;
        var parameters = data.block.parameters;
        var code = data.table._function.code;
        var result = eval(code);
        $.post("/block/" + blockID,
          {
            result: result,

          },
          function(data, status){
            if(processing){
              process(tableID);
            }
            else{
              stopProcess();
            }
          });
      }
      else{
        stopProcess();
      }

    });
}

function reloadProcessList(){

        $.get("/user/processlist", function(data, status){
          $("#processor_list_ul").empty();
          var tables = data;
          for(var table in data.processlist._tables){
            var tab = data.processlist._tables[table];
            console.log(data.processlist._tables[table]);
            var li = document.createElement("li");
            var tableName = document.createElement("div");
            $(tableName).addClass("tableName");
            tableName.innerHTML = tab.name;

            var playicon = document.createElement("div");
            $(playicon).addClass("fa fa-play");

            var deletet = document.createElement("div");
            $(deletet).addClass("fa fa-times last");
            $(li).attr("data-id", tab._id);

            $(li).on("click",function(){
              process($(li).attr("data-id"), $(li).find(".tableName").text());
            });


            $(deletet).on("click",function(e){
              e.stopPropagation();
              $.post("/table/" + $(this).parent().attr("data-id") + "/removeFromList",
                {},
                function(data, status){
                  reloadProcessList();
                });
            });

            $(li).append(tableName);
            $(li).append(playicon);
            $(li).append(deletet);
            $("#processor_list_ul").append(li);
          }
        });
}
