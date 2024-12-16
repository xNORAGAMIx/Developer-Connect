import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User/User.js";
import bcrypt from "bcryptjs";
import { Strategy as JWTStrategy } from "passport-jwt";
import { ExtractJwt as ExtractJWT } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

// Configure passport local
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, {
            message: "No user found with this email",
          });
        }
        // decrypt password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: "User credentials incorrect",
          });
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

//Google oauth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/v1/users/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        //check if user found
        let user = await User.findOne({ googleId: profile.id });
        // destructure properties from profile
        const {
          id,
          displayName,
          name,
          _json: { picture },
        } = profile;
        //check if email exists
        let email = "";
        if (Array.isArray(profile?.emails) && profile?.emails?.length > 0) {
          email = profile?.emails[0]?.value;
        }
        if (!user) {
          //create new user
          user = await User.create({
            username: displayName,
            googleId: id,
            profilePicture: picture,
            authMethod: "google",
            email,
          });
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
//JWT-Options
const options = {
  jwtFromRequest: ExtractJWT.fromExtractors([
    (req) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies["token"];
        return token;
      }
    },
  ]),
  secretOrKey: process.env.SECRET_KEY,
};
//JWT
passport.use(
  new JWTStrategy(options, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false, { message: "User not found" });
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
