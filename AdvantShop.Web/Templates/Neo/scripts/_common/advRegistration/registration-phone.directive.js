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

                    if (isLegal || !isFilled) {
                        // Для юрлица строгую проверку мобильного РФ не применяем.
                        isValid = true;
                    } else {
                        // У физлица любой непустой номер должен быть мобильным РФ +7 (9XX):
                        // 11 цифр, начинается с 7, вторая — 9. Международные/городские — ошибка.
                        var digits = advPhoneValidatorService.normalize(phone);
                        isValid = digits != null && advPhoneValidatorService.validate(digits);
                    }

                    formCtrl.$setValidity('advPhone', isValid);
                    formCtrl.$setValidity('advPhoneRequired', isFilled);
                }

                scope.$watchGroup(
                    [attrs.advRegistrationPhone, attrs.advRegistrationPhoneCustomerType],
                    validate,
                );

                validate();
            }
        };
    }
})();
