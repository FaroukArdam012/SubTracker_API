import User from "../models/userModel.js";



export const getAllUsers= async (req,res,next) => {
    try{ 
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users
        })
 
    }catch(error){
        next(error)
    }
    
}

export const getUserById= async (req,res,next) => {
    try{ 
        const user = await User.findById(req.params.id).select("-password");
        if(!user){
            const error= new Error('User not found');
            error.statusCode= 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            data: user
        })
 
    }catch(error){
        next(error)
    }
    
}

export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: user
        })

    } catch (error) {
        next(error)
    }

}