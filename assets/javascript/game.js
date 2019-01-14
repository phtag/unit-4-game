

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
    characterBaseAttackPower: [8, 12, 7, 7, 10, 15],
    characterAttackPower: [0, 0, 0, 0, 0, 0],
    characterCounterAttackPower: [10, 8, 15, 12, 9, 10],
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
var fightStatus = $(".fight-status");
var myEnemiesRowHeading = $(".my-enemies-row-heading");
var mySelectedCharacterRowHeading = $(".my-selected-character-row-heading");
resetGame();
$(document).on("click", '.character-images', function() {
    var characterIndex = Number($(this).attr('index'));
    StarWarsGame.selectedCharacterIndex = characterIndex;
    updateAttackerDisplay(characterIndex);
    characters.html("");
    charactersRowHeading.html("");
    mySelectedCharacterRowHeading.html("<p>Your character</p>");
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
    fightStatus.html("");
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
        fightStatus.html("<p>You attacked " + StarWarsGame.characterNames[StarWarsGame.selectedDefenderIndex] + " for " + attackPower + " damage; " + StarWarsGame.characterNames[StarWarsGame.selectedDefenderIndex] + " counter-attacked for " + counterAttackPower + " damage</p>");
        updateDefenderDisplay(StarWarsGame.selectedDefenderIndex);
        updateAttackerDisplay(StarWarsGame.selectedCharacterIndex);
        if (StarWarsGame.healthPoints[StarWarsGame.selectedCharacterIndex] <= 0) {
            fightStatus.html("");
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
        }
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
        // Defender has been defeated. Remove from game
        StarWarsGame.characterInGame[characterIndex]=false;
        if (numRemainingPlayers() === 0) {
            $(".defender").html("Congratulations! You have WON the game!!!");
            fightStatus.html("");
            $("#restart-btn").show();
        } else {
            fightStatus.html("You have defeated " + StarWarsGame.characterNames[characterIndex] + ". Chose another enemy");
            updateEnemiesToAttackDisplay(StarWarsGame.selectedCharacterIndex, -1);
        }
    }
    else {
        defender.append('Defender');
        defender.append(imageContainer);
        // defender.append('Defender');
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
    characterImage.attr('src', "assets/images/" + StarWarsGame.characterImages[characterIndex]);
    characterImage.attr('character', StarWarsGame.characterNames[characterIndex]);
    characterImage.attr('index', characterIndex);
}

function resetGame() {
    StarWarsGame.healthPoints = [0, 0, 0, 0, 0, 0];
    StarWarsGame.characterAttackPower = [0, 0, 0, 0, 0, 0];
    StarWarsGame.characterInGame = [true, true, true, true, true, true];
    StarWarsGame.selectedCharacterIndex = -1;
    StarWarsGame.selectedDefenderIndex = -1;
    $("#restart-btn").hide();
    charactersRowHeading.html("Select one of the above characters to start playing");
    mySelectedCharacterRowHeading.html("");
    myEnemiesRowHeading.html("");
    selectedCharacter.html("");
    enemiesToAttack.html("");
    fightStatus.html("");
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
function numRemainingPlayers() {
    var remainingPlayers = 0;
    for (var i=0;i<StarWarsGame.characterInGame.length;i++) {
        if (i != StarWarsGame.selectedCharacterIndex) {
            if (StarWarsGame.characterInGame[i]) {
                remainingPlayers++;
            }
        }
    }
    return remainingPlayers;
}

    