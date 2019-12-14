var fs = require('fs');


    module.exports.readData = function(){
        var data = fs.readFileSync('./server/db.txt', 'utf-8');
        data = '['+data.slice(0, data.length-1)+']';
        
        return JSON.parse(data);   
    },
    module.exports.writeData = function(msg) {
        var value =  JSON.stringify(msg) +','; 
        console.log(typeof value, value);
        fs.appendFileSync('./server/db.txt', value)
    }
 