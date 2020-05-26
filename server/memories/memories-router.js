const router = require('express').Router();
const memoriesModel = require('./memories-model')
router.get("/memories", (req, res) => {
    memoriesModel.memories()
        .then(memories => res.json(memories))
        .catch(() => res.status(500).json({error: "error occured retrieving"}))
})
router.use("/:id", confirmUser)

router.get("/:id", (req, res) => {
    memoriesModel.getUserMemories(req.params.id)
        .then(memories => {
            console.log(memories)
            res.json({memories})
        })
        .catch(err => {
            res.status(500).json({error: "error occured retrieving user memories"})
            console.log(err)
        })
})

router.post("/:id", (req, res) => {
    memoriesModel.addMemory({...req.body, user_id: req.params.id})
        .then(memories => res.json({memories}))
        .catch(err => {
            res.status(500).json({error: "error occured creating user memories"})
        })
})

router.put("/:id/:memory_id", (req, res) => {
    memoriesModel.updateMemory({...req.body, user_id: req.params.id}, req.params.memory_id)
        .then(memories => res.json({memories}))
        .catch(err => {
            res.status(500).json({error: "error occured updating user memories"})
        })
})

router.delete("/:id/:memory_id", (req, res) => {
    memoriesModel.deleteMemory(req.params.id, req.params.tab_id)
        .then(memories => res.json({memories}))
        .catch(err => {
            res.status(500).json({error: "error occured deleting user memories"})
        })
})



function confirmUser(req, res, next) {
    memoriesModel.getUser(req.params.id)
        .then(user => {
            if ( user ) {
                next()
            } else {
                res.status(400).json({message: "invalid user id"})
            }
        })
        .catch(err => {
            res.status(500).json({error: "error occured retrieving user information"})
        })
}

module.exports = router;