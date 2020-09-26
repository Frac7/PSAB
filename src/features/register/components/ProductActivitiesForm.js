import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, FormText, Input, Label, Alert, Container, Row, Col } from 'reactstrap';

import { StyledFilledButton, StyledSpinner } from '../../../shared/styled';

import contracts from '../../../shared/contracts';
import { PORTION } from '../../../shared/values';

/**
 * Product, production activities and maintenance activities registration form.
 *
 * @param values
 * @param touched
 * @param errors
 * @param isSubmitting
 * @param handleSubmit
 * @param handleChange
 * @param userAddress
 * @returns {JSX.Element}
 * @constructor
 * @component
 */
const ProductActivitiesForm = ({
    values,
    touched,
    errors,
    isSubmitting,
    handleSubmit,
    handleChange,
	userAddress
}) => {
	const [elements, setElements] = useState([]);
	const [fetchErrors, setFetchErrors] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const elements = [];

		const portionInstance = new window.web3.eth.Contract(contracts[PORTION].ABI, contracts[PORTION].address);
		portionInstance.methods.getTotalPortions()
			.call({ from : userAddress })
			.then((total) => {
				console.log(total);
				total = parseInt(total);
				if (!total) {
					setElements(elements);
					setIsLoading(false);
				}

				for (let i = 0; i < total; i++) {
					portionInstance.methods.getById(i)
						.call({ from: userAddress })
						.then((result) => {
							console.log(result);
							elements.push(result);

							if (i === total - 1) {
								setElements(elements);
								setIsLoading(false);
							}
						})
						.catch((error) => {
							console.log(error);
							setFetchErrors(true);
							setIsLoading(false);
						});
				}
			})
			.catch((error) => {
				console.log(error);
				setFetchErrors(true);
				setIsLoading(false);
			});
	}, [userAddress]);

	if (isLoading) {
		return (
			<Container fluid>
				<Row className="justify-content-center align-content-center align-items-center">
					<Col md={1} sm={1}>
						<StyledSpinner size="large"/>
					</Col>
				</Row>
			</Container>
		)
	}

	if (fetchErrors) {
		return (
			<Alert color="danger" className="my-3">Si è verificato un errore nel caricamento delle porzioni</Alert>
		);
	}

	if (!elements.length) {
		return (
			<Alert color="info" className="my-3">Nessuna porzione di terreno disponibile per registrare l'elemento</Alert>
		);
	}

	return (
		<Form onSubmit={handleSubmit} noValidate>
			<FormGroup>
				<Label for="portion">Porzione relativa all'oggetto della registrazione</Label>
				<Input valid={touched.portion && !errors.portion} type="select" name="portion" id="portion" onChange={handleChange} value={values.portion}>
					{elements.map((element, index) => <option key={index} value={index}>{element.description}</option>)}
				</Input>
				{ errors.portion && <FormText color="danger">{errors.portion}</FormText>}
			</FormGroup>
			<FormGroup>
				<Label for="description">Descrizione</Label>
				<Input valid={
					touched.description && !errors.description} type="textarea" name="description" id="description" onChange={handleChange} value={values.description}/>
				{ errors.description && <FormText color="danger">{errors.description}</FormText>}
			</FormGroup>
			<StyledFilledButton type="submit" disabled={isSubmitting}>
				Aggiungi
			</StyledFilledButton>
		</Form>
	);
};

ProductActivitiesForm.propTypes = {
	/**
	 * Form values
	 */
	values: PropTypes.object,
	/**
	 * Touched fields
	 */
	touched: PropTypes.object,
	/**
	 * Errors in fields
	 */
	errors: PropTypes.object,
	/**
	 * Form submission
	 */
	isSubmitting: PropTypes.bool,
	/**
	 * Form submission handling
	 */
	handleSubmit: PropTypes.func,
	/**
	 * Field changes handling
	 */
	handleChange: PropTypes.func,
	/**
	 * Current user's Ethereum address
	 */
	userAddress: PropTypes.string
};

export default ProductActivitiesForm;
