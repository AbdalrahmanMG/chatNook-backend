const login = (req,res)=>{
    res.send("loging in ...");
}

const logout = (req,res)=>{
    res.send("logging out ...");
}

const signup = (req,res)=>{
    res.send("signingUp ...");
}

module.exports = {login, logout, signup}