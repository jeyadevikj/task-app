const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const encryptPassword = async (password) => {
    const hash = await bcrypt.hash(password, 8)
    console.log(hash);

    const match = await bcrypt.compare(password, hash)
    console.log(match);
}


const createJwtToken = (secretKey, verifyToken) => {
    const token = jwt.sign({name: 'Shane'}, secretKey)

    console.log(token);

    console.log(verifyToken(token, secretKey));
}

const verifyToken = (token, secretKey) => {
    return jwt.verify(token, secretKey)
}

// encryptPassword('Shane0313$')
createJwtToken('cssr', verifyToken)