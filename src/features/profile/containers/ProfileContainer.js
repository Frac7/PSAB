import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Container } from 'reactstrap';
import { ProfileData, OwnedLands, OwnedPortions, PurchasedPortions, OperatorActivities, CertifierActivities } from '../components';

import { Selector } from '../../../store/user/reducer';
import { CERTIFIER, OPERATOR, roles, USER } from '../../../shared/values';

/**
 * User information containers.
 *
 * @param data
 * @returns {JSX.Element}
 * @constructor
 * @component
 */
const ProfileContainer = ({ user: { data } }) => {
	const { attributes: { name } } = data;
	const role = parseInt(data.attributes['custom:role']);
	const isAdmin = Boolean(parseInt(data.attributes['custom:is_admin']));
	const address = data.username;

	return (
		<Container fluid>
			<ProfileData user={{
				username: address,
				name
			}} />
			{!isAdmin && role === roles.indexOf(USER) && <OwnedLands userAddress={address} />}
			{!isAdmin && role === roles.indexOf(USER) && <OwnedPortions userAddress={address} />}
			{!isAdmin && role === roles.indexOf(USER) && <PurchasedPortions userAddress={address} />}
			{!isAdmin && role === roles.indexOf(OPERATOR) && <OperatorActivities userAddress={address} />}
			{!isAdmin && role === roles.indexOf(CERTIFIER) && <CertifierActivities userAddress={address} />}
		</Container>
	)
};

ProfileContainer.propTypes = {
	/**
	 * Logged in user
	 */
	user: PropTypes.object
};

const mapStateToProps = (state) => ({
	user: Selector.getUser(state)
});

export default connect(mapStateToProps)(ProfileContainer);
