{\rtf1\ansi\ansicpg1252\cocoartf2709
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 javascript\
let player = document.getElementById('game-player');\
let currentPosition = 0;\
let touchStartX = 0;\
let touchEndX = 0;\
\
player.addEventListener('touchstart', handleTouchStart);\
player.addEventListener('touchmove', handleTouchMove);\
document.addEventListener('touchend', handleTouchEnd);\
\
function handleTouchStart(event) \{\
    let touch = event.touches[0];\
    touchStartX = touch.clientX;\
\}\
\
function handleTouchMove(event) \{\
    event.preventDefault();\
    let touch = event.touches[0];\
    currentPosition = currentPosition + (touch.clientX - touchStartX) * 0.9;\
\
    if (currentPosition < 0) \{\
        currentPosition = 0;\
    \} else if (currentPosition > document.getElementById('game-area').offsetWidth - player.offsetWidth) \{\
        currentPosition = document.getElementById('game-area').offsetWidth - player.offsetWidth;\
    \}\
\
    player.style.left = currentPosition + 'px';\
    touchStartX = touch.clientX;\
\}\
\
function handleTouchEnd(event) \{\
    if (touchEndX === touchStartX) \{\
        fireLaser();\
    \}\
\}\
\
document.addEventListener('keydown', movePlayer);\
\
function movePlayer(event) \{\
    let currentPosition = parseInt(window.getComputedStyle(player).getPropertyValue('left'));\
\
    if (event.key === 'ArrowLeft' && currentPosition > 0) \{\
        player.style.left = (currentPosition - 20) + 'px';\
    \} else if (event.key === 'ArrowRight' && currentPosition < document.getElementById('game-area').offsetWidth - player.offsetWidth) \{\
        player.style.left = (currentPosition + 20) + 'px';\
    \} else if (event.key === ' ') \{\
        fireLaser();\
    \}\
\}\
\
function fireLaser() \{\
    let laser = document.createElement('div');\
    laser.className = 'laser';\
\
    let currentPosition = parseInt(window.getComputedStyle(player).getPropertyValue('left'));\
    let laserPosition = currentPosition + (player.offsetWidth / 2) - (laser.offsetWidth / 2);\
\
    laser.style.left = laserPosition + 'px';\
    document.getElementById('lasers').appendChild(laser);\
\
    let timer = setInterval(() => \{\
        let aliens = document.getElementsByClassName('alien');\
        let laserRect = laser.getBoundingClientRect();\
\
        for (let i = 0; i < aliens.length; i++) \{\
            let alienRect = aliens[i].getBoundingClientRect();\
\
            if (laserRect.top > alienRect.top &&\
                laserRect.top < alienRect.bottom &&\
                laserRect.left > alienRect.left &&\
                laserRect.right < alienRect.right) \{\
                aliens[i].classList.remove('alien');\
                aliens[i].style.backgroundColor = 'transparent';\
                laser.parentElement.removeChild(laser);\
                clearInterval(timer);\
            \}\
        \}\
\
        let laserPosition = parseInt(laser.style.top);\
\
        if (laserPosition > 0) \{\
            laser.style.top = (laserPosition - 8) + 'px';\
        \} else \{\
            laser.parentElement.removeChild(laser);\
            clearInterval(timer);\
        \}\
    \}, 10);\
\}\
\
function createAliens() \{\
    let aliens = document.getElementById('aliens');\
\
    for (let i = 0; i < 10; i++) \{\
        let alien = document.createElement('div');\
        alien.className = 'alien';\
        alien.style.top = '30px';\
        alien.style.left = (i * 55) + 'px';\
        aliens.appendChild(alien);\
    \}\
\}\
\
createAliens();}