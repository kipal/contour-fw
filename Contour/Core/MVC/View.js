module.exports = new Contour.ClientScript.Module(
    function () {
        function View() {
            this.template = "";

            this.render = function () {
                return this.template;
            };
        }

        return View;
}).setName("Core.MVC.View").signUp();