import styled from 'styled-components';

import { Navbar, Badge, Button, Spinner } from 'reactstrap';

const StyledNavbar = styled(Navbar)`
	background-color: #006D77 !important;
`

const StyledFilledButton = styled(Button)`
	background-color: #006D77 !important;

	&:hover {
		background-color: #005059 !important;
	}

	&:active {
		background-color: #005059 !important;
	}

	&:focus {
		background-color: #005059 !important;
	}
`

const StyledLinkButton = styled(Button)`
	color: #006D77 !important;

	&:hover {
		color: #005059 !important;
	}

	&:active {
		color: #005059 !important;
	}

	&:focus {
		color: #005059 !important;
	}
`

const StyledSpinner = styled(Spinner)`
	color: #006D77;
`
const StyledBadge = styled(Badge)`
	background-color: #006D77;
`

const StyledTitle = (level) => styled(level)`
	color: #006D77;
`

export { StyledNavbar, StyledFilledButton, StyledLinkButton, StyledSpinner, StyledBadge, StyledTitle };
