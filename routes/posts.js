const router = require('express').Router();
const verify = require('./verifyToken');


router.get('/',verify,(req,res)=>{
    res.json({posts : {title : 'My First Post'}, user : req.user});

})

module.exports = router;