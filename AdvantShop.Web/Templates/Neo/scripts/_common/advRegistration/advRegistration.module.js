import './advRegistration.base.js';
import './fio-validator.service.js';
import './fio-input.directive.js';
import './password-match.directive.js';
import registrationTemplate from './registration.template.html';

const MODULE_NAME = 'advRegistration';

angular.module(MODULE_NAME)
    .config([
        '$provide',
        ($provide) => {
            $provide.decorator('registrationDirective', [
                '$delegate',
                ($delegate) => {
                    if ($delegate && $delegate[0]) {
                        $delegate[0].templateUrl = registrationTemplate;
                    }

                    return $delegate;
                },
            ]);
        },
    ]);

export default MODULE_NAME;
