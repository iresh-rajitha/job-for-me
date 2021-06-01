import axios from 'axios';

export function getAllOrders(){

    axios.get('https://localhost:5001/api/user')
        .then(res=>{
            console.log(res.data);
            return res.data;
        })
        .catch(err=>{
            console.log(err);
        });
    return '';
}
