const User = require('../model/user')
const Admin = require('../model/m_admin')
const jwt = require('jsonwebtoken')
const ApiResponse = require('../../helper/apiResponse')
const { UserDTO } = require('../dto/user.dto')
const helper = require("../../helper/helper")



/**
 * The function `register` is an asynchronous function that handles user registration by checking if
 * the user already exists, creating a new user if not, and returning a success response.
 * @returns an ApiResponse object.
 */
const register = async (req,res) =>{
try {
  const { username,email, password } = req.body
  const foundUser = await User.findOne({ email : email}).exec()
  if (foundUser)  return ApiResponse.duplicate(res,"User Already Found")
  await User.create({user_name : username,email:email,password:helper.encode(password)})
  return ApiResponse.success(res,"Register Successful")
} catch (error) {
  console.log(error);
  return ApiResponse.server(res,"Auth Server Error")
}
}

/**
 * The login function in JavaScript handles user authentication by checking the email and password,
 * generating access and refresh tokens, creating a secure cookie with the refresh token, and returning
 * the access token along with user information.
 * @returns an API response with the success status and the login data, including the user information
 * and the access token.
 */
const login = async (req, res) => {
   try {
     const { email, password } = req.body
    const foundUser = await User.findOne({ email :email }).exec()
    if (!foundUser || foundUser?.del_flg)  {
        return ApiResponse.unauthorized(res)
    }
    const match = await helper.comparePass(password, foundUser.password)
    if (!match) return ApiResponse.unauthorized(res)
    const accessToken = helper.token(
        {
            "user_info": {
                "id":foundUser._id,
                "username": foundUser.user_name,
                "email" :foundUser.email
            }
        }
    )
    const refreshToken = helper.refreshToken(
        { "email": foundUser.email },
    )

    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })
    // Send accessToken containing username and role
    return ApiResponse.success(res,'login',{...UserDTO(req,foundUser),access_token:accessToken})
   } catch (error) {
    return ApiResponse.server(res,"Auth Server Error")
   }
}

/**
 * The adLogin function is used for authenticating an admin user by checking their email and password,
 * and returning an access token if the authentication is successful.
 * @returns an API response with the login information and an access token.
 */
const adLogin = async (req, res) => {
   try {
     const { email, password } = req.body
    const foundUser = await Admin.findOne({ email :email }).exec()
    if (!foundUser || foundUser?.del_flg)  {
        return ApiResponse.unauthorized(res)
    }
    const match = await helper.comparePass(password, foundUser.password)
    if (!match) return ApiResponse.unauthorized(res)
    const accessToken = helper.token(
        {
            "user_info": {
                "id":foundUser._id,
                "username": foundUser.user_name,
                "email" :foundUser.email
            }
        }
    )
    // Send accessToken containing username and role
    return ApiResponse.success(res,'login',{...UserDTO(req,foundUser),access_token:accessToken})
   } catch (error) {
    return ApiResponse.server(res,"Auth Server Error")
   }
}

/**
 * The `refresh` function is used to refresh an access token by verifying the provided refresh token
 * and generating a new access token if the verification is successful.
 * @returns The function `refresh` returns a response to the client. The response can be one of the
 * following:
 */
const refresh = (req, res) => {
    try {
      const cookies = req.cookies
    if (!cookies?.jwt) return ApiResponse.unauthorized(res)
    const refreshToken = cookies.jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return ApiResponse.forbidden(res)
            const foundUser = await User.findOne({ email: decoded.email }).exec()
            if (!foundUser) return ApiResponse.unauthorized(res)
            const accessToken = helper.token(
                {
                    "user_info": {
                        "id":foundUser._id,
                        "username": foundUser.user_name,
                        "email" :foundUser.email
                    }
                },
            )
            
            return ApiResponse.success(res,'token',{access_token:accessToken})
        }
    )
    } catch (error) {
      return ApiResponse.server(res,"Auth Server Error")
    }
}


/**
 * The `logout` function clears the JWT cookie and sends a response indicating that the cookie has been
 * cleared.
 * @returns a JSON response with the message "Cookie cleared" if the 'jwt' cookie exists and is
 * successfully cleared. If the 'jwt' cookie does not exist, it returns a status code of 204 (No
 * Content).
 */
const logout = (req, res) => {
  try {  
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
    
  } catch (error) {
    ApiResponse.server(res,"Auth Server Error")
  }
}

module.exports = {
    login,
    refresh,
    logout,register,adLogin
}