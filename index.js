const express = require('express');
const app = express();
const PORT = 3000;

// Função para gerar cor aleatória
function gerarCorAleatoria() {
  const letras = '0123456789ABCDEF';
  let cor = '#';
  for (let i = 0; i < 6; i++) {
    cor += letras[Math.floor(Math.random() * 16)];
  }
  return cor;
}

function gerarSVG(inicial, corFundo, size = 100, shape = 'rounded') {
  const borderRadius = shape === 'circle' ? size / 2 : shape === 'rounded' ? 20 : 0;
  const fontSize = size / 2; // Tamanho da letra proporcional ao avatar

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <rect width="${size}" height="${size}" fill="${corFundo}" rx="${borderRadius}" ry="${borderRadius}"/>
    <text x="50%" y="50%" font-size="${fontSize}" fill="#ffffff" 
          text-anchor="middle" alignment-baseline="central" font-family="Helvetica, Arial, sans-serif">${inicial}</text>
  </svg>`;
}


// Rota que retorna SVG puro para <img>
app.get('/avatar-img', (req, res) => {
  const nome = req.query.nome || 'A';
  const inicial = nome.charAt(0).toUpperCase();
  const corFundo = gerarCorAleatoria();
  const size = parseInt(req.query.size) || 100;
  const shape = req.query.shape || 'rounded';

  const svg = gerarSVG(inicial, corFundo, size, shape);

  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});

// Rota que retorna JSON com todos os dados do avatar
app.get('/avatar-data', (req, res) => {
  const nome = req.query.nome || 'A';
  const inicial = nome.charAt(0).toUpperCase();
  const corFundo = gerarCorAleatoria();
  const size = parseInt(req.query.size) || 100;
  const shape = req.query.shape || 'rounded';

  const svg = gerarSVG(inicial, corFundo, size, shape);

  res.json({
    nome,
    inicial,
    corFundo,
    size,
    shape,
    svg
  });
});

app.listen(PORT, () => {
  console.log(`API de avatar rodando em http://localhost:${PORT}`);
});
