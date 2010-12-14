jQuery(document).ready(function() {
    main(document.getElementById("can"));
});

function main(canvas) {
    var cubes = new Array(new Square({x: 10, y: 10},
				     {w: 10, h: 10}, undefined, canvas));
    var head = cubes[0];
    var direction = 'd';
    var pause = false;
    var score = 0;
    var loose = false;
    var food = undefined;
    var date = new Date();
    var timer = date.getTime();
    
    // catch the key
    var textbox = document.createElement("input");
    textbox.setAttribute('type', 'text', 0);
    textbox.setAttribute('style',
			 'position: absolute;top: -9999em;left: -9999em;', 0);
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
        else if (key == 40 && direction != 'd' && direction != 'u')
            direction = 'd';
        else if (key == 38 && direction != 'd' && direction != 'u')
            direction = 'u';
        else if (key == 37 && direction != 'l' && direction != 'r')
            direction = 'l';
        else if (key == 39 && direction != 'l' && direction != 'r')
            direction = 'r';
        this.value = '';
    });
    jQuery(textbox).bind("blur", function () {
        this.focus();
    });
    textbox.focus();

    function move() {
        date = new Date();
        setTimeout(function () {
            if (pause || loose) {
                move();
                return ;
            }
	    
            // Move the head of the snake
            var oldPoint = {x: head.point.x, y: head.point.y};
            if (direction == 'd')
                head.moveTo({x: head.point.x, y: head.point.y + head.size.h});
            else if (direction === 'u')
                head.moveTo({x: head.point.x, y: head.point.y - head.size.h});
            else if (direction === 'r')
                head.moveTo({x: head.point.x + head.size.w, y: head.point.y});
            else if (direction === 'l')
                head.moveTo({x: head.point.x - head.size.w, y: head.point.y});
	    
            // move the corps of the snake
            var tmpPoint;
            for (var i = 1 ; i < cubes.length ; ++i) {
                tmpPoint = {x: cubes[i].point.x, y: cubes[i].point.y};
                cubes[i].moveTo(oldPoint);
                oldPoint = tmpPoint;
            }

            // check if you loose
            if ((head.point.x + head.size.w > canvas.width)
                || (head.point.x < 0)
                || (head.point.y + head.size.h > canvas.height)
                || (head.point.y < 0))
                loose = true;
	    else if (eatme(cubes) == true)
		loose = true;
	    if (loose == true) {
		alert("You loose !!!");
		return ;
	    }

            // check if you eat
            if (food && head.point.x == food.point.x
		&& head.point.y == food.point.y) {
                cubes.push(food);
                score += 20;
                food = undefined;
                timer = date.getTime();
                displayScore(score);
            }

            // put the food on the area
            if (timer + 5000 <= date.getTime() && !food) {
                food = new Square({x: Math.round(Math.random()
						 * (canvas.width - head.size.w)
						 / head.size.w) * head.size.w,
				   y: Math.round(Math.random()
						 * (canvas.height - head.size.h)
						 / head.size.h) * head.size.h},
				  {w: 10, h: 10}, undefined, canvas);
                timer = date.getTime();
            }
            // remove the food on the area
            else if (timer + 5000 <= date.getTime() && food) {
                food.remove();
                food = undefined;
                timer = date.getTime();
            }

            move();
        }, 100);
    }
    move();
}

function displayScore(score) {
    document.getElementById("score").innerHTML = score;
}

function eatme(cubes) {
    var head = cubes[0];
    for (var i = 1 ; i < cubes.length ; ++i)
	if (head.point.x == cubes[i].point.x
	    && head.point.y == cubes[i].point.y)
	    return true;
    return false;
}