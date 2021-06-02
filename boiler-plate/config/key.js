// development모드이면 process.env.NODE_ENV는 development라고 나오고
// production모드이면 production이라고 나옴
if(process.env.NODE_ENV === 'production')   // === 는 형변환을 하지 않음. 
                                            // ex) true == 1 -> return true
                                            // true === 1 -> return false
{
    module.exports = require('./prod')
}

else
{
    module.exports = require('./dev')
}