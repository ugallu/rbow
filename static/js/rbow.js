// set links
$(function(){

  $("#logout_btn").on("click", function(){
    window.location.href = "/index.html";
  });
  // set menu
  $('#tables_btn').on("click",function(){
    $( "#content" ).load( "content/tables.html", onTableLoad);
  });
  $('#functions_btn').on("click",function(){
    $( "#content" ).load( "content/functions.html");
  });
  $('#mystuff_btn').on("click",function(){
    $( "#content" ).load( "content/mystuff.html");
  });
  $('#addtable_btn').on("click",function(){
    $( "#content" ).load( "content/addtable.html");
  });
  $('#addfunction_btn').on("click",function(){
    $( "#content" ).load( "content/addfunction.html");
  });
  $('#profile_btn').on("click",function(){
    $( "#content" ).load( "content/profile.html");
  });

  $(".popup .close").on("click",function(){
    $(".popup").hide();
  });

  // on index load:
  $( "#content" ).load( "content/tables.html", onTableLoad);

  function onTableLoad(){
      // dev purpose
      $('.table_view_btn').on("click",function(){
        $( "#content" ).load( "content/table.html", function(){
            $('.chunk').on("click",function(){
              $( "#content" ).load( "content/chunk.html", function(){

              });
            });
        });

      });
  }
});
