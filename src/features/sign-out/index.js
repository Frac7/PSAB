import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Col, Container, Row } from 'reactstrap';
import { StyledSpinner } from '../../shared/styled';

import { SIGNIN } from '../../config/routes';
import { requestLogout } from '../../store/user/action';
import { Selector } from '../../store/user/reducer';

/**
 * Logout handling.
 *
 * @param requestLogout
 * @param data
 * @returns {JSX.Element}
 * @constructor
 * @component
 */
const SignOut = ({ requestLogout, user: { data } }) => {
    useEffect(() => {
        if (data) {
            requestLogout();
        }
    }, [data, requestLogout]);

    if (!data) {
        return <Redirect to={SIGNIN}/>
    } else {
        return (
            <Container fluid>
                <Row className="my-3 justify-content-center align-content-center align-items-center">
                    <Col xl="auto" sm="auto">
                        <StyledSpinner size="large"/>
                    </Col>
                </Row>
            </Container>
        );
    }
};

SignOut.propTypes = {
    /**
     * REQUEST_LOGOUT action dispatching
     */
    requestLogout: PropTypes.func,
    /**
     * Current user data
     */
    user: PropTypes.object
};

export default connect((state) => ({ user: Selector.getUser(state) }), { requestLogout })(SignOut);
