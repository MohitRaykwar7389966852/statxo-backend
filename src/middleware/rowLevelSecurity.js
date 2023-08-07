// function buildInClause(arr) {
//     if(arr == "All") return ``;
//     else{

//     }
//   }

const rls = async function(req,res,next){
    try{
        const user = req.userDetails;
        let access = user.Access;
        if(access == "All") req.inClause = ``;
        else{
            let arr = access.split('"');
            let str = arr.join("'");
            req.inClause = str;
        } 
        next();
    }
    catch(e)
    {
        res.status(500).send({status:false , message:e.message});
    }
}

module.exports = {rls}
