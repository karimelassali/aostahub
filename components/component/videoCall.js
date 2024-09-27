'use client'

import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';

const VideoCall = () => {
    const [peerId, setPeerId] = useState('');
    const [callId, setCallId] = useState('');
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peer = useRef(null);

    useEffect(() => {
        // Create a new Peer instance
        peer.current = new Peer();

        // Generate a peer ID and set it
        peer.current.on('open', (id) => {
            setPeerId(id);
        });
        console.log(peer.current)
        // Handle incoming calls
        peer.current.on('call', (call) => {
            call.answer(localVideoRef.current.srcObject);
            call.on('stream', (remoteStream) => {
                remoteVideoRef.current.srcObject = remoteStream;
            });
        });

        return () => {
            // Cleanup
            peer.current.destroy();
        };
    }, []);

    const startCall = () => {
        const call = peer.current.call(callId, localVideoRef.current.srcObject);
        call.on('stream', (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream;
        });
    };

    const getUserMedia = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = stream;
    };

    return (
        <div>
            <h1>Video Call</h1>
            <video ref={localVideoRef} autoPlay muted />
            <video ref={remoteVideoRef} autoPlay />
            <input 
                type="text" 
                placeholder="Enter peer ID to call" 
                value={callId} 
                onChange={(e) => setCallId(e.target.value)} 
            />
            <button onClick={getUserMedia}>Get Media</button>
            <button onClick={startCall}>Start Call</button>
            <p>Your Peer ID: {peerId}</p>
        </div>
    );
};

export default VideoCall;
