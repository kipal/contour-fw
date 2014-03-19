/**
 * @summary ClientScript module can:
 *  - read out the current object permitted (by `publics` method) members
 *  - cache the stringify content in module pattern
 *  - write out by `toClientScript`
 */
module.exports = (function () {
    "use strict";

    // Minden member kiírja majd magát
    function Member(name, content) {
        this.toClientScript = function () {
            throw 'AbstractMethod toClientScript';
        };
    }

    function PrivateMember(name, content) {
        Member.call(this);

        this.getValue = function () {
            throw 'AbstractMethod getValue';
        };

        this.toClientScript = function () {
            return 'var ' + name + " = " + this.getValue();
        };
    }

    function MemberFactory() {

    }

    // Ez fogja visszaadni eldönteni, hogy melyik a megfelelő osztály a member-nek.
    MemberFactory.getMember = function (module, memberName, memberValue) {
        if (module.hasOwnProperty(memberName)) {

        }
    };

    // A register ilyen object-eket tartalmaz majd.
    function ModuleContainer() {

        this.addMember = function (name, memberValue) {

        };
    }

    function ClientScript(moduleName) {

        ClientScript.register[moduleName] = new ModuleContainer(this);

        this.getModuleName = function () {
            return moduleName;
        };
    }

    ClientScript.register = {};

    // Ezzel csak privilege-eket tudok adni, meg private-okat (hasOwnProperty false => private)
    ClientScript.prototype.publish = function (name, value) {
        if (undefined === ClientScript.register[this.getModuleName]) {

        }
    };

    // Ezzel meg a prototypeokat tudom majd kezelni (hasOwnProperty false => prototype)
    ClientScript.publish = function (module, name, value) {

    };

    return ClientScript;
}());