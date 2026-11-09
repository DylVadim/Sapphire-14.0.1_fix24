(function () {
    'use strict';

    angular.module('advRegistration')
        .service('advPhoneValidatorService', advPhoneValidatorService);

    function advPhoneValidatorService() {
        this.normalize = function (val) {
            if (!val) {
                return null;
            }

            var digits = String(val).replace(/\D/g, '');

            if (digits.length === 11 && digits.charAt(0) === '8') {
                digits = '7' + digits.substring(1);
            }

            if (digits.length === 10) {
                digits = '7' + digits;
            }

            return digits.length === 11 && digits.charAt(0) === '7' ? digits : null;
        };

        this.validate = function (digits) {
            if (!digits || digits.length !== 11) {
                return false;
            }

            return digits.charAt(0) === '7' && digits.charAt(1) === '9';
        };

        this.validateRf = function (digits) {
            if (!digits || digits.length !== 11) {
                return false;
            }

            return digits.charAt(0) === '7';
        };
    }
})();
