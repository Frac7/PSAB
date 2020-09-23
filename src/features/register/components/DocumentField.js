import React, { useMemo, useState, useCallback } from 'react';
import { FormText, Input, Row, Col } from 'reactstrap';

const DocumentField = ({
	values,
	touched,
	errors,
	handleChange
}) => {
	const [files, setFiles] = useState(1);
	const handleFileChange = useCallback((index) => (event) => {
		event.persist();
		const prev = values.documents[index];

		handleChange(event);
		if (event.target.value !== '' && prev === undefined && event.target.value !== prev) {
			setFiles(files + 1);
		}
	}, [files, setFiles, handleChange, values.documents]);

	const fields = useMemo(() => {
		const fields = [];
		for (let i = 0; i < files; i++) {
			fields.push(
				<Row className="my-3" form key={i}>
					<Col>
						<Input valid={touched.documents && touched.documents[i] && !errors.documents && !errors.documents[i]} type="file" name={`documents[${i}]`} id={`documents[${i}]`} onChange={handleFileChange(i)} />
					</Col>
				</Row>
			)
		}
		return fields;
	}, [files, touched, errors, handleFileChange]);

	return (
		<>
			{fields}
			{ errors.documents && <FormText color="danger">{errors.documents}</FormText>}
		</>
	);
}

export default DocumentField;