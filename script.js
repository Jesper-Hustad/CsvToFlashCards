

var cards = []
var headers = []
var currentCard = 0

previousCardBuffer = 4
var lastCards = new Array(previousCardBuffer).fill(0);


$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "data.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});

function processData(allText) {

    var allTextLines = allText.split(/\r\n|\n/)
    headers = allTextLines[0].split(',')

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
        data = data || []
        for (let index = 0; index < data.length; index++) {
            data[index] = data[index].replace(/\\n/g, "<br/>").replace(/['"]+/g, '');
        }
        
        cards.push(data)
    }
}

$(".button").click(function(){
    $(answer).css('max-height',  '0px')
    $("#card").fadeToggle(100,function(){
        setTimeout(function(){
            displayCard(getNextCard())
        },100);
        $("#card").fadeToggle(100);
    });
    
});


function displayCard(index) {
    $("#title").html(cards[index][getType("Title")])
    $("#question").html(cards[index][getType("Question")])
    $("#answer").html(cards[index][getType("Answer")])
    // document.getElementById("answer").style.maxHeight(0)
    
    // $(answer).css('max-height',  '0px')
    // $("#example").text(cards[index][getType("Example")])
    // $("#tags").text(cards[index][getType("Tags")])
}

function getNextCard() {
    // loop until new selected card is unique
    do {
        var selectedCard = Math.floor(Math.random() * cards.length);
    } while (lastCards.includes(selectedCard));
    
    // adds selectedCard to lastCards array and removes oldest one
    lastCards.push(selectedCard)
    lastCards.shift()

    
    console.log(lastCards.map(i => cards[i]).map(c => c[getType("Title")]));
    

    return selectedCard
}

function getType(type) {
    for (let i = 0; i < headers.length; i++) {
        if(headers[i]==type){
            return i
        }
    }
    return null
}

function shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }