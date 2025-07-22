const authService = require('../services/authService');

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    await authService.register(email, password);
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    if (err.message === 'EMAIL_EXISTS') {
      res.status(400).json({ message: 'Email déjà utilisé' });
    } else {
      res.status(500).json({ message: 'Erreur serveur' });
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Champs manquants' });
  }
  
  try {
    const token = await authService.login(email, password);
    res.status(200).json({ token });
  } catch (err) {
    if (err.message === 'USER_NOT_FOUND') {
      res.status(404).json({ message: 'Utilisateur inconnu' });
    } else if (err.message === 'INVALID_PASSWORD') {
      res.status(401).json({ message: 'Mot de passe incorrect' });
    } else {
      res.status(500).json({ message: 'Erreur serveur' });
    }
  }
};

module.exports = { register, login };
