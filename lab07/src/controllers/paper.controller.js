const {getPapers, addPaper, deletePaper} = require("../models/paper.model");

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
const savePaper = async(req, res)=>{
    const isbn = req.body.isbn;
    try{
        const paper = {
            ISBN: isbn,
            paper_name: req.body.paper_name,
            author: req.body.author,
            page_sum: req.body.author,
            published_year: req.body.published_year
        };
        await addPaper(paper);
        return res.redirect("/");
    }catch(error){
        return res.status(500).json({message: "Error"});
    }
}

// Delete paper
const removePaper = async(req, res)=>{
    const isbn = req.body.isbn;
    try{
        const id = isbn;
        await deletePaper(id);
        return res.redirect("/");
    }catch(error){
        return res.status(500).json({message: "Error"});
    }
}

module.exports = {getListPapers, savePaper, removePaper};