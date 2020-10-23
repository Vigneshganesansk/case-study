const { create, getRolesByName,createRole,getUsersByMail,getRolesByUserId,getRolesByRoleId,getUsers } = require("./user.service");
const { genSaltSync,hashSync,compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
module.exports = {
    test: (req,res)=>{
        return res.status(200).json({
            success: 1,
            message: "Test works"
        })
    },
    viewUsers: (req,res)=>{
        getUsers((err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Unable to view users"
                })
            }
            else{
                return res.status(200).json({
                    status: 1,
                    data: results
                })
            }
        })
    },
    createUser: (req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt);
        create(body,(err,results)=>{
            if(err)
            {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            else{
                let roleBody = {};
                roleBody.user_id = results.insertId;
                let roles = [];
                roles = body.roles;
                roles.forEach(role =>{
                    getRolesByName(role,(err,results) => {
                        if(err)
                        {
                            console.log(err);
                            return res.status(500).json({
                                success: 0,
                                message: "Unable to fetch roleId"
                            })
                        }
                        else{
                            console.log(results);
                            roleBody.role_id = results.id;
                            if(roleBody.role_id !=null){
                                createRole(roleBody,(err,results)=>{
                                    if(err)
                                    {
                                        console.log(err);
                                        return res.status(500).json({
                                            success: 0,
                                            message: "Unable to create role"
                                        })
                                    }
                                })
                            }
                            
                        }
                    })
              
                })
                return res.status(200).json({
                    success: 1,
                    data: results
                })
            }
        });
    },
    login: (req,res)=> {
        const body = req.body;
        getUsersByMail(body.email,(err,results)=>{
            if(err)
            {
                console.log(err);
            }
            if(!results)
            {
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if(result)
            {
                results.password = undefined;
                results.role = [];
                let roleByUserId = [];
                var RoleByUserId = new Promise((resolve,reject)=>{
                    getRolesByUserId(results.id,(err,results)=>{
                        if(err)
                        {
                            console.log(err);
                        }
                        if(results)
                        { 
                            roleByUserId = results.map(x=>{
                                return x.role_id;
                            }) 
                            if(roleByUserId.length > 0)
                            resolve(roleByUserId);
                        }
                    });
                });
                RoleByUserId.then((roleByUserId)=>{
                    var check = new Promise((resolve,reject)=>{
                        let roleArr = [];
                        roleByUserId.forEach((roleId,index) => {
                            getRolesByRoleId(roleId,(err,results)=>{
                                if(results){
                                    roleArr.push(results[0].name);
                                }
                                if(roleArr.length == getRolesByRoleId.length)
                                {
                                    resolve(roleArr);
                                }
                                
                            })
                        });
                    })
                    check.then((arr)=>{
                        results.role = arr;
                        const jsontoken = sign({result: results},process.env.KEY,{
                            expiresIn: "1h",
                        });
                        return res.json({
                            success: 1,
                            message: "Logged in successfully",
                            token: jsontoken
                        });
                      });
                })
            }
            else{
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                });
            }
        });
    },
}