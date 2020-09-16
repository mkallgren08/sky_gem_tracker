const router = require("express").Router();
const exampleRoutes = require('./examples.js')
const userRoutes = require('./user.js')

//  routes
router.use("/example",exampleRoutes)
router.use("/user",userRoutes);

module.exports = router;
