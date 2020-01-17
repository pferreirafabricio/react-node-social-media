exports.createPostValidation = (req, res, next) => {

    //Validation for Title
    req.check("title", "Write a title").notEmpty();
    req.check("title", "Title must be between 4 to 150 characters").isLength({
        min: 4, max: 150
    });

    //Validation for Body
    req.check("body", "Write a body").notEmpty();
    req.check("body", "Body must be between 4 to 200 characters").isLength({
        min: 4,
        max: 2000
    });

    //Check for errors
    const errors = req.validationErrors();

    //If error show the first one as they happen
    if (errors) {
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }

    //Proceed to next middleware
    next();
};

exports.userSignupValidator = (req, res, next) => {
    //Name
    req.check("name", "Write a name!").notEmpty();
    req.check("name", "Name must be between 3 to 60 characters!")
        .isLength({
            min: 3,
            max: 32
        });

    //Email
    req.check("email", "Write a email!").notEmpty();
    req.check("email", "Email must be between 4 to 32 characters!")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 4,
            max: 2000
        });

    //Password
    req.check("password", "Password is required!").notEmpty();
    req.check("password")
        .isLength({ min: 4 })
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number");

    //Check for erros
    const errors = req.validationErrors();

    if (errors) {
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({ error: firstError });

    }

    //Proceed to next middleware
    next();
};

exports.passwordResetValidator = (req, res, next) => {
    req.check("newPassword", "Password is required").notEmpty();
    req.check("newPassword")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 chars long")
        .matches(/\d/)
        .withMessage("Must contain a number")
        .withMessage("Password must contain a number");

    //Check for errors
    const errors = req.validationErrors();

    //If error show the first one as they happen
    if (errors) {
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({error: firstError});
    }

    next();
}