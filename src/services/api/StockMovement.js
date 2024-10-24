import ApiController from './ApiController';

export const postStockMovement = (stockMovement)=>{
    return ApiController.post('/stock_movements', JSON.stringify(stockMovement))
        .then(response=>{
            return {
                data: response.data,
                ok: response.ok,
                status: response.status,
                statusText: response.statusText,
                message: 'success'
            };
        })  
        .catch(error=>{
            return {
                message: error,
                status: 500,
                ok: false
            };
        });
};

export const getStockMovement = (id)=>{

    return ApiController.get(`stock_movements/${id}`)
    .then(response =>{
        return {
            data : response.data,
            ok : response.ok,
            status : response.status,
            statusText : response.statusText,
            message : 'succsess'   
        }

    }).catch(err =>{
        return {
            message : err,
            status : 500,
            ok : false
        }
    })
}

export const patchStockMovement = (id, stockMovement) =>{
    return ApiController.patch(`/stock_movements/${id}`, JSON.stringify(stockMovement))
    .then(response =>{
     return{
        data : response.data,
        ok :  response.status>199 && response.status<300,
        status : response.status,
        statusText : response.statusText,
        message : 'success'
    }

    }).catch(err =>{
        return {
            message : err,
            status : 500,
            ok : false
        }
    })

}