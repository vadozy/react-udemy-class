import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';

class IndexPage extends Component {

    //executes on the server
    static async getInitialProps(context) {
        console.log(context); // logs on the server

        const promise = new Promise(resolve => {
            setTimeout(() => {
                resolve({appName: 'Super App'});
            }, 1000);
        });
        return promise;
        
        // This works too
        //const ret = await promise;
        //return ret;

        // This works too (synchronous)
        //return {appName: 'Super App'};
    }

    render() {
        return (
            <div>
                <h1>The Main Page of [ {this.props.appName} ]</h1>
                <p>Go to {" "}
                    <Link href="/auth">
                        <a>Auth</a>
                    </Link></p>
                <button onClick={() => Router.push('/auth')} >Go to Auth</button>
            </div>
        );
    }
}

export default IndexPage;
