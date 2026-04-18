const express = require('express');
const router = express.Router();
const multer = require('multer');
const Manage_Category = require('../models/Manage_Category');

router.post('/admin-manage-category', async (req , res)=>
{
    try
    {
        const lastCategory = await Manage_Category.findOne().sort({ cat_id: -1 });

        let newcat_id = 1;

        if(lastCategory)
        {
            newcat_id = lastCategory.cat_id + 1;
        }

        const newCategory = new Manage_Category({
            cat_id: newcat_id,
            category: req.body.category
        });

        await newCategory.save();

        res.status(200).json({
            message: "Category added successfully",
            category : newCategory
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

router.get('/get-category', async (req, res) => {
  try {

    const categories = await Manage_Category.find().sort({cat_id:1});

    res.json(categories);

  } 
  catch (error) {

    console.log(error);
    res.status(500).json({ message: "Server Error" });

  }
});

router.delete('/delete-category/:id', async(req,res)=>{
  try{
    await Manage_Category.findByIdAndDelete(req.params.id);
    res.json({message:"Category deleted"});
  }
  catch(err){
    res.status(500).json({message:"Server Error"});
  }
});

router.put('/update-category/:id', async(req,res)=>{
  try{
    const updated = await Manage_Category.findByIdAndUpdate(
      req.params.id,
      {category:req.body.category},
      {new:true}
    );

    res.json(updated);
  }
  catch(err){
    res.status(500).json({message:"Server Error"});
  }
});


module.exports = router;