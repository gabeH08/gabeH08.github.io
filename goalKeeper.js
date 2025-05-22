        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");

        let ballX = 50;
        let ballY = 50; 
        let ballDX = Math.random() * 4 + 2;
        let ballDY = Math.random() * 4 + 2;
        let score = 0;
        let gameRunning = true;

        const player = {
            x: 175,
            y: 350,
            width: 60,
            height: 15,
            color: "blue",
            speed: 4,
        };

        const keys = {};

        function drawGoal() {
            ctx.strokeStyle = "Black";
            ctx.lineWidth = 5;

            // Left post
            ctx.beginPath();
            ctx.moveTo(20, 350);
            ctx.lineTo(20, 380);
            ctx.stroke();

            // Right post
            ctx.beginPath();
            ctx.moveTo(370, 350);
            ctx.lineTo(370, 380);
            ctx.stroke();

            // Goalie Line
            ctx.beginPath();
            ctx.moveTo(20, 380);
            ctx.lineTo(370, 380);
            ctx.stroke();
        }

        function drawBall() {
            ctx.fillStyle = "Red";
            ctx.beginPath();
            ctx.arc(ballX, ballY, 15, 0, Math.PI * 2);
            ctx.fill();
        }

        function drawPlayer() {
            ctx.fillStyle = player.color;
            ctx.fillRect(player.x, player.y, player.width, player.height);
        }

        function movePlayer() {
            if (keys["ArrowLeft"] && player.x > 30) {
                player.x -= player.speed;
            }
            if (keys["ArrowRight"] && player.x + player.width < 370) {
                player.x += player.speed;
            }
        }

        function moveBall() {
            ballX += ballDX;
            ballY += ballDY;

            if (ballX < 15 || ballX > canvas.width - 15) {
                ballDX *= -1;
            }

            if (ballY < 15) {
                ballDY *= -1;
            }

            if (ballY > 380 && ballX > 50 && ballX < 350) {
            
                gameRunning = false;
            }
        }

        function checkCollision() {
            if (
                ballY + 15 >= player.y &&
                ballX >= player.x &&
                ballX <= player.x + player.width
            ) {
                ballDY *= -1;
                score++;
            }
        }

        function drawScore() {
            ctx.font = "16px Arial";
            ctx.fillStyle = "black";
            ctx.fillText("Shots Saved: " + score, 10, 20);
        }

        function animate() {
            if (gameRunning) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawGoal();
                movePlayer();
                drawPlayer();
                moveBall();
                drawBall();
                checkCollision();
                drawScore();
                requestAnimationFrame(animate);
            }
        }

        document.addEventListener("keydown", (e) => {
            keys[e.key] = true;
        });

        document.addEventListener("keyup", (e) => {
            keys[e.key] = false;
        });

        animate();
