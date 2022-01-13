const userModel = require("../models/usersModel");

const login = async ( req, res ) => {
    let user = await userModel.findOne({ address: req.body.address });
    console.log(user)
    if (user == undefined) {
        user = new userModel();
    }
    user.address = req.body.address;
    user.signature = req.body.signature;
    user.save();
    res.json({token: req.body.signature});
}

const user = ( req, res ) => {
    console.log(req.params)
    userModel.findOne({ address: req.params.id })
    .then(result => {
        res.json({user: result});
    })
    .catch(err => {
        console.log(err)
    })
}

const update = async ( req, res ) => {
    let user = await userModel.findOne({ address: req.body.address });
    user.name = req.body.name;
    user.description = req.body.description;
    user.avatar = req.body.avatar;
    user.twitter = req.body.twitter;
    user.telegram = req.body.telegram;
    user.instagram = req.body.instagram;
    user.save();
    res.json("success");
}

module.exports = {
    login,
    user,
    update
};