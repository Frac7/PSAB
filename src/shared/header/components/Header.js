import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Nav, NavItem, NavLink, Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';

import { StyledNavbar } from '../../styled';

import { menu } from '../data';
import { ADMIN, PROFILE, SIGNOUT } from '../../../config/routes';
import { Selector } from '../../../store/user/reducer';

const Header = ({ user }) => {
	const { pathname } = useLocation();

	const [isAdmin, setIsAdmin] = useState(false);
	useEffect(() => {
		if (user.data) {
			const { attributes } = user.data;
			setIsAdmin(Boolean(parseInt(attributes['custom:is_admin'])));
		}
	}, [user]);

	return (
		<header>
			<StyledNavbar dark expand>
				<Nav navbar style={{ width: '100%' }}>
					<Container fluid>
						<Row style={{ width: '100%' }}>
							{ menu.map(({ route, label }, index) =>
								<Col md={{ size: 1, offset: index ? 0 : 3 }} key={index}>
									<NavItem active={pathname === route}>
										<Link component={NavLink} to={route}>{label}</Link>
									</NavItem>
								</Col>
							)}
							{isAdmin && (
								<Col md={{ size: 2, offset: 1 }}>
									<NavItem active={pathname === ADMIN}>
										<Link component={NavLink} to={ADMIN}>
											Aggiungi Utente
										</Link>
									</NavItem>
								</Col>)}
							<Col md={{ size: 1, offset: isAdmin ? 0 : 2 }}>
								<NavItem active={pathname === PROFILE}>
									<Link component={NavLink} to={PROFILE}>
										<FontAwesomeIcon icon={faUser} color="inherit" size="lg" />
									</Link>
								</NavItem>
							</Col>
							{user.data && <Col md={{ size: 1 }}>
								<NavItem active={pathname === SIGNOUT}>
									<Link component={NavLink} to={SIGNOUT}>
										<FontAwesomeIcon icon={faSignOutAlt} color="inherit" size="lg" />
									</Link>
								</NavItem>
							</Col>}
						</Row>
					</Container>
				</Nav>
			</StyledNavbar>
		</header>
	)
}

const mapStateToProps = (state) => ({
	user: Selector.getUser(state)
});

export default connect(mapStateToProps)(Header);
