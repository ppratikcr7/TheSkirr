import React from 'react';
import { Layout, Menu, Breadcrumb, Button, Row, Col, Card, Avatar, Typography, Space } from 'antd';
import 'antd/dist/antd.css';
import Footer from '../../Common/footer';
// Add component
import Home_image from "../../Assets/banner.jpeg";
import card1 from "../../Assets/card1.png";
import card2 from "../../Assets/card2.png";
import card3 from "../../Assets/card3.png";
import card4 from "../../Assets/card4.png";
import { WrapperHome } from './SubmitResearch.style';
import EventCard from '../../Common/Card/EventCard';
import { USER_TYPES } from '../../Helpers/Constant';


export default class SubmitResearch extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false
        }
    }
    
    render() {
        const { Content } = Layout;
        
        return (
            <>
                <Layout>
                    <WrapperHome>
                        <Content className="site-layout" style={{ padding: '0 0px' }}>
                            {/* marginTop: 104 */}
                            <div className="site-layout-background">
                                jflasdkjflksjdflksajdflkajsdfkjsad;lfkjsad
                                asdhfklasdjhflaskdhjfkas
                                <Button>new</Button>
                            </div>
                            <Footer />
                        </Content>
                        
                    </WrapperHome>
                    
                </Layout>
            </>
        );
    }
}