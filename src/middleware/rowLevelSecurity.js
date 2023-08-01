function buildInClause(arr) {
    if(arr == "All") return ``;
    else{
    const values = arr.map((value) => `'${value}'`).join(', ');
    return `WHERE CompanyName IN (${values})`;
    }
  }

const rls = async function(req,res,next){
    try{
        const user = req.userDetails;
        let access = user.Access;
        req.inClause = buildInClause(access);
        next();
    }
    catch(e)
    {
        res.status(500).send({status:false , message:e.message});
    }
}

module.exports = {rls}
