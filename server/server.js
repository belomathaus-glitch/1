
const express = require('express');
const cors = require('cors');
const roletaRoutes = require('./routes/roleta');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/roleta', roletaRoutes);

app.get('/', (req, res) => {
  res.send('API de Roletas BLAC está rodando 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
