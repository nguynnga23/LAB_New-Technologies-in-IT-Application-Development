const {dynamoDB} = require("../configs/aws.helper");
const TABLE_NAME = "Paper";
const { v4: uuidv4 } = require("uuid")

const getPapers = async()=>{
    const params = {TableName: TABLE_NAME};
    try{
        const result = await dynamoDB.scan(params).promise();
        return result.Items;
    }catch(error){
        console.error("Error: ", error);
        return [];
    }
};

const addPaper = async(paper)=>{
    const id = uuidv4(); // Tạo unique ID cho subject
    const params = {
        TableName: TABLE_NAME,
        Item: {
            Id: id,
            ISBN: paper.ISBN,
            paper_name: paper.paper_name,
            author: paper.author,
            page_sum: paper.page_sum,
            published_year: paper.published_year,
            image: paper.image
        },
    }
    console.log(params.Item)
    try{
        await dynamoDB.put(params).promise();
        console.log("Paper added: ", paper);
    }catch(error){
        console.error("Error adding paper: ", error);
    }
}

const deletePaper = async(id) =>{
    const params = {
        TableName: TABLE_NAME,
        Key: {Id: id},
    };

    try{
        await dynamoDB.delete(params).promise();
        console.log("Paper deleted: ", id);
    }catch(error){
        console.error("Error deleting paper: ", error);
    }
}

module.exports = {getPapers, addPaper, deletePaper};