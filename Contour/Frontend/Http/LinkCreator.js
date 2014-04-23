module.exports = new Contour.ClientScript.Module(
    function () {
        function LinkCreator() {

        }

        LinkCreator.staticLink = '/static/';

        LinkCreator.getImgSrc = function(path) {
            return LinkCreator.staticLink + path;
        };

        return LinkCreator;
    }
).signUp({
    "name" : "Frontend.Http.LinkCreator"
});