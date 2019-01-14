

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
    characterBaseAttackPower: [6, 8, 4, 7, 10, 2],
    characterAttackPower: [0, 0, 0, 0, 0, 0],
    characterCounterAttackPower: [10, 2, 6, 12, 5],
    healthPoints: [0, 0, 0, 0, 0, 0],
    characterInGame: [true, true, true, true, true, true],
    selectedCharacterIndex: -1,
    selectedDefenderIndex: -1 
}

var characters = $("#characters");
var charactersRowHeading = $(".my-characters-row-heading");
var selectedCharacter = $("#selected-character");
var enemiesToAttack = $("#enemies-to-attack");
var defender = $(".defender");
var myEnemiesRowHeading = $(".my-enemies-row-heading");
resetGame();
// myEnemiesRowHeading.html("");
// for (i=0;i<StarWarsGame.characterImages.length;i++) {
//     StarWarsGame.healthPoints[i] = Math.floor(Math.random()*100) + 19;
//     var imageContainer = $('<div class="image-container" <span id="character-names-label">' + StarWarsGame.characterNames[i] + '</span>');
//     var characterImage = $('<img class="img-responsive character-images">');
//     var endDiv = $('<div <span id="health-points">' + StarWarsGame.healthPoints[i] + '</span>');
//     imageContainer.append(characterImage);
//     imageContainer.append(endDiv);
//     characters.append(imageContainer);
//     // characters.append(characterImage);
//     characterImage.attr('src', "assets/images/" + StarWarsGame.characterImages[i]);
//     characterImage.attr('character', StarWarsGame.characterNames[i]);
//     characterImage.attr('index', i);

//     // letterBtn.text(letters[i]);
// }
// $('.character-images').on("click", function(){
$(document).on("click", '.character-images', function() {
    var characterIndex = Number($(this).attr('index'));
    StarWarsGame.selectedCharacterIndex = characterIndex;
    updateAttackerDisplay(characterIndex);
    characters.html("");
    charactersRowHeading.html("");
    //  move the enemies to attack into position
    enemiesToAttack.html("");
    myEnemiesRowHeading.html("Enemies available to attack");
    updateEnemiesToAttackDisplay(StarWarsGame.selectedCharacterIndex, StarWarsGame.selectedDefenderIndex);
});
// QUESTION: Why does this event handler NOT get triggered???
$('.character-images-enemies').on("click", function(){
    alert("Hello-2");
});

