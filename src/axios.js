import axios from 'axios'

export default axios.create({
    baseURL: "https://api.unsplash.com/",
    timeout: 0,
    headers: { 
        Authorization: 'Client-ID b79d009ec0a36fceefd796ecf2c8f7981dba4259264bcf5db2cadc07100b697d' 
    }
})