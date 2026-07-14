
export const sendTokenResponse = async (
  user,
  statusCode,
  res
) => {
  const accessToken =
    user.generateAccessToken();

  const refreshToken =
    user.generateRefreshToken();

  user.refreshToken = refreshToken;

  await user.save({
    validateBeforeSave: false,
  });
  res.cookie(
    "refreshToken",
    refreshToken,
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "strict",
      maxAge:
        7 *
        24 *
        60 *
        60 *
        1000,
    }
  );

  return res.status(statusCode).json({
    success: true,

    accessToken,

  user: {
  id: user._id,
  fullName: user.fullName,
  email: user.email,
  role: user.role,
onboardingCompleted:
    user.onboardingCompleted,
},
  });
};