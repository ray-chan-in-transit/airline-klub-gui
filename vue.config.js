// vue.config.js
module.exports = {
  devServer: {
        proxy: {
        	'^/': {
        		target: 'https://www.airline-club.com/',
        		ws: true,
        		changeOrigin: true
           	}
        },
    }
}