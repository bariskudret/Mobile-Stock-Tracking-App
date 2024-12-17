import ApiController from "./ApiController";

export const getCategory = (id)=>{

   return ApiController.get(`/categories/${id}`)
    .then(response =>{
        return {
          data : response.data,
          ok: response.status >199 && response.status<300,
          status : response.status,
          statusText : response.statusText,
          message : 'succsess'
    
        }
      }).catch(error =>{
          return {
            message : error.message,
            ok : false,
            status : 500
          }
      })
}

export const getCategories=()=>{
  
return ApiController.get('/categories')
.then(response=>{
  return {
    data : response.data,
    ok: response.status >199 && response.status<300,
    status : response.status,
    statusText : response.statusText,
    message : 'succsess'

  }
}).catch(err=>{
  return{
    message : err.message,
    ok : false,
    status : 500
  }
})
}

export const createCategory = (category)=>{
  return ApiController.post(`/categories`, JSON.stringify(category))
  .then(response=>{
    return{
      data : response.data,
    ok: response.status >199 && response.status<300,
    status : response.status,
    statusText : response.statusText,
    message : 'succsess'
    }
  }).catch(err=>{
    return{
      message : err.message,
      ok : false,
      status : 500
    }
  })
}