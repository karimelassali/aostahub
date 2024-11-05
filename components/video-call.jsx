import React, { useState, useEffect, useRef } from 'react';
import Peer from 'peerjs';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic, Video, Phone } from 'lucide-react';

export default function VideoCall({ onCloseCall }) {
  const remoteVideoRef = useRef(null);
  const localVideoRef = useRef(null);

  const [peer, setPeer] = useState(null);
  const [call, setCall] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [stopCall, setStopCall] = useState(false);
  const [remotePeerId, setRemotePeerId] = useState('');

  useEffect(() => {
    const newPeer = new Peer();

    
    newPeer.on('open', (id) => {
      console.log('My peer ID:', id);
    });

    newPeer.on('call', (incomingCall) => {
      setIncomingCall(incomingCall);
    });

    setPeer(newPeer);

    return () => {
      if (peer) {
        peer.destroy();
      }
    };
  }, []);

  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    setLocalStream(stream);

    const call = peer.call(remotePeerId, stream);
    setCall(call);

    call.on('stream', (remoteStream) => {
      setRemoteStream(remoteStream);
      remoteVideoRef.current.srcObject = remoteStream;
    });
  };

  const answerCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    setLocalStream(stream);

    incomingCall.answer(stream);
    setCall(incomingCall);

    incomingCall.on('stream', (remoteStream) => {
      setRemoteStream(remoteStream);
      remoteVideoRef.current.srcObject = remoteStream;
    });

    setIncomingCall(null);
  };

  const endCall = () => {
    if (call) {
      call.close();
    }
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
    }
    setCall(null);
    setRemoteStream(null);
    setLocalStream(null);
    setStopCall(true);
    onCloseCall();
  };

  return (
    <div className="flex w-screen h-screen  absolute top-0 left-0 z-50 items-center justify-center min-w-screen min-h-screen bg-[#fbfbfe] text-[#050315]">
      {localStream && (
        <video className="w-full h-full" autoPlay muted ref={localVideoRef} />
      )}
      {remoteStream && (
        <video className="w-full h-full" autoPlay ref={remoteVideoRef} />
      )}
      <Card className="w-full max-w-4xl p-6 shadow-lg rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative aspect-video bg-[#dedcff] rounded-xl overflow-hidden">
            <video className="w-full h-full object-cover" ref={remoteVideoRef} />
            <div
              className="absolute top-4 right-4 bg-[#2f27ce] text-white px-2 py-1 rounded-md text-sm font-medium">
              HD
            </div>
            <div className="absolute bottom-4 left-4 flex items-center space-x-2">
              <Avatar className="w-10 h-10 border-2 border-white">
                <AvatarImage src="/placeholder-avatar.jpg" alt="John Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="text-white font-medium">John Doe</span>
            </div>
          </div>
          <div className="relative aspect-video bg-[#dedcff] rounded-xl overflow-hidden">
            <video className="w-full h-full object-cover" ref={localVideoRef} autoPlay />
            <div
              className="absolute top-4 right-4 bg-[#2f27ce] text-white px-2 py-1 rounded-md text-sm font-medium">
              HD
            </div>
            <div className="absolute bottom-4 left-4 flex items-center space-x-2">
              <Avatar className="w-10 h-10 border-2 border-white">
                <AvatarImage src="/placeholder-avatar-you.jpg" alt="You" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <span className="text-white font-medium">You</span>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          <input
            type="text"
            placeholder="Enter friend's peer ID"
            value={remotePeerId}
            onChange={(e) => setRemotePeerId(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <Button
            onClick={startCall}
            size="icon"
            className="rounded-full bg-blue-500 text-white hover:bg-blue-600">
            <Phone className="h-5 w-5" />
          </Button>
          {incomingCall && (
            <div>
              <p>Incoming call from: {incomingCall.peer}</p>
              <Button
                onClick={answerCall}
                size="icon"
                className="rounded-full bg-green-500 text-white hover:bg-green-600">
                <Phone className="h-5 w-5" />
              </Button>
              <Button
                onClick={endCall}
                size="icon"
                className="rounded-full bg-red-500 text-white hover:bg-red-600">
                <Phone className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
