const express = require('express')
const router = express.router()
const db = require('../config/database')

router.get('/', async(req, res) =>{
  try{
   res.sender('index')
  }catch(error){
    console.error(error);
  }
});

module.exports = router