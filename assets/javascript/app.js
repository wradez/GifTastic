var topics = ["Monster Hunter World", "Runescape", "League of Legends", "Overwatch", "Wakfu", "Kingdom Hearts", "PUBG", "Dark Souls", "Rachet and Clank", "Horizon Zero Dawn", "Shadow of the Colossus"];

$("body").on("click", ".button", function(){
    var search = $(this).attr("data-name");
    console.log(search);
    renderGifs(search);
});

$("body").on("click", ".gif", function() {


      var state = $(this).attr("data-state");


      if(state == "still"){
        $(this).attr("src", $(this).attr("data-animated"));
        $(this).attr("data-state", "animate");
      }else{
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }

  });

$("body").on("click", "#searchButton", function(){
    event.preventDefault();
    var newButton = $("#search-terms").val();
    topics.push(newButton);
    renderButtons();
});

function renderGifs(search){
    var queryUrl= "https://api.giphy.com/v1/gifs/search?apikey=y7nsZ4PAvM7YYmscxh8RDdA7OnNfMqT1&q=" + search + "&limit=10";

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then( function(response){
    
        for(var i = 0; i < 10; i++){
            var imgDiv = $("<div class='card-body'>");
            var rating = response.data[i].rating;
            var stillUrl = response.data[i].images.fixed_height_still.url;
            var animatedUrl = response.data[i].images.fixed_height.url;
            var image = $("<img src='" + stillUrl + "' >").attr("id", response.data[i].id).addClass("gif card-body").attr("data-still", stillUrl).attr("data-animated", animatedUrl).attr("data-state", "still");
            // var favorite = $("<img src='../images/favorite.png'>").attr("id", response.data[i].id);

            imgDiv.append("<p> Rating " + rating.toUpperCase()).append(image);
            imgDiv.append(image);
            
            $("#results").prepend(imgDiv);
    
        }
    });
}


function renderButtons() {

    $("#buttons").empty();

    for (var i = 0; i < topics.length; i++) {

      var topicButton = $("<button>");
      topicButton.addClass("button btn btn-dark");
      topicButton.attr("data-name", topics[i]);
      topicButton.text(topics[i]);
      $("#buttons").append(topicButton);
      $("#buttons").append(" ");
    }
  }

renderButtons();