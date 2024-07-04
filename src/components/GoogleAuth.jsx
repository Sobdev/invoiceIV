import { useEffect, useState } from 'react'
import { gapi } from 'gapi-script'

const GoogleAuth = ({ onAuthSuccess }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: '639068017676-bt7d21e2t9d4ggj1j18t1dat43otmfck.apps.googleusercontent.com',
                scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets',
                redirect_uri: 'http://localhost:5173'
            }).then(() => {
                const authInstance = gapi.auth2.getAuthInstance();
                setIsSignedIn(authInstance.isSignedIn.get());
                authInstance.isSignedIn.listen(setIsSignedIn);
            });
        };
        gapi.load('client:auth2', initClient);
    }, []);

    const handleSignIn = () => {
        gapi.auth2.getAuthInstance().signIn();
    };

    const handleSignOut = () => {
        gapi.auth2.getAuthInstance().signOut();
    };

    useEffect(() => {
        if (isSignedIn) {
            const authInstance = gapi.auth2.getAuthInstance();
            const googleUser = authInstance.currentUser.get();
            const authResponse = googleUser.getAuthResponse();
            onAuthSuccess(authResponse);
        }
    }, [isSignedIn, onAuthSuccess]);

    return (
        <div>
            {isSignedIn ? (
                <button onClick={handleSignOut}>Sign Out</button>
            ) : (
                <button onClick={handleSignIn}>Sign In with Google</button>
            )}
        </div>
    );
};

export default GoogleAuth;
