(function () {
    'use strict';

    angular.module('advRegistration')
        .directive('advPasswordMatch', advPasswordMatch);

    function advPasswordMatch() {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                function validate(value) {
                    var otherValue = scope.$eval(attrs.advPasswordMatch);
                    ngModelCtrl.$setValidity('passwordMatch', value === otherValue);
                    return value;
                }

                ngModelCtrl.$parsers.push(validate);

                scope.$watch(attrs.advPasswordMatch, function () {
                    validate(ngModelCtrl.$viewValue);
                });
            }
        };
    }
})();
