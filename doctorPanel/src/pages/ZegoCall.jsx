import React, { useEffect } from 'react';

const ZegoCall = ({ roomID, userID, userName, isHost }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@zegocloud/zego-uikit-prebuilt/zego-uikit-prebuilt.js';
        script.onload = () => {
            const getUrlParams = (url) => {
                let urlStr = url.split('?')[1];
                const urlSearchParams = new URLSearchParams(urlStr);
                return Object.fromEntries(urlSearchParams.entries());
            };

            const appID = 17369730; // Replace with your app ID
            const serverSecret = "e04f470149ce3ff1c96cba355f7b94d1"; // Replace with your server secret
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);

            const zp = ZegoUIKitPrebuilt.create(kitToken);
            zp.joinRoom({
                container: document.querySelector("#root"),
                sharedLinks: [{
                    name: 'Personal link',
                    url: window.location.protocol + '//' + window.location.host  + window.location.pathname + '?roomID=' + roomID,
                }],
                scenario: {
                    mode: ZegoUIKitPrebuilt.VideoConference,
                },
                turnOnMicrophoneWhenJoining: true,
                turnOnCameraWhenJoining: true,
                showMyCameraToggleButton: true,
                showMyMicrophoneToggleButton: true,
                showAudioVideoSettingsButton: true,
                showScreenSharingButton: true,
                showTextChat: true,
                showUserList: true,
                maxUsers: 50,
                layout: "Auto",
                showLayoutButton: true,
                // Additional host-specific features
                showRoomSettingsButton: isHost, // Show room settings button for the host
            });
        };

        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, [roomID, userID, userName, isHost]);

    return (
        <div id="root" style={{ width: '100vw', height: '100vh' }}></div>
    );
};

export default ZegoCall;
