(function () {
    'use strict';

    angular.module('advRegistration')
        .directive('advFioInput', advFioInput);

    advFioInput.$inject = ['advFioValidatorService', '$timeout'];

    function advFioInput(advFioValidatorService, $timeout) {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                ngModelCtrl.$parsers.push(function (viewValue) {
                    if (!viewValue) {
                        ngModelCtrl.$setValidity('fioFormat', true);
                        return '';
                    }

                    var normalizedValue = advFioValidatorService.normalize(viewValue);

                    if (normalizedValue !== viewValue) {
                        ngModelCtrl.$setViewValue(normalizedValue);
                        ngModelCtrl.$render();
                    }

                    ngModelCtrl.$setValidity('fioFormat', advFioValidatorService.validate(normalizedValue));

                    return normalizedValue;
                });

                ngModelCtrl.$formatters.push(function (modelValue) {
                    return modelValue ? advFioValidatorService.normalize(modelValue) : modelValue;
                });

                element.on('input change blur', function () {
                    $timeout(function () {
                        scope.$evalAsync(function () {
                            var currentValue = element.val();
                            ngModelCtrl.$setViewValue(currentValue);
                            ngModelCtrl.$render();
                        });
                    });
                });
            }
        };
    }
})();
