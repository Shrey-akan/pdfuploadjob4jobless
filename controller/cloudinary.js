
const Linkschema = require("../model/cloudinary")
const cloudinary = require("cloudinary");
const cloudinaryset = async (req, res) => {

    try {
        const { uid, url } = req.body;
        if (!uid || !url) {
            return res.status(400).send("All fields are required");
          }
      
          const olduser = await Linkschema.findOne({uid:uid });
          if (olduser) {
            return res.status(400).send("already had resume");
          }
          
        const cloudImg = await cloudinary.uploader.upload(url, {
            folder: "job4joblessimage",
        });
        const cloud = await Linkschema.create({
            uid:uid,
            image: {
                publicId: cloudImg.public_id,
                url: cloudImg.secure_url,
            },
        });


        return res.status(200).send({ cloud });
    } catch (error) {
        return res.status(500).send("Error: " + error.message)
    }
}
const deleteimage= async(req,res)=>{
    const {uid}=req.body;
   try {
       if (!uid) {
           return res.status(400).send("All fields are required");
         }
       const data = await Linkschema.findOne( {uid});
       if (!data) {
           return res.status(400).send("NoThing to delete");
         }
         
         if (data.image && data.image.publicId) {
           await cloudinary.uploader.destroy(data.image.publicId, {
             folder: "job4joblessimage",
           });
         }
         const deletelink=await Linkschema.deleteOne({uid});

           return res.status(200).send("Deleted succesfully");
   } catch (error) {
       return res.status(500).send("Error: " + error.message)
   }
}
const updateimage=async(req,res)=>{
    try{
        const {uid,newUrl}=req.body;
        if (!uid || !newUrl) {
            return res.status(400).send("All fields are required");
          }
        const data = await Linkschema.findOne( {uid});
        if (!data) {
            return res.status(400).send("NoThing to delete");
          }
          const newImage = await cloudinary.uploader.upload(newUrl, {
            folder: "job4joblessimage",
          });         
    
         data.image={
            url:newImage.secure_url,
            publicId:newImage.public_id
         }
          await data.save();
        return res.status(200).send("Updated succesfully")
          
    }catch(e)
    {
        return res.status(500).send("Error: " + e.message);
    }
}
const getImage = async (req,res)=>{
   try {
    const {uid} = req.params
    if(!uid) {
      return res.status(400).send("params are required");
    }
    const data = await Linkschema.find({uid});
    return res.status(200).json({data});
   } catch (error) {
    return res.status(500).send("Error: " + e.message);
   }

}

module.exports = { cloudinaryset,deleteimage,updateimage,getImage};