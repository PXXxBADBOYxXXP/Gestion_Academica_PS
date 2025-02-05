const { validationResult } = require('express-validator');

const validarCursos = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json(error);
    }   

    const { asignatura } = req.body;

    if (!Array.isArray(asignatura) || asignatura.length > 3) {
        return res.status(400).json({ errors: [{ msg: 'El arreglo asignatura debe tener exactamente 3 elementos' }] });
    }

    next();

}