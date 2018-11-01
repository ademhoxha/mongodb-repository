var crypto = require('crypto');


var text = "ADEM HOXHA COME STAI? TUTTO BENE"



/*********************************** CTR ALGHORITM   ***********************************/

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = '3zTvzr3p67VC61jmV54rIYu1545x4TlY';


function encryptCTR(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decryptCTR(encrypted){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(encrypted,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

mainCTR();

function mainCTR() {
    console.log("************    CTR    ***************** ")
    console.log("CLEAN: "+text)

    var crip = encryptCTR(text);
    console.log("CRIPTED: "+crip)

    var dec = decryptCTR(crip)
    console.log("DECRIPTED: "+dec)


}

/*********************************** GCM ALGHORITM   ***********************************/

var iv = '60iP0h6vJoEa';  // MUST GENERATE A NEW ONE FOR EACH ENCRYPTION
function encryptGCM(text) {
    var cipher = crypto.createCipheriv(algorithm, password, iv)
    var encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex');
    var tag = cipher.getAuthTag();
    return {
      content: encrypted,
      tag: tag
    };
  }
  
  function decryptGCM(encrypted) {
    var decipher = crypto.createDecipheriv(algorithm, password, iv)
    decipher.setAuthTag(encrypted.tag);
    var dec = decipher.update(encrypted.content, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
  }

  function mainGCM(){
    console.log("************    GCM    ***************** ")
    algorithm = 'aes-256-gcm';
    //password = '3zTvzr3p67VC61jmV54rIYu1545x4TlY';
    console.log("CLEAN: "+text)

    var crip = encryptGCM(text);
    console.log("CRIPTED: "+crip)

    var dec = decryptGCM(crip)
    console.log("DECRIPTED: "+dec)
  }

  mainGCM()