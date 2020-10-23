export default function permit(...permittedRoles)
{
    return (request,response,next)=>{
        const { user } = request;
        if(user && permittedRoles.includes(user.role))
        {
            next();
        }
        else {
            response.status(403).json({
                success: 0,
                message: "Cannot access "+user.role
            })
        }
    }
}