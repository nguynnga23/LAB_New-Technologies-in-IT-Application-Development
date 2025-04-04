const {dynamoDB} = require("../configs/aws.helper");
const {v4: uuidv4} = require("uuid");
const TABLE_NAME = "Car";
const getCars = async()=>{
    const params = {TableName: TABLE_NAME};
    try{
        const result = await dynamoDB.scan(params).promise();
        return result.Items;
    }catch(error){
        console.error("Error GetCars", error);
        return [];
    }
}

const addCar = async(car)=>{
    const id = uuidv4();
    const params = {
        TableName: TABLE_NAME,
        Item: {
            CarID: id,
            CarName: car.CarName,
            CarType: car.CarType,
            ImageURL: car.ImageURL,
            Price: car.Price
        }
    };
    try{
        await dynamoDB.put(params).promise();
        console.log("Car added", car)
    }catch(error){
        console.log("Error adding car", error);
    }
};

const deleteCar = async(id)=>{
    const params = {
        TableName: TABLE_NAME,
        Key:{CarID: id}
    };
    try{
        await dynamoDB.delete(params).promise();
        console.log("Car added", id)
    }catch(error){
        console.log("Error deleting car", error);
    }
};

module.exports = {getCars, addCar, deleteCar};