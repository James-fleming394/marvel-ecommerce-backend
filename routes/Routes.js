const express = require("express");
const router = express.Router();
const controllers = require('../controllers/productControllers')
const controller = require('../controllers/toyControllers')
const control = require('../controllers/apparelControllers')
const controls = require('../controllers/cartControllers')

router.get('/', (req, res) => {
    res.send('Root page route functional')
})

//Comics 

router.get('/comics', controllers.getAllComics )
router.get('/comics/:id', controllers.getComicById)
router.post('/comics', controllers.createComic)
router.put('/comics/:id', controllers.updateComic)
router.delete('/comics/:id', controllers.deleteComic)

//Toys

router.get('/toys', controller.getAllToys)
router.get('/toys/:id', controller.getToyById)
router.post('/toys', controller.createToy)
router.put('/toys/:id', controller.updateToy)
router.delete('/toys/:id', controller.deleteToy)

//Apparel

router.get('/apparel', control.getAllApparel)
router.get('/apparel/:id', control.getApparelById)
router.post('/apparel', control.createApparel)
router.put('/apparel/:id', control.updateApparel)
router.delete('/apparel/:id', control.deleteApparel)

//Cart 

router.get('/cart', controls.getCart)
router.delete('/cart/:id', controls.deleteCart)


module.exports = router;