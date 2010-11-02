var Square = function(point, size, color, canvas) {
    this.canvas = canvas;
    this.point = point;
    this.size = size;
    this.deg = 0;
    if (color)
        this.color = color;
    else
        this.color = this.randomColor();
    if (this.canvas.getContext)
        this.ctx = this.canvas.getContext('2d');
    this.draw();
};

Square.prototype = {
    moveTo: function(point) {
        this.remove();
        this.point.x = point.x;
        this.point.y = point.y;
        this.draw();
    },

    rotate: function(deg) {
        this.remove();
        this.deg += deg;
        this.draw();
    },

    draw: function() {
        this.ctx.fillStyle = this.color;
        if (this.ctx && this.deg) {
            this.ctx.save();
            this.ctx.translate(this.point.x + this.size.w / 2, this.point.y + this.size.h / 2);
            this.ctx.rotate(this.deg * Math.PI / 180);
            this.ctx.fillRect(-(this.size.w / 2), -(this.size.h / 2), this.size.w, this.size.h);
            this.ctx.restore();
        }
        else if (this.ctx)
            this.ctx.fillRect(this.point.x, this.point.y, this.size.w, this.size.h);
    },
    
    remove: function() {
        if (this.ctx && this.deg) {
            this.ctx.save();
            this.ctx.translate(this.point.x + this.size.w / 2, this.point.y + this.size.h / 2);
            this.ctx.rotate(this.deg * Math.PI / 180);
            this.ctx.clearRect(-(this.size.w / 2) - 1, -(this.size.h / 2) - 1, this.size.w + 2, this.size.h + 2);
            this.ctx.restore();
        }
        else if (this.ctx)
            this.ctx.clearRect(this.point.x, this.point.y, this.size.w, this.size.h);
    },

    randomColor: function(){
        var colors = new Array(14);
        colors[0]= "0";
        colors[1]= "1";
        colors[2]= "2";
        colors[3]= "3";
        colors[4]= "4";
        colors[5]= "5";
        colors[5]= "6";
        colors[6]= "7";
        colors[7]= "8";
        colors[8]= "9";
        colors[9]= "a";
        colors[10]= "b";
        colors[11]= "c";
        colors[12]= "d";
        colors[13]= "e";
        colors[14]= "f";
        var digit = new Array(5);
        var color = "";
        for (var i = 0 ; i < 6; ++i) {
            digit[i] = colors[Math.round(Math.random() * 14)];
            color += digit[i];
        }
        return color;
    }
};