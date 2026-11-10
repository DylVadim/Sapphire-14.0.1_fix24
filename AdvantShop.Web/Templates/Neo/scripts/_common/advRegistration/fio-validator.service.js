(function () {
    'use strict';

    angular.module('advRegistration')
        .service('advFioValidatorService', advFioValidatorService);

    function advFioValidatorService() {
        this.normalize = function (val) {
            if (!val) {
                return '';
            }

            return val
                .trim()
                .replace(/\s+/g, ' ')
                .split(' ')
                .map(function (word) {
                    if (/^[IVXLCDM]+$/.test(word)) {
                        return word.toUpperCase();
                    }

                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                })
                .join(' ');
        };

        this.pattern = /^[А-ЯЁ][А-ЯЁа-яё'\-]*(\s[А-ЯЁ][А-ЯЁа-яё'\-]*)*(\s[IVXLCDM]+)?$/;

        this.validate = function (val) {
            if (!val || val.length < 2) {
                return false;
            }

            return this.pattern.test(val);
        };
    }
})();
