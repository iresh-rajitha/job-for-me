class OrderDetail{
    constructor(orderDetailID,description,file,field,price,fileName){
        this.orderDetailID=orderDetailID;
        this.description=description;
        this.file=file;
        this.field=field;
        this.price=price;
        this.fileName=fileName;
    }
}
module.exports=OrderDetail;