const {getCars, addCar, deleteCar} = require("../models/car.model");
const {uploadToS3} = require("../services/upload.service");

const getAllCar = async(req, res) => {
    try{
        const cars = await getCars();
        return res.render("index", {cars});
    }catch(error){
        return res.status(500).json({message: "Error getAllCar"});
    }
}

const saveCar = async(req, res) => {
    let imageUrl = null;
    if(req.file){
        try{
            const uploadedImage = await uploadToS3(req.file);
            imageUrl = uploadedImage.Location;
        }catch(error){
            return res.status(500).json({message: "Error uploading image:", error});
        }
    }
    try{
        const car = {
            // CarID: req.body.CarID,
            CarName: req.body.CarName,
            CarType: req.body.CarType,
            ImageURL: imageUrl,
            Price: req.body.Price
        }
        await addCar(car);
        return res.redirect("/");
    }catch(error){
        return res.status(500).json({message: "Error saveCar"});
    }
}

const removeCar = async(req, res) => {
    try{
        await deleteCar(req.body.CarID);
        return res.redirect("/");
    }catch(error){
        return res.status(500).json({message: "Error saveCar"});
    }
}

module.exports = {getAllCar, saveCar, removeCar}