$(document).on('click', '.character-images-enemies', function(event){
    // Refresh display for selected defender
    var characterIndex = Number($(this).attr('index'));
    StarWarsGame.selectedDefenderIndex = characterIndex;
    updateDefenderDisplay(characterIndex);
    updateEnemiesToAttackDisplay(StarWarsGame.selectedCharacterIndex, StarWarsGame.selectedDefenderIndex);
});
$("#attack-btn").on('click', function(){
    if (StarWarsGame.selectedDefenderIndex != -1) {
        StarWarsGame.characterAttackPower[StarWarsGame.selectedCharacterIndex] += StarWarsGame.characterBaseAttackPower[StarWarsGame.selectedCharacterIndex];
        var counterAttackPower = StarWarsGame.characterCounterAttackPower[StarWarsGame.selectedDefenderIndex];
        var attackPower = StarWarsGame.characterAttackPower[StarWarsGame.selectedCharacterIndex];
        console.log("Attacking with power=" + StarWarsGame.characterAttackPower[StarWarsGame.selectedCharacterIndex]);
        console.log("Counter attacked with power=" + StarWarsGame.characterCounterAttackPower[StarWarsGame.selectedCharacterIndex]);
        StarWarsGame.healthPoints[StarWarsGame.selectedCharacterIndex] -= counterAttackPower;
        StarWarsGame.healthPoints[StarWarsGame.selectedDefenderIndex] -= attackPower;
        updateDefenderDisplay(StarWarsGame.selectedDefenderIndex);
        updateAttackerDisplay(StarWarsGame.selectedCharacterIndex);
        if (StarWarsGame.healthPoints[StarWarsGame.selectedCharacterIndex] <= 0) {
            $(".defender").html("You have no health points remaining and have lost this game");
            $("#restart-btn").show();
        }
    } else {
        $(".defender").html("You have not selected a defender yet");
    }
});
$("#restart-btn").on('click', function(){
    resetGame();
});
//  Function that updates the enemies to attack DIV section on the page
function updateEnemiesToAttackDisplay(selectedCharacterIndex, selectedDefenderIndex) {
    var imageContainer;
    var characterImage;
    var endDiv;
    enemiesToAttack.html("");
    var remainingEnemies=0;
    for (var i=0;i<StarWarsGame.characterImages.length;i++) {
        if ((i != selectedCharacterIndex) && (i != selectedDefenderIndex) && StarWarsGame.characterInGame[i]) {
            imageContainer = $('<div class="image-container-enemies" <span id="character-names-label">' + StarWarsGame.characterNames[i] + '</span>');
            characterImage = $('<img class="img-responsive character-images-enemies">');
            endDiv = $('<div <span id="health-points">' + StarWarsGame.healthPoints[i] + '</span>');
            imageContainer.append(characterImage);
            imageContainer.append(endDiv);
            enemiesToAttack.append(imageContainer);
            characterImage.attr('src', "assets/images/" + StarWarsGame.characterImages[i]);
            characterImage.attr('character', StarWarsGame.characterNames[i]);    
            characterImage.attr('index', i);  
            remainingEnemies++;  
        }
    }
    if (remainingEnemies===0) {
        alert("Congratulations! You have WON the game!!!!")
    }
}
function updateDefenderDisplay(characterIndex) {
    var imageContainer = $('<div class="image-container-defender " <span id="character-names-defender-label">' + StarWarsGame.characterNames[characterIndex] + '</span>');
    var characterImage = $('<img class="img-responsive character-images-defender">');
    var endDiv = $('<div <span id="health-points-defender">' + StarWarsGame.healthPoints[characterIndex] + '</span>');
 
    imageContainer.append(characterImage);
    imageContainer.append(endDiv);
    defender.html("");    // clear existing attributes and content for the div
    if (StarWarsGame.healthPoints[characterIndex] <= 0) {
        alert("Player removed");
        // Defender has been defeated. Remove from game
        StarWarsGame.characterInGame[characterIndex]=false;
        updateEnemiesToAttackDisplay(StarWarsGame.selectedCharacterIndex, -1);
    }
    else {
        defender.append(imageContainer);
        defender.append('Defender');
        characterImage.attr('src', "assets/images/" + StarWarsGame.characterImages[characterIndex]);
        characterImage.attr('character', StarWarsGame.characterNames[characterIndex]);
        characterImage.attr('index', characterIndex);
    }

}
function updateAttackerDisplay(characterIndex) {
    var imageContainer = $('<div class="image-container-your-character" <span id="character-names-label">' + StarWarsGame.characterNames[characterIndex] + '</span>');
    var characterImage = $('<img class="img-responsive character-images">');
    var endDiv = $('<div <span id="health-points">' + StarWarsGame.healthPoints[characterIndex] + '</span>');
 
    imageContainer.append(characterImage);
    imageContainer.append(endDiv);
    selectedCharacter.html("");    // clear existing attributes and content for the div
    selectedCharacter.append(imageContainer);
    // selectedCharacter.append('Your character');
    characterImage.attr('src', "assets/images/" + StarWarsGame.characterImages[characterIndex]);
    characterImage.attr('character', StarWarsGame.characterNames[characterIndex]);
    characterImage.attr('index', characterIndex);
}

function resetGame() {
    StarWarsGame.healthPoints = [0, 0, 0, 0, 0, 0];
    StarWarsGame.characterAttackPower = [0, 0, 0, 0, 0, 0];
    StarWarsGame.selectedCharacterIndex = -1;
    StarWarsGame.selectedDefenderIndex = -1;
    $("#restart-btn").hide();
    myEnemiesRowHeading.html("");
    selectedCharacter.html("");
    enemiesToAttack.html("");
    defender.html("");
    for (i=0;i<StarWarsGame.characterImages.length;i++) {
        StarWarsGame.healthPoints[i] = Math.floor(Math.random()*100) + 19;
        var imageContainer = $('<div class="image-container" <span id="character-names-label">' + StarWarsGame.characterNames[i] + '</span>');
        var characterImage = $('<img class="img-responsive character-images">');
        var endDiv = $('<div <span id="health-points">' + StarWarsGame.healthPoints[i] + '</span>');
        imageContainer.append(characterImage);
        imageContainer.append(endDiv);
        characters.append(imageContainer);
        // characters.append(characterImage);
        characterImage.attr('src', "assets/images/" + StarWarsGame.characterImages[i]);
        characterImage.attr('character', StarWarsGame.characterNames[i]);
        characterImage.attr('index', i);
    }
}

    