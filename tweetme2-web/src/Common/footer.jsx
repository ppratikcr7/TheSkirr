import React from 'react';
import { Layout, Button, Typography, Space } from 'antd';

// import logo from '../../Assets/logo.png'

export default class Footer extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { Footer } = Layout;
        return (
            <>
                <Footer style={{ textAlign: 'center' }}>
                    <Space size={3}>
                        <Button type="link">About</Button>
                        <Button type="link">Terms Of Service</Button>
                        <Button type="link">Privacy Policy</Button>
                        <Button type="link">Cookie Policy</Button>
                        <Button type="link">Advertising</Button>
                        <Button type="link">Feedback</Button>
                    </Space>
                    {/* <Typography>Covid Blog ©2021 Created by NSAII</Typography> */}
                </Footer>
            </>
        );
    }
}