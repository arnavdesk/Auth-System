module.exports.home = async function (request, response) {
    response.render("home");
}

module.exports.signIn = async function (request, response) {
    response.render("sign-in");
}

module.exports.signUp = async function (request, response) {
    response.render("sign-up");
}