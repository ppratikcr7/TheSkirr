import React from 'react';
import { Layout, Menu, Breadcrumb, Button, Row, Col, Card, Avatar, Typography, Space } from 'antd';
import 'antd/dist/antd.css';
// Add component
import Home_image from "../../Assets/banner.jpeg";
import card1 from "../../Assets/card1.png";
import card2 from "../../Assets/card2.png";
import card3 from "../../Assets/card3.png";
import card4 from "../../Assets/card4.png";
import { WrapperHome } from './Home.style';
import EventCard from '../../Common/Card/EventCard';
import { USER_TYPES } from '../../Helpers/Constant';


export default class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false
        }
    }
    myClickHandler = (params) => {
        if (params) {
            // this.props.history.push({
            //     pathname: "/register",
            //     state: {
            //         key: params
            //     }
            // });
        }

    }
    render() {
        const { Content } = Layout;
        const { Meta } = Card;
        return (
            <>
                <Layout>
                    <WrapperHome>
                        <Content className="site-layout" style={{ padding: '0 0px' }}>
                            {/* marginTop: 104 */}
                            <div className="site-layout-background">
                                <br />
                                {!this.state.isClicked ?
                                <>
                                    <Row className="home-content" type="flex">
                                        <Col span={14} >
                                            <img src={Home_image} alt="" width="93%" height="75%" />
                                        </Col>
                                        <Col span={10} >
                                            <div style={{ marginTop: 80, lineHeight: "38px", textAlign: "center", width: "100%" }}>
                                                <p style={{ fontSize: "25px", justifyContent: "right" }}><b>“When walking alone in a jungle of true darkness, there are three things that can show you the way: instinct to survive, the knowledge of navigation, creative imagination. Without them, you are lost.”</b></p>
                                                <p style={{ fontSize: "15px", justifyContent: "right" }}><b>-Tobo Beta</b></p>
                                                <br />
                                                <Button style={{ marginBottom: 10, width: 300 }} onClick={() => this.setState({ isClicked: true })} shape="round" size={'large'} block type="primary" htmlType="submit" className="login-form-button button-container">
                                                    Sign Up
                                                </Button>
                                                <Button style={{ width: 300 }} onClick={() => { this.props.history.push("/login") }} shape="round" size={'large'} block htmlType="submit" className="login-form-button button-container">
                                                    <a href="/login" style={{ textDecoration: "none" }}>Login</a>
                                                </Button>
                                            </div>
                                        </Col>

                                    </Row>
                                    <Row span={14} >
                                        <Button type={'primary'} size={'large'} style={{margin:12}} onClick={(event)=>{console.log(event)}}>Submit Research</Button>
                                        <Button type={'primary'} size={'large'} style={{margin:12}} onClick={(event)=>{console.log(event)}}>EOI NGO</Button>
                                        <Button type={'primary'} size={'large'} style={{margin:12}} onClick={(event)=>{console.log(event)}}>EOI Healthcare Worker</Button>
                                        <Button type={'primary'} size={'large'} style={{margin:12}} onClick={(event)=>{console.log(event)}}>Covid Research</Button>
                                    </Row>
                                    <br/>
                                    <br/>
                                    <br/>
                                </>
                                    :
                                    <Row className="home-content">
                                        <Col span={24}>
                                            <Row>
                                                <a href="/register?user_type=government" style={{ textDecoration: "none" }}><EventCard image={card1} title="Governmental User" desc="good work" myOnClick={() => this.myClickHandler(USER_TYPES.GOVERNMENT)} /></a>
                                            </Row>
                                            {/* </Col> */}
                                            <Row>
                                                <a href="/register?user_type=institutional" style={{ textDecoration: "none" }}><EventCard image={card2} title="Institutional User (Hospitals, Nursing homes or Pharmacies)" desc="good work" myOnClick={() => this.myClickHandler(USER_TYPES.INSTITUTIONAL)} /></a>
                                            </Row>
                                            <Row>
                                                <a href="/register?user_type=vaccine" style={{ textDecoration: "none" }}><EventCard image={card3} title="Vaccine taken Covid Patient" desc="good work" myOnClick={() => this.myClickHandler(USER_TYPES.VACCINE)} /></a>
                                            </Row>
                                            <Row>
                                                <a href="/register?user_type=general" style={{ textDecoration: "none" }}><EventCard image={card4} title="General User (Non-Covid and Non-Vaccinated)" desc="good work" myOnClick={() => this.myClickHandler(USER_TYPES.GENERAL)} /></a>
                                            </Row>
                                        </Col>
                                    </Row>
                                }
                            </div>
                        </Content>

                    </WrapperHome>

                </Layout>
            </>
        );
    }
}