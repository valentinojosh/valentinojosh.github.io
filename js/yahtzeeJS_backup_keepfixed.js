
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
    let oStr = `Keep?<input type="checkbox" id='Die${ii}Select' name='Die${ii}Select'>`;
    document.getElementById(`D${ii}CheckHide`).innerHTML= oStr;
    document.getElementById(`Die${ii}Select`).checked = false;
    CurrentDice[i-1].keep = 'No';
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
    alert("Probably was an error, this isnt suppose to show");
}
    return tempScore;
}

    //Function that determines if there is a 3 of kind what score should be returned to the calculation function
    function ThreeKind(){
    OrderTemp();
    let amt1 = 0;
    let amt2 = 0;
    let amt3 = 0;
    let amt4 = 0;
    let amt5 = 0;
    let amt6 = 0;
    let tempScore2 = 0;
    for(let i = 1; i < 6; i++){
    let j = TempDiceOrder[i-1];
    if(j == 1){
    amt1++;
}
    else if(j == 2){
    amt2++;
}
    else if(j == 3){
    amt3++;
}
    else if(j == 4){
    amt4++;
}
    else if(j == 5){
    amt5++;
}
    else if(j == 6){
    amt6++;
}
}
    if(amt1 >= 3){
    tempScore2 = ((amt1 * 1) + (amt2 * 2) + (amt3 * 3) + (amt4 * 4) + (amt5 * 5) + (amt6 * 6));
}
    else if(amt2 >= 3){
    tempScore2 = ((amt1 * 1) + (amt2 * 2) + (amt3 * 3) + (amt4 * 4) + (amt5 * 5) + (amt6 * 6));
}
    else if(amt3 >= 3){
    tempScore2 = ((amt1 * 1) + (amt2 * 2) + (amt3 * 3) + (amt4 * 4) + (amt5 * 5) + (amt6 * 6));
}
    else if(amt4 >= 3){
    tempScore2 = ((amt1 * 1) + (amt2 * 2) + (amt3 * 3) + (amt4 * 4) + (amt5 * 5) + (amt6 * 6));
}
    else if(amt5 >= 3){
    tempScore2 = ((amt1 * 1) + (amt2 * 2) + (amt3 * 3) + (amt4 * 4) + (amt5 * 5) + (amt6 * 6));
}
    else if(amt6 >= 3){
    tempScore2 = ((amt1 * 1) + (amt2 * 2) + (amt3 * 3) + (amt4 * 4) + (amt5 * 5) + (amt6 * 6));
}
    else{
    tempScore2 = 0;
}
    return tempScore2;
}

    //Function that determines if there is a 4 of kind what score should be returned to the calculation function
    function FourKind(){
    OrderTemp();
    let amt1 = 0;
    let amt2 = 0;
    let amt3 = 0;
    let amt4 = 0;
    let amt5 = 0;
    let amt6 = 0;
    let tempScore2 = 0;
    for(let i = 1; i < 6; i++){
    let j = TempDiceOrder[i-1];
    if(j == 1){
    amt1++;
}
    else if(j == 2){
    amt2++;
}
    else if(j == 3){
    amt3++;
}
    else if(j == 4){
    amt4++;
}
    else if(j == 5){
    amt5++;
}
    else if(j == 6){
    amt6++;
}
}
    if(amt1 >= 4){
    tempScore2 = ((amt1 * 1) + (amt2 * 2) + (amt3 * 3) + (amt4 * 4) + (amt5 * 5) + (amt6 * 6));
}
    else if(amt2 >= 4){
    tempScore2 = ((amt1 * 1) + (amt2 * 2) + (amt3 * 3) + (amt4 * 4) + (amt5 * 5) + (amt6 * 6));
}
    else if(amt3 >= 4){
    tempScore2 = ((amt1 * 1) + (amt2 * 2) + (amt3 * 3) + (amt4 * 4) + (amt5 * 5) + (amt6 * 6));
}
    else if(amt4 >= 4){
    tempScore2 = ((amt1 * 1) + (amt2 * 2) + (amt3 * 3) + (amt4 * 4) + (amt5 * 5) + (amt6 * 6));
}
    else if(amt5 >= 4){
    tempScore2 = ((amt1 * 1) + (amt2 * 2) + (amt3 * 3) + (amt4 * 4) + (amt5 * 5) + (amt6 * 6));
}
    else if(amt6 >= 4){
    tempScore2 = ((amt1 * 1) + (amt2 * 2) + (amt3 * 3) + (amt4 * 4) + (amt5 * 5) + (amt6 * 6));
}
    else{
    tempScore2 = 0;
}
    return tempScore2;
}

    //Function that preludes the FullHouse function
    //Returns true if the 3 of a kind section of a full house is satisfied
    function FullHousePre1(){
    OrderTemp();
    let amt1 = 0;
    let amt2 = 0;
    let amt3 = 0;
    let amt4 = 0;
    let amt5 = 0;
    let amt6 = 0;
    let tempBoolean = false;
    for(let i = 1; i < 6; i++){
    let j = TempDiceOrder[i-1];
    if(j == 1){
    amt1++;
}
    else if(j == 2){
    amt2++;
}
    else if(j == 3){
    amt3++;
}
    else if(j == 4){
    amt4++;
}
    else if(j == 5){
    amt5++;
}
    else if(j == 6){
    amt6++;
}
}
    if(amt1 >= 3 || amt2 >= 3 || amt3 >= 3 || amt4 >= 3 || amt5 >= 3 || amt6 >= 3){
    tempBoolean = true;
}
    return tempBoolean;
}

    //Function that preludes the FullHouse function
    //Returns true if the 2 of a kind section of a full house is satisfied
    function FullHousePre2(){
    OrderTemp();
    let amt1 = 0;
    let amt2 = 0;
    let amt3 = 0;
    let amt4 = 0;
    let amt5 = 0;
    let amt6 = 0;
    let tempBoolean = false;
    for(let i = 1; i < 6; i++){
    let j = TempDiceOrder[i-1];
    if(j == 1){
    amt1++;
}
    else if(j == 2){
    amt2++;
}
    else if(j == 3){
    amt3++;
}
    else if(j == 4){
    amt4++;
}
    else if(j == 5){
    amt5++;
}
    else if(j == 6){
    amt6++;
}
}
    if(amt1 >= 2 || amt2 >= 2 || amt3 >= 2 || amt4 >= 2 || amt5 >= 2 || amt6 >= 2){
    tempBoolean = true;
}
    return tempBoolean;
}

    //Function that determines what score should be returned to the calculation function
    function FullHouse(){
    let tempScore2 = 0;
    if((FullHousePre1() == true) && (FullHousePre2() == true)){
    tempScore2 = 25;
}
    return tempScore2;
}

    //Function that decides if there is a small straight and returns the score to the calculation function
    function SmStraight(){
    OrderTemp();
    let compare1 = [1,2,3,4,5];
    let compare2 = [1,2,3,4,6];
    let compare3 = [1,1,2,3,4];
    let compare4 = [1,2,2,3,4];
    let compare5 = [1,2,3,3,4];
    let compare6 = [1,2,3,4,4];
    let compare7 = [2,3,4,5,6];
    let compare8 = [3,4,5,6,6];
    let compare9 = [2,2,3,4,5];
    let compare10 = [2,3,3,4,5];
    let compare11 = [2,3,4,4,5];
    let compare12 = [2,3,4,5,5];
    let compare13 = [3,3,4,5,6];
    let compare14 = [3,4,4,5,6];
    let compare15 = [3,4,5,5,6];
    let tempScore2 = 0;
    let check1 = true;
    let check2 = true;
    let check3 = true;
    let check4 = true;
    let check5 = true;
    let check6 = true;
    let check7 = true;
    let check8 = true;
    let check9 = true;
    let check10 = true;
    let check11 = true;
    let check12 = true;
    let check13 = true;
    let check14 = true;
    let check15 = true;
    for(let i = 1; i < 6; i++){
    if(TempDiceOrder[i-1] !== compare1[i-1]){
    check1 = false;
}
    if(TempDiceOrder[i-1] !== compare2[i-1]){
    check2 = false;
}
    if(TempDiceOrder[i-1] !== compare3[i-1]){
    check3 = false;
}
    if(TempDiceOrder[i-1] !== compare4[i-1]){
    check4 = false;
}
    if(TempDiceOrder[i-1] !== compare5[i-1]){
    check5 = false;
}
    if(TempDiceOrder[i-1] !== compare6[i-1]){
    check6 = false;
}
    if(TempDiceOrder[i-1] !== compare7[i-1]){
    check7 = false;
}
    if(TempDiceOrder[i-1] !== compare8[i-1]){
    check8 = false;
}
    if(TempDiceOrder[i-1] !== compare9[i-1]){
    check9 = false;
}
    if(TempDiceOrder[i-1] !== compare10[i-1]){
    check10 = false;
}
    if(TempDiceOrder[i-1] !== compare11[i-1]){
    check11 = false;
}
    if(TempDiceOrder[i-1] !== compare12[i-1]){
    check12 = false;
}
    if(TempDiceOrder[i-1] !== compare13[i-1]){
    check13 = false;
}
    if(TempDiceOrder[i-1] !== compare14[i-1]){
    check14 = false;
}
    if(TempDiceOrder[i-1] !== compare15[i-1]){
    check15 = false;
}
}
    if (check1 == true || check2 == true || check3 == true || check4 == true || check5 == true || check6 == true || check7 == true || check8 == true || check9 == true || check10 == true || check11 == true || check12 == true || check13 == true || check14 == true || check15 == true){
    tempScore2 = 30;
}
    return tempScore2;
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
    let amt1 = 0;
    let amt2 = 0;
    let amt3 = 0;
    let amt4 = 0;
    let amt5 = 0;
    let amt6 = 0;
    let tempScore2 = 0;
    for(let i = 1; i < 6; i++){
    let j = TempDiceOrder[i-1];
    if(j == 1){
    amt1++;
}
    else if(j == 2){
    amt2++;
}
    else if(j == 3){
    amt3++;
}
    else if(j == 4){
    amt4++;
}
    else if(j == 5){
    amt5++;
}
    else if(j == 6){
    amt6++;
}
}
    if(amt1 == 5 || amt2 == 5 || amt3 == 5 || amt4 == 5 || amt5 == 5 || amt6 == 5){
    tempScore2 = 50;
}
    return tempScore2;
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
        TempDiceOrder[i-1] = CurrentDice[i-1].DieValue
        }
        TempDiceOrder.sort(function(a,b){return a-b});
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
