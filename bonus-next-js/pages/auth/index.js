import React from 'react';

import User from '../../components/User';

const authIndexPage = () => (
    <div>
        <h1>The Auth Index Page</h1>
        <User name="Vadim" age={49} />
        {/* Next can use styled-jsx as follows: */}
        <style jsx>{`
            div {
                border: 1px solid #eee;
                box-shadow: 0 2p 3px #ccc;
                padding: 20px;
                text-align: center;
            }
        `}</style>
    </div>
);

export default authIndexPage;
