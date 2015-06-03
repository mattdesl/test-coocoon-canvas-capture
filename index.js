var COPY = 'كل سابق عقبت والكوري كان, و كرسي';
var FONT_SIZE = 48;
var WORDS = COPY.split(' ');

document.body.style.margin = 0;


renderCanvas(WORDS);
renderDiv(WORDS);







function renderDiv(words) {

    var div = document.createElement('div');

    div.style.fontFamily = 'Baghdad';
    div.style.fontSize = FONT_SIZE + 'px';
    div.style.position = 'absolute';
    div.style.left = div.style.top = window.innerWidth * 0.5 + 'px';
    div.style.top = '0px';
    div.style.width = window.innerWidth * 0.5 + 'px';
    div.style.height = window.innerHeight + 'px';
    div.style.color = '#FFF';
    div.style.background = '#000';
    // div.style.height = FONT_SIZE + 'px';

    document.body.appendChild(div);

    words.forEach(function(word, idx) {
        var wordDiv = document.createElement('div');
        wordDiv.innerHTML = word;
        
        div.appendChild(wordDiv);
    });
}

function renderCanvas(words) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    canvas.width = window.innerWidth * 0.5;
    canvas.height = window.innerHeight;

    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    document.body.appendChild(canvas);

    words.forEach(function(word, idx) {
    
        context.font = FONT_SIZE + 'px Baghdad';
        context.fillStyle = '#FFF';

        context.fillText(word, 0, FONT_SIZE * idx + FONT_SIZE);
    });
}