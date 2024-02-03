import React from 'react';
import { Container } from 'reactstrap';

import "../../styles/CommonSection.scss"

type data={
    title:string;
}
const CommonSection = (props:data) => {
    return (
        <section className='common__section'>
            <Container className='text-center'>
                <h1>{props.title}</h1>
            </Container>
            
        </section>
    );
};

export default CommonSection;