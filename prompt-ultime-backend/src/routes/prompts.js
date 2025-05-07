const express = require('express');
const router = express.Router();

const step1Html = \`
  <h1>🧪 Prototype Prompt Ultime – Version immersive</h1>
  <h2>Seuil d’entrée — Immersion inversée</h2>
  <p>🔬 Interface d’observation inversée : ici, les comportements considérés comme normaux deviennent objets d’étude…</p>
\`;

router.get('/step1', (req, res) => {
  res.json({ prompt: step1Html });
});

module.exports = router;
