$(function() {
    //
    
    $(".delquiz").on("click", function(event) {

    var id = $(this).data("id");
      alert(id); 
      alert("/quiz/delete/" + id);
       
    //Send the DELETE request.
    $.ajax("/quiz/delete/" + id, {
      type: "GET"
    }).then(
      function() {
        
        console.log("deleted id ", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
    
  }
  );
  
  ////////////////Next
  //   $("#bt").on("click", function(event) {

   
  //     alert("Yes" );
       
   
  //   $.ajax("/quiz/results", {
  //     type: "POST"
  //   }).then(
  //     function() {
        
  //       console.log("deleted id ", id);
  //       // Reload the page to get the updated list
  //       location.reload();
  //     }
  //   );
    
  // }
  // );
 
/////////////////begin
});