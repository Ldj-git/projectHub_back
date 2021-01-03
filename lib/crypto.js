const crypto = require('crypto');

var encrypt = {
    encrypt : function(data){
        var decryptModule = crypto.createHash("sha1");
        var decrypted = decryptModule.update(data).digest("hex");

        return decrypted;
    }
};

module.exports = encrypt;