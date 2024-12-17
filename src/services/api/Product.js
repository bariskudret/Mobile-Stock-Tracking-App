import ApiController from './ApiController';

export const postProduct = (product)=>{
    return ApiController.post('/products', JSON.stringify(product))
        .then(response=>{
            return {
                data: response.data,
                ok: response.status>199 && response.status<300,
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

export const getProduct = (id)=>{

    return ApiController.get(`products/${id}`)
    .then(response =>{
        return {
            data : response.data,
            ok : response.status>199 && response.status<300,
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

export const patchProduct = (id, product) =>{
    return ApiController.patch(`/products/${id}`, product)
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