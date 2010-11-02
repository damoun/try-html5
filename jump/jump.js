jQuery(document).ready(function() {
    main(document.getElementById("can"));
});

function main(canvas) {
    var score = 0;
    var direction = undefined;
    var pause = false;
    var man = new Ellipse({x: canvas.width / 2 - 20, y: canvas.height - 10}, {w: 40, h: 10}, undefined, canvas);

    // catch the key
    var textbox = document.createElement("input");
    textbox.setAttribute('type', 'text', 0);
    textbox.setAttribute('style', 'position: absolute;top: -9999em;left: -9999em;', 0);
    jQuery("body").append(textbox);
    jQuery(textbox).bind("keydown", function (e) {
        var key = e.keyCode || e.which;
        if (key == 37)
            direction = 'l';
        else if (key == 39)
            direction = 'r';
    });
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
        else if (key == 37)
            direction = undefined;
        else if (key == 39)
            direction = undefined;
        this.value = '';
    });
    jQuery(textbox).bind("blur", function () {
        this.focus();
    });
    textbox.focus();

    var beginY = man.point.y;
    var up = true;
    function jump () {
        setTimeout(function () {
            if (pause) {
                jump();
                return ;
            }
            if (direction == 'r')
                man.moveTo({x: man.point.x + 2, y: man.point.y});
            else if (direction == 'l')
                man.moveTo({x: man.point.x - 2, y: man.point.y});
            if (man.point.x > canvas.width)
                man.moveTo({x: 0, y: man.point.y});
            else if (man.point.x < 0)
                man.moveTo({x: canvas.width - man.size.w, y: man.point.y});
            if (up) {
                man.moveTo({x: man.point.x, y: man.point.y - 1});
                if (man.point.y <= beginY - 50)
                    up = false;
            }
            else {
                man.moveTo({x: man.point.x, y: man.point.y + 1});
                if (man.point.y >= beginY)
                    up = true;
            }
            jump();
        }, 10)
    }
    jump();
}

function displayScore(score) {
    document.getElementById("score").innerHTML = score;
}