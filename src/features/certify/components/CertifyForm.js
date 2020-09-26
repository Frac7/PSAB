import React, { useEffect, useState } from 'react';
import { Alert, Col, Container, Form, FormGroup, FormText, Input, Label, Row } from 'reactstrap';

import { StyledFilledButton, StyledSpinner } from '../../../shared/styled';

import { handleFetching } from '../map';

const ProductActivitiesForm = ({
	values,
	touched,
	errors,
	isSubmitting,
	handleSubmit,
	handleChange,
	currentForm,
	userAddress
}) => {
	const [elements, setElements] = useState([]);
	const [fetchErrors, setFetchErrors] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		handleFetching[currentForm](userAddress, setElements, fetchErrors, setFetchErrors, setIsLoading);
	}, [currentForm, userAddress, setElements, fetchErrors, setFetchErrors, setIsLoading]);

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

	if (elements.length === 0) {
		return (
			<Alert color="danger" className="my-3">Nessuna elemento disponibile per la certificazione</Alert>
		);
	}

	if (fetchErrors) {
		return (
			<Alert color="danger" className="my-3">Si è verificato un errore nel caricamento degli elementi certificabili</Alert>
		);
	}

	return (
		<Form onSubmit={handleSubmit} noValidate>
			<FormGroup>
				<Label for="portion">Oggetto della certificazione</Label>
				<Input valid={touched.object && !errors.object} type="select" name="object" id="object" onChange={handleChange} value={values.object}>
					{elements.map((element, index) => <option key={index} value={index}>{element.description}</option>)}
				</Input>
				{ errors.object && <FormText color="danger">{errors.object}</FormText>}
			</FormGroup>
			<FormGroup>
				<Label for="description">Descrizione</Label>
				<Input valid={
					touched.description && !errors.description} type="textarea" name="description" id="description" onChange={handleChange} value={values.description}/>
				{ errors.description && <FormText color="danger">{errors.description}</FormText>}
			</FormGroup>
			<StyledFilledButton type="submit" disabled={isSubmitting}>
				Certifica
			</StyledFilledButton>
		</Form>
	);
}

export default ProductActivitiesForm;
