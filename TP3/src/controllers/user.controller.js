const User = require('../models/utilisateurs.model').model;

module.exports.home = (_,res) => res.redirect('/user.html');

module.exports.me =
  async (req, res) =>  {
    const user = await User.findById(req.userId);
	console.log("*****");
    console.log(user);
    console.log(req.userId);
    res.status(200).json({ name : user.name });
  }

module.exports.update =
  async (req,res) => {
    const updatedData = { ...req.body };
    console.log(updatedData);
    const user = await User.findByIdAndUpdate(req.userId,
                                              updatedData,
                                              { new : true });
    res.status(200).json({ name : user.name , message : 'mise à jour réussie'});
  }

  const getmoney =
   async (req,res) => {
         const allobjets = await User.find({_id : req.userId});
         res.status(200).json(allobjets);
     }
	 	 
	 const losemoney =
  async (req,res) => {
    const updatedData = { ...req.body };
    const user = await User.findByIdAndUpdate(req.userId,
                                              updatedData,
                                              { new : true });
    res.status(200).json({ name : user.name , message : 'mise à jour réussie'});
  }

  	 const winmoney =
  async (req,res) => {


	//on ne savais pas coment faire un += dnas la requête
	const allobjets = await User.find({_id : req.params.sellerid});
    const updatedData = { ...req.body };
		console.log("********");
	updatedData.number = updatedData.number+allobjets[0].number;
    const user = await User.findByIdAndUpdate(req.params.sellerid,
                                              updatedData,
                                              { new : true });
    res.status(200).json({ name : user.name , message : 'mise à jour réussie'});
  }

module.exports.getmoney = getmoney;
module.exports.losemoney = losemoney;
module.exports.winmoney = winmoney;


