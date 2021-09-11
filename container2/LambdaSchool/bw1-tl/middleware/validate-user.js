module.exports = (req, res, next) => {
  if (!req.body) {
    return next("missing user data");
  } else {
    let {
      email,
      password,
      firstName,
      lastName,
      role,
      availability,
      country
    } = req.body;
    if (!email || !email.length > 5) {
      next("A valid email address is required");
    } else if (!password || !password.length > 4) {
      next("A valid password with at least 5 characters is required");
    } else if (!firstName || !lastName) {
      next("First and Last name are required");
    } else if (
      String(
        role.toLowercase() !== "admin" ||
          String(role.toLowercase()) !== "volunteer" ||
          String(role.toLowercase()) !== "student"
      )
    ) {
      next("A role type of either admin, volunteer, or student is required");
    } else if (
      String(role.toLowercase()) === "volunteer" &&
      !availability && !country
    ) {
      next("Volunteers must provide their time availability and country");
    }
  }
};
