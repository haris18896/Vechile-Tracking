const env = process.env.NODE_ENV
var HOST_NAME = '';
if(env == "development"){
   var HOST_NAME = process.env.subdomain ? 'https://' + process.env.subdomain + '.sparning.ai' : process.env.NEXT_PUBLIC_HOST
}

export const MAIN_URL = HOST_NAME+'/api/v1'
