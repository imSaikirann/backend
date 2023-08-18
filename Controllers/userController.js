const UserSchema = require('../models/userSchema');
const UserCheckboxData = require('../models/userCheckboxData');

const UserLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserSchema.login(email,password)
        if (!user) {
            res.status(404).json({ message: 'Not found' });
        } else {
            const userCheckData = await UserCheckboxData.findOne({ userId: user._id });
            res.status(200).json({ user, Data: userCheckData });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const UserSignin = async (req, res) => {
    const { email, password } = req.body;

    try{
        const newUser = await UserSchema.signup( email, password );
        res.status(200).json({newUser})
        await UserCheckboxData.create({
            userId: newUser._id,
            completedLanguages: [] 
        })
      
    }catch(error)
    {
        res.json({msg:'signup error'})
    }
}






module.exports = { UserLogin, UserSignin };
