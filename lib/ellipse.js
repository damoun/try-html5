var Ellipse = function(point, size, color, canvas) {
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

Ellipse.prototype = {
    moveTo: function(point) {
        this.remove();
        this.point.x = point.x;
        this.point.y = point.y;
        this.draw();
    },
    
    draw: function() {
        this.ctx.fillStyle = this.color;
        if (this.ctx) {
            var kappa = .5522848,
                    ox = (this.size.w / 2) * kappa,
                    oy = (this.size.h / 2) * kappa,
                    xe = this.point.x + this.size.w,
                    ye = this.point.y + this.size.h,
                    xm = this.point.x + this.size.w / 2,
                    ym = this.point.y + this.size.h / 2;

            this.ctx.beginPath();
            this.ctx.moveTo(this.point.x, ym);
            this.ctx.bezierCurveTo(this.point.x, ym - oy, xm - ox, this.point.y, xm, this.point.y);
            this.ctx.bezierCurveTo(xm + ox, this.point.y, xe, ym - oy, xe, ym);
            this.ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
            this.ctx.bezierCurveTo(xm - ox, ye, this.point.x, ym + oy, this.point.x, ym);
            this.ctx.closePath();
            this.ctx.fill();
        }
    },

    remove: function() {
        if (this.ctx)
            this.ctx.clearRect(this.point.x - 1, this.point.y - 1, this.size.w + 2, this.size.h + 2);
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