// app.js (ES module version)
import express from 'express';
import dotenv from 'dotenv';
import chatRoutes from './Services/Chat.js'; // include `.js` extension in imports

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
