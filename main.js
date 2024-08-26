let x= 50;
let y = 300;
let z = 390;
let w = 30;
let delay = 3;
let estado = 'menu';
let img;
let textX= 740;
let textY= 820;
let textY1= 845;
let textY2= 868;
let textZ= 790;
let textW= 910;
let textU= 940;
let imgY= 1020;
let fonte;
//-----------------------------
let t;
let g;
let diametro = 100;
let speed = 5;
let score = 0;
let erro = 0;
let r;
//*************************************
let startTime;
let gameDuration = 20000;
let gameOver = false;


// Limites do retângulo
const rectX = 100;
const rectY = 50;
const rectW = 670;
const rectH = 500;

function preload(){
  img = loadImage('tads.png');
  fonte = loadFont('Play Story.otf');
}

function setup() {
  createCanvas(800, 600);
  
  // Criação dos botões
  botaoJogo = createButton('START');
  botaoJogo.position(-5, 250);
  botaoJogo.mousePressed(() => estado = 'start');
  botaoJogo.class('botao-jogo');

  
  botaoCreditos = createButton('CREDITOS');
  botaoCreditos.position(12, 300);
  botaoCreditos.mousePressed(() => estado = 'creditos');
  botaoCreditos.class('botao-creditos');
  
  // Criando um elemento <div> para o texto
    let textoDiv = createDiv('JOGO DA BOLINHA');
    textoDiv.class('texto-estilizado');
  
    let canvas = select('canvas');
    canvas.position(0, 0);
  
    t = width; 
    g = height / 2;
  
  startTime = millis();
}

function draw() {
  background('#FF9800');
  //stroke('red');
  fill('black')
  rect(rectX, rectY, rectW, rectH);
  
  
  //*******************************************
  
  
  
  //------------CHAMAR JOGO------------ 
  if (estado === 'creditos') {
    mostrarCreditos();
  } else if (estado === 'start') {
    start();
    tempo();
  }  
   
  
  
  //******* Exibe a pontuação********
  fill('#000000');
  textSize(20);
  text("Score: " + score, 5, 75);
  // Exibe a pontuação
  fill('#000000');
  textSize(20);
  text("Erros: " + erro, 5, 95);
  
  //************************************
  
  fill('rgb(0,0,0)');
  textSize(12);
  text("® Tiago de Melo", 398, 580);
  
}

function start() {
  clear();
  background('#FF9800');
  //stroke('red');
  fill('black')
  rect(rectX, rectY, rectW, rectH);
  // Desenha o círculo
  fill('rgb(250,223,7)');
  ellipse(t, g, diametro, diametro);
  
  
  t -= speed; // *****Atualiza a posição do círculo
  
  // Verifica se o círculo saiu da tela e reinicia sua posição e tamanho
  if (t <= rectX +20) {
    resetCircle();
  }
 
}

// Função chamada quando o botão "Créditos" é pressionado
function mostrarCreditos() {
  clear();
  background('#FF9800');
  //stroke('red');
  fill('black')
  rect(rectX, rectY, rectW, rectH);
  
  
  textSize(22);
  fill('rgb(255,255,255)');
  text("Creditos",400 , textX);  
  
  textSize(18);
  text("Analistas e Desenvolvedores de Sistemas",265, textZ);
  textSize(15);
  text("Tiago de Melo Monteiro",365, textY);
  text("Marlon Oliveira Augusto",365, textY1);
  text("Daniel Lima de Farias",373, textY2);

  textSize(18);
  text(" Docente",404, textW);
  textSize(15);
  text("Me. Joel de Oliveira Santos 1",352, textU);
  strokeWeight(6);
  
  image(img, 380, imgY, 125, 130);

  if(textZ >= 170){
    textX--;
    textY--;
    textZ--;
    textY1--;
    textY2--;
    textW--;
    textU--;
    imgY--;
  }
  
   
  
}

//** Função para reiniciar o círculo com uma nova posição e tamanho dentro do retângulo**
function resetCircle() {
  t = rectX + rectW - 30; // Garante que o círculo apareça na borda direita do retângulo
  g = random(rectY + diametro / 2, rectY + rectH - diametro / 2); // Garante que o círculo apareça dentro do retângulo
  diametro = random(20, 100); // Define um tamanho aleatório para o círculo
}




 //****função que é acionada quando o mouse é clicado**

function mousePressed() {
  
  let d = dist(mouseX, mouseY, t, g);
   if (mouseX > rectX && mouseX < rectX + rectW && mouseY > rectY && mouseY < rectY + rectH) {
  if (d < diametro /2) {
    score++;
   
    resetCircle(); // Reinicia o círculo
  }else{
    erro++; 
  }
}
}

//*************************************************
  
function mostrarFinalJogo() {
  
  background('#000000');
  fill('#FDC10A');
  textSize(30);
  textAlign(CENTER, CENTER);
  text("Fim de Jogo", width / 2, height / 2 - 20);
  textSize(20);
  text("Score: " + score, width / 2, height / 2 + 20);
  text("Erros: " + erro, width / 2, height / 2 + 50);
  
  if(score > erro){
    fill('#FDC10A');
    textSize(35);
    textAlign(CENTER, CENTER);
    text("VOCÊ GANHOU", width / 2, height / 2 - 75);
  }else if(score == erro){
    fill('#FDC10A');
    textSize(35);
    textAlign(CENTER, CENTER);
    text("EMPATE", width / 2, height / 2 - 75);
  }else{
    fill('#FDC10A');
    textSize(35);
    textAlign(CENTER, CENTER);
    text("VOCÊ PERDEU", width / 2, height / 2 -75);
  }
   // Ocultar botões quando o jogo terminar
  botaoJogo.style('visibility', 'hidden');
  botaoCreditos.style('visibility', 'hidden');
}
function tempo(){
  let currentTime = millis(); // Tempo atual
  let elapsedTime = currentTime - startTime; // Tempo decorrido
  
  if (elapsedTime >= gameDuration) {
    gameOver = true; // Define que o jogo acabou
  }
  
  if (gameOver) {
    mostrarFinalJogo(); // Mostra a tela de fim de jogo
    return; // Para a execução do resto do código no draw
  }
  
  fill('#090909');
  textSize(20);
  let timeLeft = Math.ceil((gameDuration - elapsedTime) / 1000); // Calcula o tempo restante em segundos
  text("Tempo: " + timeLeft, 4, 117);
  
}