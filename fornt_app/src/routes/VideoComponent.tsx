import React, { useEffect, useRef } from 'react';

const VideoComponent: React.FC = () => {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const peerRef = useRef<RTCPeerConnection>();
    const ws = new WebSocket('ws://localhost:8080');

    useEffect(() => {
        peerRef.current = new RTCPeerConnection();

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                localVideoRef.current!.srcObject = stream;
                stream.getTracks().forEach(track => peerRef.current!.addTrack(track, stream));
            });

        peerRef.current.ontrack = event => {
            remoteVideoRef.current!.srcObject = event.streams[0];
        };

        ws.onmessage = event => {
            const message = JSON.parse(event.data);
            if (message.type === 'offer') {
                peerRef.current!.setRemoteDescription(new RTCSessionDescription(message.offer));
                peerRef.current!.createAnswer().then(answer => {
                    peerRef.current!.setLocalDescription(answer);
                    ws.send(JSON.stringify({ type: 'answer', answer }));
                });
            } else if (message.type === 'answer') {
                peerRef.current!.setRemoteDescription(new RTCSessionDescription(message.answer));
            } else if (message.type === 'candidate') {
                peerRef.current!.addIceCandidate(new RTCIceCandidate(message.candidate));
            }
        };

        return () => {
            ws.close();
        };
    }, []);

    return (
        <div>
            <video ref={localVideoRef} autoPlay muted style={{ width: '50%' }}></video>
            <video ref={remoteVideoRef} autoPlay style={{ width: '50%' }}></video>
        </div>
    );
};

export default VideoComponent;
