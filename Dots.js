window.onload = function() {
    let dots = [],
        dotNum = 0,
        dotDistance = 250,
        width = parseInt(document.documentElement.clientWidth),
        height = parseInt(document.documentElement.clientHeight),
        cssTest = "width:"+width+"px;height:"+height,
        canvas = document.getElementById("canvas"),
        area = width*height,
        ctx = canvas.getContext('2d');
    canvas.setAttribute('style',cssTest);
    canvas.width = (width*2).toString();
    canvas.height = (height*2).toString();
    dotNum = parseInt(area/6000);

    for(let i=0; i<dotNum; i++) {
        let dot = new Dots(canvas);
        dots.push(dot);
    }

    document.addEventListener('mousemove',function(e) {
        let tx = e.pageX,
            ty = e.pageY;
        if((tx>0&&tx<canvas.width)&&(ty>0&&ty<canvas.height)) {
            dots[dotNum-1].mouseDot(tx,ty);
        }
    });

    requestAnimationFrame(animateUpdate);
    function animateUpdate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(let i=0; i<dotNum; i++) {
            dots[i].updateDot();
        }
        for(let i=0; i<dotNum; i++)
            for(let j=i+1; j<dotNum; j++) {
                let tx = dots[i].x - dots[j].x,
                    ty = dots[i].y - dots[j].y,
                    s = Math.sqrt(Math.pow(tx,2)+Math.pow(ty,2));
                if(s<dotDistance) {
                    ctx.beginPath();
                    ctx.moveTo(dots[i].x, dots[i].y);
                    ctx.lineTo(dots[j].x, dots[j].y);
                    ctx.strokeStyle = "rgba(255,255,255,"+(dotDistance-s)/dotDistance+")";
                    ctx.strokeWidth = 1;
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        requestAnimationFrame(animateUpdate);
    }
}
class Dots {
    constructor(canvas) {
        this.init(canvas);
    }
    drewDot() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        this.ctx.fillStyle = "rgba(255,255,255,8)";
        this.ctx.fill();
        this.ctx.closePath();
    }
    init(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.x = Math.random()*this.canvas.width;
        this.y = Math.random()*this.canvas.height;
        this.r = Math.random()*4;

        this.sx = Math.random()*4-2;
        this.sy = Math.random()*4-2;
        this.drewDot();
    }
    updateDot() {
        this.x+=this.sx;
        this.y+=this.sy;

        if(this.x<0||this.x>this.canvas.width) {
            this.init(this.canvas);
        }
        if(this.y<0||this.y>this.canvas.height) {
            this.init(this.canvas);
        }       
        this.drewDot();
    }

    mouseDot(x, y) {
        this.x = x*2;
        this.y = y*2;
        if((this.x>0&&this.x<this.canvas.width)&&(this.y>0&&this.y<this.canvas.height)) {
            this.drewDot();
        }
    }
}