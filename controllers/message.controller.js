const sendMessage =async (req, res)=>{
    console.log('iam sending message...');
    res.send('i am sending now..')
}

module.exports = {sendMessage}