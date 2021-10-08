import React from 'react';

import {
    Container
} from './styles';

//import { useAuth } from '../../hooks/useAuth';

const Content: React.FC = () => {
    //const { user } = useAuth();
    //console.log(user);

    return (
        <Container>
            <h1>Content</h1>
        </Container>
    );
}

export default Content;