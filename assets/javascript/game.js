

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
                    "Count Dooku"],
    characterAttackPower: [6, 8, 4, 7, 10, 2],
    characterCounterAttackPower: [10, 2, 6, 12, 5]
}

var characters = $("#characters");
var charactersRowHeading = $(".my-characters-row-heading");
var selectedCharacter = $("#selected-character");
var enemiesToAttack = $("#enemies-to-attack");
var defender = $(".defender");
var myEnemiesRowHeading = $(".my-enemies-row-heading");
var HealthPoints = [];
var selectedCharacterIndex = -1;
var selectedDefenderIndex = -1;

myEnemiesRowHeading.html("");
for (i=0;i<StarWarsGame.characterImages.length;i++) {
    HealthPoints[i] = Math.floor(Math.random()*100) + 19;
    var imageContainer = $('<div class="image-container" <span id="character-names-label">' + StarWarsGame.characterNames[i] + '</span>');
    var characterImage = $('<img class="img-responsive character-images">');
    var endDiv = $('<div <span id="health-points">' + HealthPoints[i] + '</span>');
    imageContainer.append(characterImage);
    imageContainer.append(endDiv);
    characters.append(imageContainer);
    // characters.append(characterImage);
    characterImage.attr('src', "assets/images/" + StarWarsGame.characterImages[i]);
    characterImage.attr('character', StarWarsGame.characterNames[i]);
    characterImage.attr('index', i);

    // letterBtn.text(letters[i]);
}
$('.character-images').on("click", function(){
    var characterIndex = Number($(this).attr('index'));
    selectedCharacterIndex = characterIndex;
    updateAttackerDisplay(characterIndex);
    // var imageContainer = $('<div class="image-container-your-character" <span id="character-names-label">' + StarWarsGame.characterNames[characterIndex] + '</span>');
    // var characterImage = $('<img class="img-responsive character-images">');
    // var endDiv = $('<div <span id="health-points">' + HealthPoints[characterIndex] + '</span>');
 
    // imageContainer.append(characterImage);
    // imageContainer.append(endDiv);
    // selectedCharacter.html("");    // clear existing attributes and content for the div
    // selectedCharacter.append(imageContainer);
    // // selectedCharacter.append('Your character');
    // characterImage.attr('src', $(this).attr('src'));

    characters.html("");
    charactersRowHeading.html("");
    //  move the enemies to attack into position
    enemiesToAttack.html("");
    myEnemiesRowHeading.html("Enemies available to attack");
  
    updateEnemiesToAttackDisplay(selectedCharacterIndex, selectedDefenderIndex);
});
// QUESTION: Why does this event handler NOT get triggered???
$('.character-images-enemies').on("click", function(){
    alert("Hello-2");
});

$(document).on('click', '.character-images-enemies', function(event){
    // Refresh display for selected defender
    var characterIndex = Number($(this).attr('index'));
    selectedDefenderIndex = characterIndex;
    updateDefenderDisplay(characterIndex);
    updateEnemiesToAttackDisplay(selectedCharacterIndex, selectedDefenderIndex);
});
$("#attack-btn").on('click', function(){
    if (selectedDefenderIndex != -1) {
        var counterAttackPower = StarWarsGame.characterCounterAttackPower[selectedDefenderIndex];
        var attackPower = StarWarsGame.characterAttackPower[selectedCharacterIndex];
        console.log("Attacking with power=" + StarWarsGame.characterAttackPower[selectedCharacterIndex]);
        console.log("Counter attacked with power=" + StarWarsGame.characterCounterAttackPower[selectedCharacterIndex]);
        HealthPoints[selectedCharacterIndex] -= counterAttackPower;
        HealthPoints[selectedDefenderIndex] -= attackPower;
        updateDefenderDisplay(selectedDefenderIndex);
        updateAttackerDisplay(selectedCharacterIndex);
    }
});
//  Function that updates the enemies to attack DIV section on the page
function updateEnemiesToAttackDisplay(selectedCharacterIndex, selectedDefenderIndex) {
    var imageContainer;
    var characterImage;
    var endDiv;
    enemiesToAttack.html("");
    for (var i=0;i<StarWarsGame.characterImages.length;i++) {
        if ((i != selectedCharacterIndex) && (i != selectedDefenderIndex)) {
            imageContainer = $('<div class="image-container-enemies" <span id="character-names-label">' + StarWarsGame.characterNames[i] + '</span>');
            characterImage = $('<img class="img-responsive character-images-enemies">');
            endDiv = $('<div <span id="health-points">' + HealthPoints[i] + '</span>');
            imageContainer.append(characterImage);
            imageContainer.append(endDiv);
            enemiesToAttack.append(imageContainer);
            characterImage.attr('src', "assets/images/" + StarWarsGame.characterImages[i]);
            characterImage.attr('character', StarWarsGame.characterNames[i]);    
            characterImage.attr('index', i);    
        }
    }
}
function updateDefenderDisplay(characterIndex) {
    var imageContainer = $('<div class="image-container-defender " <span id="character-names-label">' + StarWarsGame.characterNames[characterIndex] + '</span>');
    var characterImage = $('<img class="img-responsive character-images-defender">');
    var endDiv = $('<div <span id="health-points-defender">' + HealthPoints[characterIndex] + '</span>');
 
    imageContainer.append(characterImage);
    imageContainer.append(endDiv);
    defender.html("");    // clear existing attributes and content for the div
    defender.append(imageContainer);
    defender.append('Defender');
    characterImage.attr('src', "assets/images/" + StarWarsGame.characterImages[characterIndex]);
    characterImage.attr('character', StarWarsGame.characterNames[characterIndex]);
    characterImage.attr('index', characterIndex);
}
function updateAttackerDisplay(characterIndex) {
    var imageContainer = $('<div class="image-container-your-character" <span id="character-names-label">' + StarWarsGame.characterNames[characterIndex] + '</span>');
    var characterImage = $('<img class="img-responsive character-images">');
    var endDiv = $('<div <span id="health-points">' + HealthPoints[characterIndex] + '</span>');
 
    imageContainer.append(characterImage);
    imageContainer.append(endDiv);
    selectedCharacter.html("");    // clear existing attributes and content for the div
    selectedCharacter.append(imageContainer);
    // selectedCharacter.append('Your character');
    characterImage.attr('src', "assets/images/" + StarWarsGame.characterImages[characterIndex]);
    characterImage.attr('character', StarWarsGame.characterNames[characterIndex]);
    characterImage.attr('index', characterIndex);
}

    