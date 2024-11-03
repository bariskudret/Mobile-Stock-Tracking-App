import ApiController from "./ApiController";


export const   getBranchProducts = (brnachId)=>{

    return ApiController.get(`/branches/${brnachId}/branch_products`)
    .then(Response =>{
        
        return {
            data : Response.data,
            ok : Response.status >199 && Response.status<300,
            status : Response.status,
            statusText : Response.statusText,
            mesagge : 'success'
        }
    })
    .catch(error=>{
        return {
            mesagge : error.mesagge,
            ok : false,
            status: 500

        }
    })

}

export const   postBranchProducts = (branchProduct)=>{

    return ApiController.post('/BranchProduct', JSON.stringify(branchProduct))
    .then(Response =>{

        return {
            data : Response.data,
            ok : Response.status >199 && Response.status<300,
            status : Response.status,
            statusText : Response.statusText,
            mesagge : 'success'
        }
    })
    .catch(error=>{
        return {
            mesagge : error.mesagge,
            ok : false,
            status: 500

        }
    })

}