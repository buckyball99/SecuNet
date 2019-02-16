let configs = {
    'production': {
        httpPort: 3000,
        httpsPort: 3001 
    },
    'development':{
        httpPort: 5000,
        httpsPort: 5001
    }
}
const config = process.env.NODE_ENV == 'production' ? configs['production']:configs['development'];

module.exports = config;
