import ApiController from "./ApiController";

/**
 * Tüm şubeleri getirir
 * @returns {Promise<[data:any, ok:boolean, status: number, statusText: string, message: string]>}
 */
export const getBranches = () => {
    return ApiController.get('/branches')
        .then(response => {
            return {
                data: response.data,
                ok: response.status >= 200 && response.status < 300,
                status: response.status,
                statusText: response.statusText,
                message: 'success'
            };
        })
        .catch(error => {
            return {
                message: error.message,
                status: 500,
                ok: false
            };
        });

};

export const getBranch =(id)=>{

    return ApiController.get(`branches/${id}`)
    .then(response =>{

        return{
            data : response.data,
            ok : response.status >= 200 && response.status < 300,
            status : response.status,
            statusText : response.statusText,
            message : 'success'
        };
        
    }).catch(error =>{
        return {
            message : error.message,
            ok : false,
            status : 500
        };
    });
}