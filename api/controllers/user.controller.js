import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'

export const deleteUser = async (req, res) =>{

    const user = await User.findById(req.params.id)

    if(req.UserId !== user._id){
        return res.status(403).send('you cannot delete this ...')
    }
    await User.findByIdAndDelete(req.params.id)
    res.status(200).send("User has been deleted.")
}