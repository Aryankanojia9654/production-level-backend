import mongoose , {Schema} from 'moongose'
import { use } from 'moongose/routes'
const userSchema = new Schema (
    {
        username : {
            type: String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
            index : true    // this field is important (please mention about this importance of indexx , for searching)
        },

        email : {
            type: String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
        },

        fullname : {
            type: String,
            required : true,
            lowercase : true,
            trim : true,
            index : true
        },

        username : {
            type: String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
        },

        avatar : {
            type: String, // cloudinary url
            required : true,

        },

        coverImage : {
            type : String

        },
        watchHistory : [
            {
                type : Schema.Types.ObjectId,
                ref : "Video"
            }
        ],

        password : {
            type : String,
            required : [true , 'Password is required'],
        },

        refreshToken : {
            type : String,

        }
        
    },
    {
        timestamps : true
    }
)

userSchema.pre('save' , async function(next){
    if(!this.isModified('password')) return next()
    try{
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password , salt)
        return next()
    }catch(err){
        return next(err)
    }
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
}

userSchema.methods.genetateAccessToken = function(){
    return jwt.sign(
        {
        _id : this._id,
        email : this.email,
        username : this.username,
        fullname : this.fullname,
        },
        process.env.JWT_SECRET,
        {
            expiresIn : process.env.JWT_ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.genetateRefreshToken = function(){
    return jwt.sign(
        {
        _id : this._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn : process.env.JWT_REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User" , userSchema)