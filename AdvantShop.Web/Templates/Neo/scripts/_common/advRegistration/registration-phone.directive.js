(function () {
    'use strict';

    angular.module('advRegistration')
        .directive('advRegistrationPhone', advRegistrationPhone);

    advRegistrationPhone.$inject = ['advPhoneValidatorService'];

    function advRegistrationPhone(advPhoneValidatorService) {
        return {
            require: 'form',
            link: function (scope, element, attrs, formCtrl) {
                function validate() {
                    var phone = scope.$eval(attrs.advRegistrationPhone);
                    var customerType = String(scope.$eval(attrs.advRegistrationPhoneCustomerType) || '');
                    var isLegal = /legal/i.test(customerType) || customerType === '1';
                    var rawDigits = String(phone || '').replace(/\D/g, '');
                    var isFilled = rawDigits.length > 0;
                    var isValid;

                    if (!isFilled) {
                        isValid = true;
                    } else {
                        var digits = advPhoneValidatorService.normalize(phone);

                        // Физлицо: только мобильный РФ +7 (9XX).
                        // Юрлицо: любой номер РФ +7 (XXX) — стационарные разрешены.
                        isValid =
                            digits != null &&
                            (isLegal
                                ? advPhoneValidatorService.validateRf(digits)
                                : advPhoneValidatorService.validate(digits));
                    }

                    formCtrl.$setValidity('advPhone', isValid);
                    formCtrl.$setValidity('advPhoneRequired', isFilled);
                }

                scope.$watchGroup(
                    [attrs.advRegistrationPhone, attrs.advRegistrationPhoneCustomerType],
                    validate,
                );

                // Переключатель физ/юр и маска могут менять модель без изменения watch-выражения —
                // пересчитываем валидность на change внутри формы.
                element.on('change', function () {
                    scope.$evalAsync(validate);
                });

                validate();
            }
        };
    }
})();
