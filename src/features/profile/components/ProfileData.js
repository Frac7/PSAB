import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';

/**
 * User's details.
 *
 * @param username
 * @param name
 * @returns {JSX.Element}
 * @constructor
 * @component
 */
const ProfileData = ({ user: { username, name } }) => (
	<Row className="align-items-center">
		<Col xl="auto" sm="auto" align="center">
			<FontAwesomeIcon icon={faUser} size="lg" />
		</Col>
		<Col>
			<h1>{name}</h1>
			<h6>{username}</h6>
		</Col>
	</Row>
);

ProfileData.propTypes = {
	/**
	 * User's address
	 */
	username: PropTypes.string,
	/**
	 * User's name
	 */
	name: PropTypes.string
}

export default ProfileData;
