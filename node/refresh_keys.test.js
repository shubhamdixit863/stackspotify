const refreshKeyTest = require("./refresh_keys");
it("Test case for function getToken", async()=>{
   await refreshKeyTest.getToken().then(res => {
       expect(res).not.tobeNull();
   }).catch(err => {

   });
}, 30);