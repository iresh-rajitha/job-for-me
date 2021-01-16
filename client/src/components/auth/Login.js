import axois from 'axios';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SellerPage from '../pages/Seller';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";


export const Login = async (email, password) => {
    const history = useHistory();
    const config = {
        headers: { 
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
     }
    };
    const user= {
        "FirstName": "Dhammika",
        "LastName": "Piyumal",
        "Address": "badulla",
        "UserType": "Admin",
        "Category": "Seller",
        "Email": "dhammika.piyumal@gmail.com",
        "Password": "dhammika123",
        "Messages" : [],
        "Orders":[]
    }
    user.Email=email;
    user.Password=password;

    const body = JSON.stringify({ email, password });

    try {
        await axois.post("https://localhost:44368/api/account/login", user, config)
        .then(response=> {
            if(response.data){
                // alert("logged In!");
                // history.push(SellerPage);
                // <Route exact path="/seller" component={SellerPage} />
            }else{
                alert("login failed");
            }
        });
        // console.log(response);
        // console.log("Success");
        
    
        
        //return res;

    } catch (error) {
        console.log(error);
        console.log("errrrrrrrrrrrrrrrrrrr")
    }

};

export default Login;