class User{
    constructor(userId,firstName,lastName,address,userType,category,email){
        this.userId=userId;
        this.firstName=firstName;
        this.lastName=lastName;
        this.address=address;
        this.userType=userType;
        this.category=category;
        this.email=email;
    }
}
module.exports=User;