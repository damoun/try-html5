jQuery(document).ready(function() {
    main(document.getElementById("area"), document.getElementById("next"));
});

function main(area, next) {
    nextFigure = getRandomFigure(next);
    
}


function getRandomFigure(canvas) {
    var figures = new Array('I', 'O', 'T', 'L', 'J', 'Z', 'S');
    //var figure = figures[Math.round(Math.random() * (figures.length - 1))];
    var figure = 'I';
    switch (figure) {
        case 'I':
            return new Array(new Square({x: 0, y: 0}, {w: 40, h: 20}, "#FF0000", canvas),
                    new Square({x: 40, y: 0}, {w: 40, h: 20}, "#FF0000", canvas),
                    new Square({x: 80, y: 0}, {w: 40, h: 20}, "#FF0000", canvas),
                    new Square({x: 120, y: 0}, {w: 40, h: 20}, "#FF0000", canvas));
        case 'O':
            return new Array(new Square({x: 0, y: 0}, {w: 20, h: 20}, "#0000FF", canvas),
                    new Square({x: 0, y: 20}, {w: 20, h: 20}, "#0000FF", canvas),
                    new Square({x: 20, y: 0}, {w: 20, h: 20}, "#0000FF", canvas),
                    new Square({x: 20, y: 20}, {w: 20, h: 20}, "#0000FF", canvas));
        case 'T':
            return new Array(new Square({x: 0, y: 0}, {w: 20, h: 20}, "#A52A2A", canvas),
                    new Square({x: 20, y: 0}, {w: 20, h: 20}, "#A52A2A", canvas),
                    new Square({x: 40, y: 0}, {w: 20, h: 20}, "#A52A2A", canvas),
                    new Square({x: 20, y: 20}, {w: 20, h: 20}, "#A52A2A", canvas));
        case 'L':
            return new Array(new Square({x: 0, y: 0}, {w: 20, h: 20}, "#FFFF00", canvas),
                    new Square({x: 20, y: 0}, {w: 20, h: 20}, "#FFFF00", canvas),
                    new Square({x: 40, y: 0}, {w: 20, h: 20}, "#FFFF00", canvas),
                    new Square({x: 0, y: 20}, {w: 20, h: 20}, "#FFFF00", canvas));
        case 'J':
            return new Array(new Square({x: 0, y: 0}, {w: 20, h: 20}, "#FF00FF", canvas),
                    new Square({x: 20, y: 0}, {w: 20, h: 20}, "#FF00FF", canvas),
                    new Square({x: 40, y: 0}, {w: 20, h: 20}, "#FF00FF", canvas),
                    new Square({x: 0, y: 40}, {w: 20, h: 20}, "#FF00FF", canvas));
        case 'Z':
            return new Array(new Square({x: 0, y: 0}, {w: 20, h: 20}, "#00FFFF", canvas),
                    new Square({x: 20, y: 0}, {w: 20, h: 20}, "#00FFFF", canvas),
                    new Square({x: 20, y: 20}, {w: 20, h: 20}, "#00FFFF", canvas),
                    new Square({x: 20, y: 40}, {w: 20, h: 20}, "#00FFFF", canvas));
        case 'S':
            return new Array(new Square({x: 20, y: 0}, {w: 20, h: 20}, "#008000", canvas),
                    new Square({x: 40, y: 0}, {w: 20, h: 20}, "#008000", canvas),
                    new Square({x: 0, y: 20}, {w: 20, h: 20}, "#008000", canvas),
                    new Square({x: 20, y: 20}, {w: 20, h: 20}, "#008000", canvas));
    }
    return figure;
}

function displayScore(score) {
    document.getElementById("score").innerHTML = score;
}