const express = require('express');
const { createEmployee, updateEmployee, deleteEmployee, getEmployees } = require('../controllers/employee');
const router = express.Router();
const multer = require('multer');
const authenticateJWT = require('../middlewares/auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Only images (jpeg, png) are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.post('/createEmployee', authenticateJWT, upload.single('Image'), createEmployee);
router.put('/updateEmployee/:Id', authenticateJWT, upload.single('Image'), updateEmployee);
router.delete('/deleteEmployee/:Id', authenticateJWT, deleteEmployee);
router.get('/employees', authenticateJWT, getEmployees);

module.exports = router;
