import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { Alert, Col, Container, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

import DiscoverLand from './DiscoverLand';
import DiscoverPortion from './DiscoverPortion';
import { StyledLinkButton, StyledSpinner } from '../styled';

import contracts from '../contracts';
import { LAND, PORTION } from '../values';

import { Selector } from '../../store/user/reducer';

const viewToRender = (props) => ({
	[LAND]: <DiscoverLand {...props} />,
	[PORTION]: <DiscoverPortion {...props} />
});

const LandPortionHandling = ({ id, isOpen, setIsOpen, element, user: { data: { username }} }) => {
	const userAddress = username;

	const [data, setData] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [hasErrors, setHasErrors] = useState(false);

	const handleClick = useCallback(() => {
		setIsOpen((isOpen) => !isOpen);
		if (!isOpen) {
			setData({});
			setIsLoading(true);

			const contractInstance = new window.web3.eth.Contract(contracts[element].ABI, contracts[element].address);
			contractInstance.methods.getById(id)
				.call({ from: userAddress })
				.then((result) => {
					setData({
						...result,
						id
					});
					setIsLoading(false);
				})
				.catch((error) => {
					setHasErrors(true);
					setIsLoading(false);
				});
		}

	}, [id, userAddress, element, isOpen, setIsOpen, setIsLoading, setData]);

	return (
		<>
			<StyledLinkButton color="link" onClick={handleClick}>
				{element} #{id}
			</StyledLinkButton>
			<Modal className="modal-lg" isOpen={isOpen} toggle={handleClick}>
				<ModalHeader toggle={handleClick}>
					Dettagli {element} #{id}</ModalHeader>
				<ModalBody>
					{isLoading && (
						<Container fluid>
							<Row className="justify-content-center align-content-center align-items-center">
								<Col xl={1} sm={1}>
									<StyledSpinner size="large"/>
								</Col>
							</Row>
						</Container>
					)}
					{hasErrors && (
						<Container fluid>
							<Row className="justify-content-center align-content-center align-items-center">
								<Col xl={12} sm={12}>
									<Alert color="danger" className="my-3">Si è verificato un errore nel caricamento degli elementi</Alert>
								</Col>
							</Row>
						</Container>
					)}
					{viewToRender(data)[element]}
				</ModalBody>
			</Modal>
		</>
	)
};

export default connect((state) => ({ user: Selector.getUser(state) }))(LandPortionHandling);
