const User = require("./user.model");

class Order{
    
    orderID=0;
    startDate="";
    deadline="";
    comment="";
    rating=0;
    description="";
    seller:null;
    buyer: null;
    orderDetail: null;

    constructor(orderID,startDate,deadline,comment,rating,description,orderDetailID){
        this.orderID=orderID;
        this.startDate=startDate;
        this.deadline=deadline;
        this.comment=comment;
        this.rating=rating;
        this.description=description;
        this.orderDetailID=orderDetailID;
    }
}
module.exports=Order;