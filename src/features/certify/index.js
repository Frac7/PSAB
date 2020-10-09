import React from 'react';

import CertifyFormContainer from './containers';
import { CERTIFY } from '../../config/routes';
import withAuthentication from '../../shared/auth';

const Certify = () => <CertifyFormContainer />

export default withAuthentication(Certify, CERTIFY);
