const express = require('express')

// router
const router = express.Router();
// get all project
router.get('/',(req,res)=>{
res.json({message : ' get all project'})
})

//  get a single project

router.get("/:id",(req,res)=>{
    res.json({message: 'get a single project'})
    })

    // post a new project
    router.post("/", (req, res)=>{
      res.json({message: 'post a new project'})
    })
    // delete a projet
    router.delete('/:id', (req, res)=>{
        res.json({message: 'deleted a project'})
    })

    // update a project 
    router.patch('/:id', (req,res)=>{
      res.json({message: 'patch a project'})
    })
 module.exports = router;