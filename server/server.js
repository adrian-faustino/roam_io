const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

// server set up
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});