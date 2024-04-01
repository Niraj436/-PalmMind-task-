import User from "../models/userModel.js"

export const getallusers = async (req, res) =>{
    try {

        const allUsers = await User.find().select("-password")
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json({error:"Something went wrong"})
    }
}

export const getUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
        res.status(500).json({error:"Something went wrong"})
    }
  };