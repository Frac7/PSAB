import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';

import ElementListContainer from './ElementListContainer';
import { ElementSelector } from '../../../shared/element-dropdown';

import {
	LAND,
	PORTION,
	PROD_ACTIVITIES,
	PRODUCT,
	MAINTENANCE_ACTIVITIES
} from '../../../shared/values';

import { elementWrappers, handleFetching } from '../map';

import { Selector } from '../../../store/user/reducer';
import { StyledSpinner } from '../../../shared/styled';

/**
 * Discover section, containers for elements details.
 *
 * @param user
 * @returns {JSX.Element}
 * @constructor
 * @component
 */
const DiscoverContainer = ({ user }) => {
	const [currentElement, setCurrentElement] = useState(LAND);

	const [elements, setElements] = useState([]);
	const [fetchErrors, setFetchErrors] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setElements([]);
		handleFetching(user.data.username, setElements, setFetchErrors, setIsLoading, currentElement);
	}, [currentElement, user, setElements]);

	return (
		<Container fluid>
			<Row className="justify-content-between align-items-center">
				<Col>
					<h1>Esplora {currentElement}</h1>
				</Col>
				<Col xl={5} sm={12} className="justify-content-center">
					<ElementSelector
						elements={[
							{
								type: LAND
							},
							{
								type: PORTION
							},
							{
								type: PROD_ACTIVITIES
							},
							{
								type: PRODUCT
							},
							{
								type: MAINTENANCE_ACTIVITIES
							}
						]}
						currentElement={currentElement}
						setCurrentElement={setCurrentElement}
					/>
				</Col>
			</Row>
			{isLoading && (
				<Row className="my-3 justify-content-center align-content-center align-items-center">
					<Col xl="auto" sm="auto">
						<StyledSpinner size="large"/>
					</Col>
				</Row>
			)}
			{fetchErrors && (
				<Row className="justify-content-center align-content-center align-items-center">
					<Col xl={12} sm={12}>
						<Alert color="danger" className="my-3">Si è verificato un errore nel caricamento degli elementi</Alert>
					</Col>
				</Row>
			)}
			{!elements.length && !isLoading && !fetchErrors && (
				<Row className="justify-content-center align-content-center align-items-center">
					<Col xl={12} sm={12}>
						<Alert color="info" className="my-3">Nessun elemento disponibile</Alert>
					</Col>
				</Row>
			)}
			<ElementListContainer
				elements={elements}
				ElementWrapper={elementWrappers[currentElement]}
			/>
		</Container>
	)

};

DiscoverContainer.propTypes = {
	/**
	 * Logged in user
	 */
	user: PropTypes.object
};

const mapStateToProps = (state) => ({
	user: Selector.getUser(state)
});

export default connect(mapStateToProps)(DiscoverContainer);
