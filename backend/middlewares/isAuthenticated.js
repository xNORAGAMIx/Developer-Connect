import passport from "passport";

export const isAuthenticated = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user, info) => {
    if (error || !user) {
      return res.status(401).json({
        message: info ? info?.message : "Login required, no auth token found!",
        error: error ? error?.message : undefined,
      });
    }
    req.user = user?._id;
    return next();
  })(req, res, next);
};
