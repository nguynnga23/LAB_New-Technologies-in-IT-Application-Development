const {getPapers, addPaper, deletePaper} = require("../models/paper.model");
const { validatePaper } = require("../utils/validate");
const { uploadToS3 } = require("../services/upload.service")
// Get list paper
const getListPapers = async(req, res)=>{
    try{
        const papers = await getPapers();
        return res.render("index", {papers});
    }catch(error){
        return res.status(500).json({message: "Error"});
    }
}

// Add paper
const savePaper = async (req, res) => {
    let imageUrl = null;
    console.log("req.file:", req.file);

    if(req.file){
        try{
            const uploadedImage = await uploadToS3(req.file);
            imageUrl = uploadedImage.Location;
        } catch(error){
            return res.status(500).json({message: "Error uploading image", error: error.message})
        }
    }
    try {
        const paper = {
            ISBN: req.body.isbn,
            paper_name: req.body.paper_name,
            author: req.body.author,
            page_sum: req.body.page_sum,  // Fix: this was incorrectly set to `req.body.author`
            published_year: req.body.published_year,
            image: imageUrl
        };
        console.log(paper)
        // Validate paper input
        const errors = await validatePaper(paper);
        if (errors) {
            return res.status(400).json({ errors });
        }

        // Add paper to the database
        await addPaper(paper);

        // Redirect after successful operation
        return res.redirect("/");
    } catch (error) {
        // Log the error to the console for debugging
        console.error(error);

        // Send a detailed error message back to the client
        return res.status(500).json({ message: "An error occurred while processing your request.", error: error.message });
    }
};


// Delete paper
const removePaper = async(req, res)=>{
    try{
        const Id = req.body.Id;
        await deletePaper(Id);
        return res.redirect("/");
    }catch(error){
        return res.status(500).json({message: "Error"});
    }
}

module.exports = {getListPapers, savePaper, removePaper};