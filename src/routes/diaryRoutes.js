const express = require('express');
const router = express.Router();
const {
  getAllEntries,
  getEntryById,
  createEntry,
  updateEntry,
  deleteEntry
} = require('../controllers/diaryController');
const { proteger } = require('../middlewares/auth');

// Todas as rotas de diário são protegidas
router.use(proteger);

// Rotas de entradas do diário
router.route('/entries')
  .get(getAllEntries)
  .post(createEntry);

router.route('/entries/:id')
  .get(getEntryById)
  .put(updateEntry)
  .delete(deleteEntry);

module.exports = router;
