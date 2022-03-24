import React from 'react';
import {MDBCol, MDBContainer, MDBRow, MDBFooter} from "mdbreact";

const Footer = () => {
    return(
        <div className="container-fluid footer">
        <MDBFooter color="blue" className="font-small pt-4 mt-4">
            <MDBContainer fluid className="text-center text-md-left">
                <MDBRow>
                    <MDBCol md="6">
                        <h5 className="title">Event Booking Site</h5>
                        <p>
                            Student Governing Council <br/>
                            RGUKT Basar
                        </p>
                    </MDBCol>
                    <MDBCol md="6">
                        <h5 className="title">Follow us:</h5>
                        <ul>
                            <li className="list-unstyled">
                                <a href="#!" style={{textDecoration: 'none', color: '#fff'}}>Facebook</a>
                            </li>
                            <li className="list-unstyled">
                                <a href="#!" style={{textDecoration: 'none', color: '#fff'}}>Instagram</a>
                            </li>
                            <li className="list-unstyled">
                                <a href="#!" style={{textDecoration: 'none', color: '#fff'}}>Twitter</a>
                            </li>
                            <li className="list-unstyled">
                                <a href="#!" style={{textDecoration: 'none', color: '#fff'}}>Telegram</a>
                            </li>
                        </ul>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <div className="footer-copyright text-center py-3">
                <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} Copyright: <a href="#" style={{textDecoration: 'none', color: '#fefefe'}}> SGC RGUKT Basar</a>
                </MDBContainer>
            </div>
        </MDBFooter>
    </div>
    )
}

export default Footer;