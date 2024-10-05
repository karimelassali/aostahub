'use client'
import React, { useState, useEffect } from 'react';
import Peer from 'peerjs';

export default function  VideoChat(){
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
    <div className=" w-screen absolute top-0 left-0  inset-0  p-2   flex items-center justify-center">
      <video id="local-video" autoPlay muted className="w-full h-full"></video>
      <video id="remote-video" autoPlay className="w-full h-full"></video>
      {peerId}
      <input 
        type="text" 
        placeholder="Remote Peer ID" 
        value={remotePeerId} 
        onChange={(e) => setRemotePeerId(e.target.value)} 
        className="mt-4 p-2 border border-gray-300 rounded"
      />
      
      <button onClick={() => startCall(remotePeerId)} className="mt-4 p-2 bg-blue-500 text-white rounded">Start Call</button>
      {incomingCall && (
        <div className="absolute top-0 left-0 w-full z-10">
          <p>Incoming call from: {callerName}</p>
          <button onClick={answerCall} className="mt-4 p-2 bg-green-500 text-white rounded">Answer</button>
          <button onClick={rejectCall} className="mt-4 p-2 bg-red-500 text-white rounded">Reject</button>
        </div>
      )}
      {call && <button onClick={()=>{endCall,stopCall()}} className="mt-4 p-2 bg-red-500 text-white rounded">End Call</button>}
    </div>
  );
};

