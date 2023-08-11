import React from 'react';
import ReactDOM from 'react-dom';

function Hi() {
    return <div>Hello <strong> Malik! </strong></div>;
}

ReactDOM.render(<Hi />, document.querySelector('#root'));