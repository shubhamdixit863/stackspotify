const fetch = require('node-fetch');
exports.getToken = function(){
    return new Promise(async function(resolve, reject){
        const tokenPayload = {
            'client_id': "CLIENTID",
            'resource': "RESOURCE",
            'username': "config.username",
            'password': "config.password",
            'grant_type': 'password'
        };
        
        const res = await fetch('https://jsonplaceholder.typicode.com/todos/1',{
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: new URLSearchParams(tokenPayload)
        });
        
        if(res.status != 200){
            reject(res.message);
        }
        let tokenData = await res.json();
        let access_token = tokenData.access_token;
        setTimeout(()=>{
            resolve(access_token);
        },5000000000)
       
        
    });
    }