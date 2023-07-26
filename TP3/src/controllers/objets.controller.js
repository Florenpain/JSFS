
/* retrieve the model : necessary to interact with the database */
const Objets = require('../models/objets.model').model;




/* controller for POST /create : execute the create operation in the db and return created book of successfull*/
const createObjets =
 async (req, res, _) => {
   //const newBook = { title : req.body.title, author : req.body.author, year : req.body.year, cover : req.body.cover };
   const newObjetsData = { ...req.body , userId : req.userId };    // extract object from body using '...' operator and pattern matching
   try {
     console.log('**'+newObjetsData.usderId);

     const createdObjets = await Objets.create(newObjetsData);
     console.log(createdObjets);
     res.status(201).json(createdObjets);
   }
   catch(error) {
     res.status(400).json(error);
   }
   /*  promise.then version
   Books.create(newBookData)
     .then( createdook => res.status(200).json(createdBook) ) ;    //  responds with code 200 and sends created book
     .catch( error => res.status(400).json(error) );       // if creation fails => responds with code 400
    */
 }





 const allObjets =
  async (req,res) => {
        const allobjets = await Objets.find().where('userId').ne(req.userId);
        res.status(200).json(allobjets);
    }
	
	
	 const userallObjets =
  async (req,res) => {
        const allobjets = await Objets.find().where('userId').equals(req.userId);
        res.status(200).json(allobjets);
    }



    const deleteObjet =
      async (req,res) => {
        console.log(req.params.ObjetId);
          await Objets.findByIdAndRemove( req.params.objetId );
          res.status(200).json(null);
       }







module.exports.create = createObjets;
module.exports.update = allObjets;
module.exports.userobjet = userallObjets;
module.exports.deleteObjet = deleteObjet;
