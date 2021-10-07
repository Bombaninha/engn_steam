import React from 'react';

import {
    Grid
} from './styles';

import Aside from '../Aside';
import Content from '../Content';

const Layout: React.FC = () => {
    return (
        <Grid>
            <Aside />
            <Content />
        </Grid>
    );
}

export default Layout;