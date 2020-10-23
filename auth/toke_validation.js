const { verify } = require("jsonwebtoken");
module.exports = {
    checkToken: (req,res,next)=>{
        let token = req.get("authorization");
        if(token)
        {
            let allowedUsers = {
                "/api/users/register":{
                    "role": ["admin","pm"]
                },
                "/api/users/view":{
                    "role": ["admin","pm"]
                },
                "/api/file/":{
                    "role": ["admin","pm","user"]
                },
                "/api/file/upload":{
                    "role": ["admin","pm"]
                },
                "/api/file/download":{
                    "role": ["admin","pm"]
                },
            }
            token = token.slice(7);
            verify(token,process.env.KEY,(err,decoded)=>{
                if(err)
                {
                    res.json({
                        success: 0,
                        message: "Invalid token"
                    });
                }
                else{
                    let url = req.baseUrl+req._parsedUrl.pathname;
                    let currentUserRole = [...decoded.result.role];
                    let allowedUserRoles = [...allowedUsers[url].role];
                    let intersectionArr = currentUserRole.filter(role=>
                        allowedUserRoles.includes(role)
                    );
                    if(intersectionArr.length > 0)
                    {
                        intersectionArr = [];
                        allowedUserRoles = [];
                        currentUserRole = [];
                        next();
                    }
                    else{
                        res.json({
                            success: 0,
                            message: "Cannot access this route :("
                        });
                    }
                   
                }
            })
        }
        else{
            res.json({
                success: 0,
                message: "Access denied"
            })
        }
    }
}