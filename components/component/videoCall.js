'use client'
import { useState, useEffect } from 'react';
import Peer from 'peerjs';

const VideoChat = () => {
  const [peerId, setPeerId] = useState('');
  const [remotePeerId, setRemotePeerId] = useState('');
  const [peer, setPeer] = useState(null);
  const [call, setCall] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [callerName, setCallerName] = useState('');

  useEffect(() => {
    const newPeer = new Peer();

    newPeer.on('open', (id) => {
      setPeerId(id);
    });

    newPeer.on('call', (incomingCall) => {
      setIncomingCall(incomingCall);
      setCallerName(incomingCall.peer);
    });

    setPeer(newPeer);
  }, []);

  const startCall = (remoteId) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      const call = peer.call(remoteId, stream);

      const localVideo = document.getElementById('local-video');
      localVideo.srcObject = stream;
      localVideo.play();

      call.on('stream', (remoteStream) => {
        const remoteVideo = document.getElementById('remote-video');
        remoteVideo.srcObject = remoteStream;
        remoteVideo.play();
      });

      setCall(call);
    });
  };

  const answerCall = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      incomingCall.answer(stream);

      const localVideo = document.getElementById('local-video');
      localVideo.srcObject = stream;
      localVideo.play();

      incomingCall.on('stream', (remoteStream) => {
        const remoteVideo = document.getElementById('remote-video');
        remoteVideo.srcObject = remoteStream;
        remoteVideo.play();
      });

      setCall(incomingCall);
      setIncomingCall(null);
    });
  };

  const rejectCall = () => {
    setIncomingCall(null);
  };

  const endCall = () => {
    if (call) {
      call.close();
    }
    setCall(null);
  };

  return (
    <div>
      <video id="local-video" autoPlay muted></video>
      <video id="remote-video" autoPlay></video>
      {peerId}
      <input 
        type="text" 
        placeholder="Remote Peer ID" 
        value={remotePeerId} 
        onChange={(e) => setRemotePeerId(e.target.value)} 
      />
      
      <button onClick={() => startCall(remotePeerId)}>Start Call</button>
      {incomingCall && (
        <div>
          <p>Incoming call from: {callerName}</p>
          <button onClick={answerCall}>Answer</button>
          <button onClick={rejectCall}>Reject</button>
        </div>
      )}
      {call && <button onClick={endCall}>End Call</button>}
    </div>
  );
};

export default VideoChat;
