
    $(document).ready(function () {

    //User is prompted to enter their name
    //The display at the bottom of the screen is updated to show their name under scoring
    let name = prompt("Please enter your name");
    if(name === null || name.length === 0){
        name = "No Name"
    }
    if (name.length > 20){
        name = name.substring(0, 20);
    }
    oStr = `<div id="KeepHide">${name}</div>`;
    document.getElementById('name').innerHTML= oStr;

    //Establishes an array of dice used to call upon what img is needed to display
    let DiceSet = [
{id: 1, item: 'Die1', img: 'Die1.PNG'},
{id: 2, item: 'Die2', img: 'Die2.PNG'},
{id: 3, item: 'Die3', img: 'Die3.PNG'},
{id: 4, item: 'Die4', img: 'Die4.PNG'},
{id: 5, item: 'Die5', img: 'Die5.PNG'},
{id: 6, item: 'Die6', img: 'Die6.PNG'}
    ];

    //Establishes an array of dice that are currently being stored that are used for calculations and rolls
    let CurrentDice = [
{id: 1, item: 'CDie1', DieValue: 0, keep: 'No'},
{id: 2, item: 'CDie2', DieValue: 0, keep: 'No'},
{id: 3, item: 'CDie3', DieValue: 0, keep: 'No'},
{id: 4, item: 'CDie4', DieValue: 0, keep: 'No'},
{id: 5, item: 'CDie5', DieValue: 0, keep: 'No'}
    ]

    //Establishes a temporary array that is used in a function to set the current dice set in ascending order
    let TempDiceOrder = [0,0,0,0,0]

    //Establishes a temporary array that is used in a function to set the current dice set in ascending order and unique values
    let TempDiceOrderUnique = [0,0,0,0,0]

    //Establishes an array to keep track of which score selections have been checked already
    let ScoreSheetArray = [
{id: 1, item: 'SS1', keep: 'No'},
{id: 2, item: 'SS2', keep: 'No'},
{id: 3, item: 'SS3', keep: 'No'},
{id: 4, item: 'SS4', keep: 'No'},
{id: 5, item: 'SS5', keep: 'No'},
{id: 6, item: 'SS6', keep: 'No'},
{id: 7, item: 'SS7', keep: 'No'},
{id: 8, item: 'SS8', keep: 'No'},
{id: 9, item: 'SS9', keep: 'No'},
{id: 10, item: 'SS10', keep: 'No'},
{id: 11, item: 'SS11', keep: 'No'},
{id: 12, item: 'SS12', keep: 'No'},
{id: 13, item: 'SS13', keep: 'No'},
    ]

    //Establishes certain variables that are needed to keep track of rolls, rounds, scores, and the score sheets
    let rollCount = 0;
    let roundCount = 0;
    let UpperScore = 0;
    let Bonus = 0;
    let UpperBonusScore = 0;
    let LowerScore = 0;
    let GrandTotal = 0;
    let ScoreSheetSelection = 0;

    //Function to generate a random integer
    function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

    //Function to reset the keep values and on screen display of the keep checkboxes for the dice set
    function ResetKeep(){
    for (let i = 1; i < 6; i++) {
    let ii = i.toString();
    let oStr = ``;
    document.getElementById(`D${ii}CheckHide`).innerHTML= oStr;
}
}

    //Function that checks to see which score category was selected and returns the corresponding value
    //of said category for calculations to be done and displays to be set
    function CheckScoreSheets(){
    let selected = false;
    let selectedNum = 0;
    for (let i = 1; i < 14; i++) {
    let ii = i.toString();
    if (ScoreSheetArray[i-1].keep == 'Yes'){
    continue;
}
    else if (document.getElementById(`Score${ii}Select`).checked == true){
    selectedNum++;
    ScoreSheetSelection = i;
}
}
    if(selectedNum == 1){
    ScoreSheetKeep();
    selected = true;
    return selected;
}
    else{
    selected = false;
    return selected;
}
}

    //Function that removes the checkbox for the score sheets and replaces it with the score that was
    //calculated for said category
    function ScoreSheetKeep(){
    ScoreSheetArray[ScoreSheetSelection-1].keep = 'Yes';
    let oStr = `<div id="KeepHide">${CalculateScore()}</div>`;
    document.getElementById(`ScoreSheetBox${ScoreSheetSelection}`).innerHTML= oStr;
    UpdateScores();
}

    //Function that calculates the remaining scores and updates the displays at the bottom of the display
    function UpdateScores(){
    let oStr = `<div id="KeepHide">${UpperScore}</div>`;
    document.getElementById('Score1').innerHTML= oStr;
    oStr = `<div id="KeepHide">${LowerScore}</div>`;
    document.getElementById('Score4').innerHTML= oStr;
    if(UpperScore >= 63){
    Bonus = 35;
}
    oStr = `<div id="KeepHide">${Bonus}</div>`;
    document.getElementById('Score2').innerHTML= oStr;
    UpperBonusScore = UpperScore + Bonus;
    oStr = `<div id="KeepHide">${UpperBonusScore}</div>`;
    document.getElementById('Score3').innerHTML= oStr;
    GrandTotal = UpperBonusScore + LowerScore;
    oStr = `<div id="KeepHide">${GrandTotal}</div>`;
    document.getElementById('Score5').innerHTML= oStr;
}

    //Function that calculates the bulk of the scores calling upon other functions for the lower section
    function CalculateScore(){
    let tempScore = 0;
    if (ScoreSheetSelection <= 6 && ScoreSheetSelection >=1){
    for(let i = 1; i < 6; i++){
    if(CurrentDice[i-1].DieValue == ScoreSheetSelection){
    tempScore += CurrentDice[i-1].DieValue;
}
}
    UpperScore += tempScore;
}
    else if(ScoreSheetSelection == 7){
    tempScore = ThreeKind();
    LowerScore += tempScore
}
    else if(ScoreSheetSelection == 8){
    tempScore = FourKind();
    LowerScore += tempScore
}
    else if(ScoreSheetSelection == 9){
    tempScore = FullHouse();
    LowerScore += tempScore
}
    else if(ScoreSheetSelection == 10){
    tempScore = SmStraight();
    LowerScore += tempScore
}
    else if(ScoreSheetSelection == 11){
    tempScore = LgStraight();
    LowerScore += tempScore
}
    else if(ScoreSheetSelection == 12){
    tempScore = Yahtzee();
    LowerScore += tempScore
}
    else if(ScoreSheetSelection == 13){
    tempScore = Chance();
    LowerScore += tempScore
}
    else{
    alert("Erorr");
}
    return tempScore;
}

    //Function that determines if there is a 3 of kind what score should be returned to the calculation function
    function ThreeKind(){
        OrderTemp();
        let count = 1;
        for(let i = 0; i < TempDiceOrder.length-1; i++){
            if(TempDiceOrder[i] == TempDiceOrder[i+1]){
                count++;
            }
            else{
                count = 1;
            }
            if(count == 3){
                let sum = 0;
                for(let i = 1; i < 6; i++){
                    sum += TempDiceOrder[i-1];
                }
                return sum;
            }
        }
        return 0;      
    }   
 
    //Function that determines if there is a 4 of kind what score should be returned to the calculation function
    function FourKind(){
        OrderTemp();
        let count = 1;
        for(let i = 0; i < TempDiceOrder.length-1; i++){
            if(TempDiceOrder[i] == TempDiceOrder[i+1]){
                count++;
            }
            else{
                count = 1;
            }
            if(count == 4){
                let sum = 0;
                for(let i = 1; i < 6; i++){
                    sum += TempDiceOrder[i-1];
                }
                return sum;
            }
        }
        return 0;
}

    //Function that determines fullhouse score to be returned
    function FullHouse(){
        OrderTemp();
        const count = {};
        let TwoKind = false;
        let ThreeKind = false;
        for (const i of TempDiceOrder) {
            if (count[i]) {
            count[i] += 1;
            } else {
            count[i] = 1;
            }
        }
        for (const [key, value] of Object.entries(count)) {
            console.log(`${key}: ${value}`);
            if( value == 2){
                TwoKind = true;
            }
            if( value == 3){
                ThreeKind = true;
            }
          }
        if(TwoKind && ThreeKind){
            return 25;
        }
        else{
            return 0;
        }
    }

    //Function that decides if there is a small straight and returns the score to the calculation function
    function SmStraight(){
    OrderTempUnique();
    if(TempDiceOrderUnique.length <= 3){
        return 0;
    }
    if(TempDiceOrderUnique.length == 5){
        let TempDiceOrderUnique2 = TempDiceOrderUnique.slice(0,4);
        TempDiceOrderUnique = TempDiceOrderUnique.slice(1,5);
        TempDiceOrderUnique2 = TempDiceOrderUnique2.toString();
        if(TempDiceOrderUnique2 == '1,2,3,4' || TempDiceOrderUnique2 == '2,3,4,5' || TempDiceOrderUnique2 == '3,4,5,6'){
            return 30;
        }
    }
    TempDiceOrderUnique = TempDiceOrderUnique.toString();
    if(TempDiceOrderUnique == '1,2,3,4' || TempDiceOrderUnique == '2,3,4,5' || TempDiceOrderUnique == '3,4,5,6'){
        return 30;
    }
    else{
        return 0;
    }
    }

    //Function that decides if there is a large straight and returns the score to the calculation function
    function LgStraight(){
    OrderTemp();
    let compare1 = [1,2,3,4,5];
    let compare2 = [2,3,4,5,6];
    let tempScore2 = 0;
    let check1 = true;
    let check2 = true;
    for(let i = 1; i < 6; i++){
    if(TempDiceOrder[i-1] !== compare1[i-1]){
    check1 = false;
}
    if(TempDiceOrder[i-1] !== compare2[i-1]){
    check2 = false;
}
}
    if (check1 == true || check2 == true){
    tempScore2 = 40;
}
    return tempScore2;
}

    //Function that decides if there is a Yahtzee and returns the score to the calculation function
    function Yahtzee(){
    OrderTemp();
    let YahtzeeSet = new Set(TempDiceOrder);
    if(YahtzeeSet.size == 1){
        return 50;
    }
    else{
        return 0;
    }
}

    //Function that adds up all the dice and returns to the calculation function
    function Chance(){
    OrderTemp();
    let tempScore2 = 0;
    for(let i = 1; i < 6; i++){
    let j = TempDiceOrder[i-1];
    tempScore2 += j;
}
    return tempScore2;
}

    //Function that duplicates the current dice set into another array and organizes
    //it into ascending order
    function OrderTemp(){
    for (let i = 1; i < 6; i++){
    TempDiceOrder[i-1] = CurrentDice[i-1].DieValue
}
    TempDiceOrder.sort(function(a,b){return a-b});
}

    //Function that duplicated the current dice set into another array and organizes
    //it into ascending order and unique values only
    function OrderTempUnique(){
        for (let i = 1; i < 6; i++){
        TempDiceOrderUnique[i-1] = CurrentDice[i-1].DieValue
        }
        TempDiceOrderUnique.sort(function(a,b){return a-b});
        TempDiceOrderUnique = new Set(TempDiceOrderUnique);
        TempDiceOrderUnique = [...TempDiceOrderUnique];
    }

    //Function that updates the round variable and display of rounds
    function UpdateRound(){
    roundCount++;
    let rcString = '';
    if (roundCount == 13){
        rcString = 'Game Complete! Restart if you would like to play again'
    }
    else {
        rcString = roundCount.toString()
    }
    document.getElementById('RoundDisplay').innerHTML= rcString;
}

    //Function that checks which die were selected to be kept and removes the checkbox
    //and sets the display to 'checked'
    function CheckKeep(){
    for (let i = 1; i < 6; i++) {
    let ii = i.toString();
    if(CurrentDice[i-1].keep == 'Yes' && document.getElementById(`Die${ii}Select`).checked == true){
    continue;
}
    else if (document.getElementById(`Die${ii}Select`).checked == true){
    CurrentDice[i-1].keep = 'Yes';
}
    else if (document.getElementById(`Die${ii}Select`).checked == false){
    CurrentDice[i-1].keep = 'No';
}
}
}

    //Main function that executes on click of the roll button
    //Acts as what keeps the game moving, rolling the dice and being the main function of the program
    $("#rollb").click(function roll() {
    if(rollCount == 0){
        for (let i = 1; i < 6; i++) {
            let ii = i.toString();
            let oStr = `Keep?<input type="checkbox" id='Die${ii}Select' name='Die${ii}Select'>`;
            document.getElementById(`D${ii}CheckHide`).innerHTML= oStr;
            document.getElementById(`Die${ii}Select`).checked = false;
            CurrentDice[i-1].keep = 'No';
        }
    }
    CheckKeep();
    if (rollCount < 3){
    for (let i = 1; i < 6; i++) {
    let D1 = getRandomInt(1, 6);
    let D1Obj = DiceSet[(D1-1)];
    let ii = i.toString();
    if (CurrentDice[i-1].keep == 'No'){
    setDisplayImg(D1Obj, `Die${ii}img`);
    CurrentDice[i-1].DieValue = D1;
}
}
}
    else{
    alert("You have rolled 3 times already, please select an option on your score sheet and press the score button to continue");
}
    rollCount++;
});

    //Function that supplements the roll function
    //Executed when the score button is clicked
    //Makes sure the user has a score category selected via the CheckScoreSheets function
    //Alerts the user that their score is being calculated for the round
    //Resets rollcount, keep (via function), and updates the round (via function)
    $("#scoreb").click(function score() {

    if(CheckScoreSheets() == true){
    alert("Calculating Score");
    rollCount = 0;
    ResetKeep();
    UpdateRound();
}
    else{
    alert("You either did not select, or selected more than 1, score options. Please select 1 option and press the score button");
}
});

    //Function that sets the display image for the obj and id provided
    function setDisplayImg( obj, id ){
    let oStr = `<img src='imgs/${obj.img}' width='40px height='40px'>`;
    $(`#${id}`).html(oStr);
}
});
