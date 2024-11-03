import ApiController from './ApiController';

/**
 * Firma ekleme fonksiyonu
 * @param {string} companyName
 * @returns {Promise<[data:any, ok:boolean, status: number, statusText: string, message: string]>}
 */
export const addCompanies = (companyName) => {
  return ApiController.post('/companies', { name: companyName })
    .then(response => {
      return {
        data: response.data,
        ok: true,
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

export const getCompanies =()=>{
    return ApiController.get('/companies')
    .then(response =>{
        return {
        data: response.data,
        ok: true,
        status: response.status,
        statusText: response.statusText,
        message : 'success'
    }
    }).catch(error =>{
        return {
            message : error.message,
            status : 500,
            ok: false
        }
    });
};

export const getCompany = (id)=>{

  return ApiController.get(`companies/${id}`)
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