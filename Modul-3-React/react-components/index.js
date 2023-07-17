import React from 'react';
import ReactDOM from 'react-dom';


function SayHelloWorld() {
    return <h1>Hello World</h1>;
}
const elem = <SayHelloWorld />;
ReactDOM.render(elem, document.getElementById('root'));

//ovo sada sve uradimo kao sa app inzad my first app da bih pokrenuli kod u react odnosno browseru