const sessionChecker = (req, res, next) => {

    console.log("SESSION",req.session);
    console.log("COOKIES",req.cookies);
    
    if (!req.session.user && !req.cookies.foo) {
        res.status(401).json({ message: 'You are not login.' });
    } else {
        next();
    }
};

export default sessionChecker;