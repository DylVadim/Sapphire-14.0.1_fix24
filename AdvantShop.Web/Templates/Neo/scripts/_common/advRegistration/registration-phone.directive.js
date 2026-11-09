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
                    var digits = advPhoneValidatorService.normalize(phone);
                    var isComplete = digits != null;
                    // Для юрлица строгую проверку мобильного РФ не применяем.
                    var isValid = isLegal || !isComplete
                        ? true
                        : advPhoneValidatorService.validate(digits);
                    var isFilled = !!phone && phone !== '+_(___)___-__-__';

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
