const { pool } = require("../../config/database");
module.exports = {
    getUsers: (callBack)=>{
        pool.query(
            `select email,username from user`,
            [],
            (error,results,fields)=>{
                if(error)
                {
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    create: (data,callBack)=>{
        pool.query(
            `insert into user(email,username,password)
            values(?,?,?)`,
            [
                data.email,
                data.username,
                data.password
            ],
            (error,results,fields)=>{
                if(error)
                {
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    getUsersByMail: (email,callBack) => {
        pool.query(
            `select id,email,username,password from user where email = ?`,
            [email],
            (error,results,fields)=>{
                if(error)
                {
                    return callBack(error);
                }
                return callBack(null,results[0]);
            }
        )
    },
    getRolesByName: (roleName,callBack) => {
        pool.query(
            `select id,name from role where name=?`,
            [roleName],
            (error,results,fields) => {
                if(error)
                {
                    return callBack(error);
                }
                return callBack(null,results[0]);
            }
        )
    },
    getRolesByRoleId: (roleId,callBack)=>{
        pool.query(
            `select name from role where id=?`,
            [roleId],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
     getRolesByUserId: (userId,callBack)=>{
        pool.query(
            `select role_id from user_roles where user_id=?`,
            [userId],
            (error,results,fields)=>{
                if(error)
                {
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    createRole: (data,callBack) => {
        pool.query(
            `insert into user_roles(user_id,role_id) values(?,?)`,
            [data.user_id,
            data.role_id],
            (error,results,fields) => {
                if(error)
                {
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    }
};