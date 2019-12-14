module.exports.hasher = function(key) {
    var i = Math.floor(Math.random()*10000)+key;
    return i;
}