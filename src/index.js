/* 2D */
var twoD = (function(){

    var canvas = document.getElementById("myCanvas"),
    ctx = canvas.getContext("2d"),
    x = canvas.width/ 2,
    y = canvas.height - 30,
    dx = 2,
    dy = -2,
    ballRadius = 10,
    paddleHeight = 10,
    paddleWidth = 75,
    paddleX = (canvas.width - paddleWidth)/ 2,
    rightPressed = false,
    leftPressed = false,
    score = 0,
    lives = 3,

    /* Brick Info*/

    brickRowCount = 3,
    brickColumnCount = 5,
    brickWidth = 75,
    brickHeight = 20,
    brickPadding = 10,
    brickOffsetTop = 30,
    brickOffsetLeft = 30,

    /*Brick Making*/

    bricks=[];
    for(var c=0;c<brickColumnCount;c++){
        bricks[c]=[];
        for(var r=0;r<brickRowCount;r++){
            bricks[c][r] = {x:0,y:0,status:1};
        }
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);

    function keyDownHandler(e){
        if(e.keyCode == 39){
            rightPressed = true;
        }
        else if(e.keyCode == 37){
            leftPressed = true;
        }
    }

    function keyUpHandler(e){
        if(e.keyCode == 39){
            rightPressed = false;
        }
        else if(e.keyCode == 37){
            leftPressed = false;
        }
    }

    function mouseMoveHandler(e){
        var relativeX = e.clientX - canvas.offsetLeft;
        if(relativeX > 0 && relativeX < canvas.width){
            paddleX = relativeX-paddleWidth/2;
        }
    }

    function drawBall(){
        ctx.beginPath();
        ctx.arc(x,y,ballRadius,0,Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle(){
        ctx.beginPath();
        ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function drawBricks(){
        for(c=0;c<brickColumnCount;c++){
            for(r=0;r<brickRowCount;r++){
                if(bricks[c][r].status ==1){
                    var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX,brickY,brickWidth,brickHeight);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
    function collisionDetection() {
        for(c=0; c<brickColumnCount; c++) {
            for(r=0; r<brickRowCount; r++) {
                var b = bricks[c][r];
                if(b.status == 1){
                    if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                        dy = -dy;
                        b.status =0;
                        score++;
                        if(score == brickColumnCount*brickRowCount){
                            alert('you win');
                        }
                    }
                }

            }
        }
    }

    function drawScore() {
        ctx.fillText("Score: "+score, 8, 20);
    }

    function drawLives(){
        ctx.fillText("Lives: "+lives, 400, 20);
    }
    function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawLives();
        collisionDetection();

        if(x + dx > canvas.width-ballRadius){
            dx=-dx;
            console.log('right dx',dx);
        }
        if(x + dx < ballRadius){
            dx=-dx;
            console.log('left dx',dx);
        }
        if(y + dy > canvas.height-ballRadius) {
            if(x>paddleX && x < paddleX + paddleWidth)
                dy=-dy;
            else{
                lives--;
                console.log('lives',lives);
                if(!lives){
                    console.log('end case');
                    document.location.reload();
                }
                else {
                    x = canvas.width/2;
                    y = canvas.height-30;
                    dx = 2;
                    dy = -2;
                    paddleX = (canvas.width-paddleWidth)/2;
                }
            }
        }
        if(y + dy < ballRadius){
           dy=-dy;
           console.log('up dy',dy);
        }

        if(rightPressed && canvas.width - paddleWidth > paddleX) {
            paddleX += 7;
        }
        else if(leftPressed && paddleX > 0) {
            paddleX -= 7;
        }

        x+= dx;
        y+= dy;
    }


    return{
        draw: draw
    }

})();

setInterval(twoD.draw,10);