export const generateToken = (user, message, statuscode, res) => {
    const token = user.generateJsonWebToken();
    
    // Determine the cookie name based on the user's role
    let cookieName;
    if (user.role === "Admin") {
        cookieName = "admintoken";
    } else if (user.role === "Doctor") {
        cookieName = "doctortoken";
    } else {
        cookieName = "patientToken";
    }

    // Set the cookie and respond with the token and user info
    res
        .status(statuscode)
        .cookie(cookieName, token, {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true,
        })
        .json({
            success: true,
            message,
            user,
            token,
        });
};
