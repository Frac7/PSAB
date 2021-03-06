import contracts from '../../../contracts';

const handleFetch = (userAddress, setElements, setFetchErrors, setIsLoading, element, subject) => {
	setIsLoading(true);

	const contractInstance = new window.web3.eth.Contract(contracts[element].ABI, contracts[element].address);
	contractInstance.methods[`getBy${subject}`](userAddress)
		.call({ from: userAddress })
		.then((items) => {
			if (!items.length) {
				setElements([]);
				setIsLoading(false);
				return;
			}

			items.forEach((id, index) => {
				contractInstance.methods.getById(id)
					.call({ from: userAddress })
					.then((result) => {
						setElements((elements) => ([
							...elements, {
								...result,
								id
							}]));

						if (index === items.length - 1) {
							setIsLoading(false);
						}
					})
					.catch((error) => {
						setFetchErrors(true);
						setIsLoading(false);
					});
			});
		})
		.catch((error) => {
			setFetchErrors(true);
			setIsLoading(false);
		});
};

export { handleFetch };
