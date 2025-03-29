const {dynamoDB} = require("../configs/aws.helper");
const TABLE_NAME = "Paper";

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
    const params = {
        TableName: TABLE_NAME,
        Item: paper,
    }
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
        Key: {ISBN: id},
    };

    try{
        await dynamoDB.delete(params).promise();
        console.log("Paper deleted: ", id);
    }catch(error){
        console.error("Error deleting paper: ", error);
    }
}

module.exports = {getPapers, addPaper, deletePaper};