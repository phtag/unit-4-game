

var StarWarsGame = {
    playerImages: ["Star-Wars-avatars-Movie-Luke-Skywalker-lightning.jpg",
                    "Star-Wars-avatars-Movie-Obi-Wan-Kenobi-Alec-Guinness.jpg",
                    "Star-Wars-avatars-Movie-Obi-Wan-Kenobi-Ewan-McGregor.jpg",
                    "Star-Wars-avatars-Movie-Emperor-Papaltine-Darth-Sidious.jpg",
                    "Star-Wars-avatars-Movie-Darth-Vader.jpg",
                    "Star-Wars-avatars-Movie-Count-Dooku.jpg"],
    playerNames: ["Luke Skywalker",
                    "Ben Kenobi",
                    "Obi Wan Kenobi",
                    "Darth Sidious",
                    "Darth Vader",
                    "Count Dooku"]
}

var avatars = $("#avatars");
var player = $("#player");
for (i=0;i<StarWarsGame.playerImages.length;i++) {
    var avatarImage = $('<img class="img-responsive player-images">');
 
    avatars.append(avatarImage);
    avatarImage.attr('src', "assets/images/" + StarWarsGame.playerImages[i]);
    avatarImage.attr('avatar', StarWarsGame.playerNames[i]);
    // letterBtn.text(letters[i]);
}
$('.player-images').on("click", function(){
    var playerImage = $('<img class="img-responsive player-images">');
    player.html("");    // clear existing attributes and content for the div
    player.append(playerImage);
    playerImage.attr('src', $(this).attr('src'));
});

    