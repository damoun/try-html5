jQuery(document).ready(function() {
    main(document.getElementById("can"));
});

function main(can) {
    var listSquare = new Array();
    var pause = false;
    var enter = false;
    var score = 0;
    var loose = false;

    var textbox = document.createElement("input");
    textbox.setAttribute('type', 'text', 0);
    textbox.setAttribute('style', 'position: absolute;top: -9999em;left: -9999em;', 0);
    jQuery("body").append(textbox);
    jQuery(textbox).bind("keyup", function (e) {
        var key = e.keyCode || e.which;
        if (this.value === ' ') {
            if (pause) {
                this.focus();
                pause = false;
            }
            else
                pause = true;
        }
        else if (key == 13) {
            if (pause || enter)
                return ;
            enter = true;
            var lastSquare = listSquare[listSquare.length - 1];
            if (listSquare.length > 0
                    && square.point.x >= lastSquare.point.x
                    && square.point.x + square.size.w <= lastSquare.point.x + lastSquare.size.w) {
                var endY = lastSquare.point.y - square.size.h;
                score += 50;
            }
            else if (listSquare.length > 0 && square.point.x + (square.size.w / 3 * 2) >= lastSquare.point.x
                    && square.point.x + (square.size.w / 3 * 2) <= lastSquare.point.x + lastSquare.size.w) {
                var endY = lastSquare.point.y - square.size.h;
                score += 20;
            }
            else if (listSquare.length > 0) {
                loose = true;
                if ((square.point.x >= lastSquare.point.x && square.point.x <= lastSquare.point.x + lastSquare.size.w)
                        || (square.point.x + square.size.w >= lastSquare.point.x
                        && square.point.x + square.size.w <= lastSquare.point.x + lastSquare.size.w))
                    var endY = lastSquare.point.y - square.size.h;
                else
                    var endY = can.height - square.size.h;
            }
            else
                var endY = can.height - square.size.h;
            var y = square.point.y;
            function fall() {
                setTimeout(function () {
                    square.moveTo({x: square.point.x, y: y});
                    if (y != endY) {
                        y++;
                        fall();
                    }
                    else {
                        if (loose) {
                            var x = square.point.x;
                            if (x < lastSquare.point.x)
                                var direction = -1;
                            else if (x + square.size.w >= lastSquare.point.x)
                                var direction = 1;
                            function fallLoose() {
                                setTimeout(function () {
                                    if (square.deg != direction * 90 && y != can.height - square.size.h) {
                                        square.rotate(direction * 6);
                                        square.moveTo({x: x, y: y});
                                        if (direction == 1 && x + square.size.w >= lastSquare.point.x
                                                && square.deg % 2 == 0)
                                            ++x;
                                        else if (x + square.size.w < lastSquare.point.x + lastSquare.size.w
                                                && square.deg % 2 == 0)
                                            --x;
                                    }
                                    else {
                                        square.moveTo({x: x, y: y});
                                        if (y != jQuery(can).height() - square.size.h)
                                            ++y;
                                        else {
                                            alert("You loose!!");
                                            return ;
                                        }
                                    }
                                    fallLoose();
                                }, 9);
                            }
                            fallLoose();
                        }
                        else {
                            listSquare.push(square);
                            square = new Square({x: 10, y: 10}, {w: 30, h: 30}, undefined, can);
                            enter = false;
                            function cleanTower() {
                                setTimeout(function () {
                                    for (var i = 0 ; i < listSquare.length ; ++i)
                                        listSquare[i].moveTo({x: listSquare[i].point.x, y: listSquare[i].point.y + 1});
                                    if (listSquare[0].point.y <= can.height)
                                        cleanTower();
                                    else {
                                        listSquare[0].remove();
                                        listSquare = listSquare.slice(1, listSquare.length);
                                    }
                                }, 10);
                            }
                            if (listSquare.length == 3)
                                cleanTower();
                        }
                    }
                }, 1);
            }
            fall();
            displayScore(score);
        }
        this.value = '';
    });
    jQuery(textbox).bind("blur", function () {
        this.focus();
    });
    textbox.focus();

    var square = new Square({x: 20, y: 10}, {w: 30, h: 30}, undefined, can);

    var x = square.point.x;
    var right = true;
    function translate() {
        setTimeout(function () {
            if (loose)
                return ;
            if (pause) {
                translate();
                return ;
            }
            if (x + square.size.w == can.width)
                right = false;
            else if (x == 0)
                right = true;
            if (right)
                ++x;
            else
                --x;
            if (!enter)
                square.moveTo({x: x, y: square.point.y});
            translate();
        }, 1);
    }
    translate();
}

function displayScore(score) {
    document.getElementById("score").innerHTML = score;
}