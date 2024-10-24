import User from '../../modals/User';
import ApiController from './ApiController';

/**
 * 
 * @param {User} user 
 * @returns {Promise<[data:any, ok:boolean, status: number, statusText: string,message: string]>}
 */
export const postUser = (user)=>{
    console.log(JSON.stringify(user))
    return ApiController.post('/users', JSON.stringify(user))
        .then(response=>{
            return {
                data: response.data,
                ok: true,
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


export const getUser = (id)=>{

    return ApiController.get(`users/${id}`)
    .then(response =>{
        return {
            data : response.data,
            ok :  response.status >= 200 && response.status < 300,
            status : response.status,
            statusText : response.statusText,
            message : 'succsess'   
        }

    }).catch(err =>{
        return {
            message : err.message,
            status : 500,
            ok : false
        }
    })
}

export const patchUser = (id, user) =>{
    return ApiController.patch(`/users/${id}`, JSON.stringify(user))
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