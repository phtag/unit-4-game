

var StarWarsGame = {
    characterImages: ["Star-Wars-avatars-Movie-Luke-Skywalker-lightning.jpg",
                    "Star-Wars-avatars-Movie-Obi-Wan-Kenobi-Alec-Guinness.jpg",
                    "Star-Wars-avatars-Movie-Obi-Wan-Kenobi-Ewan-McGregor.jpg",
                    "Star-Wars-avatars-Movie-Emperor-Papaltine-Darth-Sidious.jpg",
                    "Star-Wars-avatars-Movie-Darth-Vader.jpg",
                    "Star-Wars-avatars-Movie-Count-Dooku.jpg"],
    characterNames: ["Luke Skywalker",
                    "Ben Kenobi",
                    "Obi Wan Kenobi",
                    "Darth Sidious",
                    "Darth Vader",
                    "Count Dooku"]
}

var characters = $("#characters");
var charactersRowHeading = $(".my-characters-row-heading");
var selectedCharacter = $("#selected-character");
var enemiesToAttack = $("#enemies-to-attack");
var myEnemiesRowHeading = $(".my-enemies-row-heading");
myEnemiesRowHeading.html("");
for (i=0;i<StarWarsGame.characterImages.length;i++) {
    var imageContainer = $('<div class="image-container">');
    var characterImage = $('<img class="img-responsive character-images">');
    imageContainer.append(characterImage);
    characters.append(imageContainer);
    // characters.append(characterImage);
    characterImage.attr('src', "assets/images/" + StarWarsGame.characterImages[i]);
    characterImage.attr('character', StarWarsGame.characterNames[i]);
    // letterBtn.text(letters[i]);
}
$('.character-images').on("click", function(){
    var imageContainer = $('<div class="image-container" <span style="color:blue;font-size:10px;top:-10px">12345</span>'); 
    var characterImage = $('<img class="img-responsive character-images">');
    imageContainer.append(characterImage);

    selectedCharacter.html("");    // clear existing attributes and content for the div
    selectedCharacter.append(imageContainer);
    selectedCharacter.append('Your character');
    characterImage.attr('src', $(this).attr('src'));

    characters.html("");
    charactersRowHeading.html("");
    //  move the enemies to attack into position
    enemiesToAttack.html("");
    myEnemiesRowHeading.html("Enemies available to attack");
    for (i=0;i<StarWarsGame.characterImages.length;i++) {
        if ($(this).attr('src') != "assets/images/" + StarWarsGame.characterImages[i]) {
            var imageContainer = $('<div class="image-container">');
            var characterImage = $('<img class="img-responsive character-images">');
            imageContainer.append(characterImage);
            enemiesToAttack.append(imageContainer);
                characterImage.attr('src', "assets/images/" + StarWarsGame.characterImages[i]);
                characterImage.attr('character', StarWarsGame.characterNames[i]);    
        }
    }
});

    