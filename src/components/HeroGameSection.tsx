'use client';

import { useEffect, useRef } from 'react';

export default function HeroGameSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reqRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scoreElement = document.getElementById('score');
    const highScoreElement = document.getElementById('highScore');
    const gameStatusElement = document.getElementById('gameStatus');

    let gameRunning = true;
    let score = 0;
    let highScore = parseInt(localStorage.getItem('dogGameHighScore') || '0');
    let gameSpeed = 2;

    const dog = {
      x: 80,
      y: 200,
      width: 60,
      height: 40,
      velocityY: 0,
      jumping: false,
      grounded: true,
    };

    let balls: Array<{ x: number; y: number; radius: number; speed: number }> = [];
    let ballSpawnTimer = 0;
    const groundY = 240;

    dog.y = groundY - dog.height;
    if (highScoreElement) highScoreElement.textContent = String(highScore);

    function drawDog() {
      if (!ctx) return;
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(dog.x, dog.y, dog.width, dog.height);
      ctx.fillRect(dog.x + dog.width - 20, dog.y - 15, 25, 25);
      ctx.fillStyle = '#654321';
      ctx.fillRect(dog.x + dog.width - 18, dog.y - 20, 8, 15);
      ctx.fillRect(dog.x + dog.width - 5, dog.y - 20, 8, 15);
      ctx.fillStyle = '#000';
      ctx.fillRect(dog.x + dog.width - 8, dog.y - 8, 3, 3);
      ctx.fillRect(dog.x + dog.width + 2, dog.y - 5, 2, 2);
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(dog.x + 10, dog.y + dog.height, 8, 15);
      ctx.fillRect(dog.x + 25, dog.y + dog.height, 8, 15);
      ctx.fillRect(dog.x + 40, dog.y + dog.height, 8, 15);
      ctx.fillRect(dog.x + 55, dog.y + dog.height, 8, 15);
      ctx.fillStyle = '#654321';
      ctx.fillRect(dog.x - 15, dog.y + 10, 20, 8);
    }

    function drawBall(ball: { x: number; y: number; radius: number }) {
      if (!ctx) return;
      ctx.fillStyle = '#FF6B6B';
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFB6C1';
      ctx.beginPath();
      ctx.arc(ball.x - 3, ball.y - 3, ball.radius * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawGround() {
      if (!ctx) return;
      ctx.fillStyle = '#228B22';
      ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);
      ctx.fillStyle = '#32CD32';
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.fillRect(i, groundY, 2, 10);
        ctx.fillRect(i + 7, groundY, 2, 8);
        ctx.fillRect(i + 14, groundY, 2, 12);
      }
    }

    function updateDog() {
      if (dog.jumping) {
        dog.velocityY += 0.8;
        dog.y += dog.velocityY;
        if (dog.y >= groundY - dog.height) {
          dog.y = groundY - dog.height;
          dog.jumping = false;
          dog.grounded = true;
          dog.velocityY = 0;
        }
      }
    }

    function jump() {
      if (dog.grounded && gameRunning) {
        dog.velocityY = -15;
        dog.jumping = true;
        dog.grounded = false;
      }
    }

    function spawnBall() {
      balls.push({
        x: canvas.width,
        y: Math.random() * 100 + 150,
        radius: 12,
        speed: gameSpeed + Math.random() * 2,
      });
    }

    function updateBalls() {
      for (let i = balls.length - 1; i >= 0; i--) {
        balls[i].x -= balls[i].speed;
        const distance = Math.hypot(
          balls[i].x - (dog.x + dog.width / 2),
          balls[i].y - (dog.y + dog.height / 2)
        );
        if (distance < balls[i].radius + 20) {
          balls.splice(i, 1);
          score++;
          if (scoreElement) scoreElement.textContent = String(score);
          if (score > highScore) {
            highScore = score;
            if (highScoreElement) highScoreElement.textContent = String(highScore);
            localStorage.setItem('dogGameHighScore', String(highScore));
          }
          if (score % 5 === 0) {
            gameSpeed += 0.5;
          }
          continue;
        }
        if (balls[i].x + balls[i].radius < 0) {
          balls.splice(i, 1);
        }
      }
    }

    const loop = () => {
      if (!ctx) return;
      if (gameRunning) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGround();
        updateDog();
        updateBalls();
        ballSpawnTimer++;
        if (ballSpawnTimer > 120 - score * 2) {
          spawnBall();
          ballSpawnTimer = 0;
        }
        drawDog();
        balls.forEach(drawBall);
        reqRef.current = requestAnimationFrame(loop);
      }
    };

    function handleKeyDown(e: KeyboardEvent) {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    }

    function handleTouchStart(e: TouchEvent) {
      e.preventDefault();
      jump();
    }

    document.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });

    if (gameStatusElement) gameStatusElement.innerHTML = '';
    reqRef.current = requestAnimationFrame(loop);

    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
      document.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return (
    <section className="hero-game-section">
      <div className="hero-content">
        <h1 className="hero-title">NYC&apos;s Ultimate Dog Park Directory</h1>
        <p className="hero-subtitle">Discover the perfect park for you and your furry friend across all five boroughs</p>
        <div className="game-container">
          <h2 className="game-title">🐕 Catch the Ball! 🎾</h2>
          <p className="game-instructions">Press SPACEBAR to make your dog jump and catch the balls!</p>
          <canvas ref={canvasRef} id="gameCanvas" width={600} height={300} />
          <div className="score-container">
            <div className="score">Score: <span id="score">0</span></div>
            <div id="gameStatus"></div>
            <div className="score">High Score: <span id="highScore">0</span></div>
          </div>
        </div>
        <div className="cta-section">
          <p className="cta-text">Ready to find the perfect park for your pup?</p>
          <a href="#directory" className="cta-button">Explore Dog Parks</a>
        </div>
      </div>
    </section>
  );
} 