'use client'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"

import { createClient } from "@/utils/supabase/client"
import { useState, useEffect } from "react";

import { useRouter } from "next/router"
import { useUser } from "@clerk/nextjs"
import { Toaster, toast } from "sonner"
import { MdDeleteSweep } from "react-icons/md";

export function Chat() {
  const supabase = createClient();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const { user } = useUser();
  const currentUserId = user?.id;
  const userProfile = user?.imageUrl;
  const currentUser = user?.fullName;

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    const chatContainer = document.querySelector(".chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  useEffect(() => {
    // This will scroll to the bottom whenever messages change
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    
    async function fetchUsers() {
      const { data, error } = await supabase
       .from('users')
       .select()
       .order('id', { ascending: false });
      data? setUsers(data) : toast.message('No online users now .');
    }
    fetchUsers();

    async function fetchMessages() {
      const { data, error } = await supabase
       .from('msgs')
       .select('*')
       .order('id', { ascending: true });
      data? setMessages(data) : toast.message('No messages yet.');
    }
    fetchMessages();

    async function realTimeFetchMessages() {
      const { data, error } = await supabase
       .channel('msgListen')
       .on('postgres_changes', { event: '*', schema: 'public', table:'msgs' }, (payload) => {
          fetchMessages();
        })
       .subscribe();
    }
    realTimeFetchMessages();
  },[])

  async function sendMessage() {
    if (message) {
      const {data,error} = await supabase
       .from('msgs')
       .insert({
          msgSenderUid: currentUserId,
          message,
          msgSender: currentUser,
          msgSenderPicture : userProfile,
          // msgReceiverUid: users[0].id,
          // msgReceiver: users[0].fullName,
          // read: false,
          // delivered: false,

          // created_at: new Date().toISOString(),
        });
        const sA = new Audio('/ass/sent.wav');
        sA.play();
        setMessage('');
    }
  }
  return (
    (<div
      className="flex flex-col h-auto max-h-[800px] bg-background rounded-2xl shadow-lg overflow-hidden">
        <Toaster />
      <header
        className="flex items-center gap-4 bg-[#382bf0] p-4 border-b border-card-foreground/10">
        <h2 className="text-xl font-bold text-primary-foreground">Aosta Hub Chat</h2>
        <div className="flex-1" />
        <Button variant="ghost" size="icon" className="rounded-full">
          <SettingsIcon className="w-5 h-5 text-primary-foreground" />
          <span className="sr-only">Settings</span>
        </Button>
      </header>
      <div
        className="flex-1 grid grid-cols-1 lg:grid-cols-[260px_1fr] overflow-hidden">
        <div
          className="bg-card border-b lg:border-r border-card-foreground/10 overflow-auto">
          <div className="p-4 text-sm font-medium text-card-foreground">Online Users</div>
          <div className="divide-y divide-card-foreground/10">
            <div className="flex items-center gap-3 p-4 hover:bg-muted transition">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 truncate">
                <div className="font-medium">John Doe</div>
                <div className="text-xs text-muted-foreground">Online</div>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MessageCircleIcon className="w-4 h-4 text-[#382bf0]" />
                <span className="sr-only">Chat</span>
              </Button>
            </div>
            <div className="flex items-center gap-3 p-4 hover:bg-muted transition">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <div className="flex-1 truncate">
                <div className="font-medium">Sarah Anderson</div>
                <div className="text-xs text-muted-foreground">Online</div>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MessageCircleIcon className="w-4 h-4 text-[#382bf0]" />
                <span className="sr-only">Chat</span>
              </Button>
            </div>
            <div className="flex items-center gap-3 p-4 hover:bg-muted transition">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                <AvatarFallback>MR</AvatarFallback>
              </Avatar>
              <div className="flex-1 truncate">
                <div className="font-medium">Michael Rowe</div>
                <div className="text-xs text-muted-foreground">Online</div>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MessageCircleIcon className="w-4 h-4 text-[#382bf0]" />
                <span className="sr-only">Chat</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="bg-card p-4 border-b border-card-foreground/10">
            <p className="text-sm text-muted-foreground">
              All messages will be deleted after 24 hours. Any bad words or inappropriate content will result in a ban.
            </p>
          </div>
          <div className="flex-1 overflow-auto bg-card rounded-b-2xl">
            <div className="grid gap-4 p-4 overflow-auto max-h-[400px]">
              {
                messages.map((msg) => (
                     msg.msgSenderUid != currentUserId ?
                      <div key={msg.id} className="flex items-start gap-4"> 
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={msg.msgSenderPicture} alt="User Avatar" />
                        <AvatarFallback>{msg.msgSenderUid}</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1 text-sm">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{msg.msgSender} </div>
                          <div className="text-xs text-muted-foreground">10:30 AM</div>
                        </div>
                        <div className="bg-muted p-3 rounded-2xl max-w-[80%]">
                          {msg.message}
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <ThumbsUpIcon className="w-4 h-4 text-[#382bf0]" />
                            <span className="sr-only">Like</span>
                          </Button>
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <ThumbsDownIcon className="w-4 h-4 text-[#382bf0]" />
                            <span className="sr-only">Dislike</span>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="rounded-full">
                                <MoveVerticalIcon className="w-4 h-4 text-[#382bf0]" />
                                <span className="sr-only">More</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Report</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div> : 

                    <div key={msg.id} className="grid gap-1 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-right">You</div>
                      <div className="text-xs text-muted-foreground">10:35 AM</div>
                    </div>
                    <div
                      className="bg-[#382bf0] text-primary-foreground p-3 rounded-2xl max-w-auto" style={{borderRadius:'9px'}}>
                      {msg.message}
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <ThumbsUpIcon className="w-4 h-4 text-[#382bf0]" />
                        <span className="sr-only">Like</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <ThumbsDownIcon className="w-4 h-4 text-[#382bf0]" />
                        <span className="sr-only">Dislike</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <MoveVerticalIcon className="w-4 h-4 text-[#382bf0]" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Report</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              }
            
            </div>
          </div>
          <div className="bg-card p-4 border-t border-card-foreground/10">
            <div className="relative">
              <Textarea
              onChange={(e) => {setMessage(e.target.value)}}
                placeholder="Type your message..."
                className="pr-16 rounded-2xl resize-none" />
              <Button onClick={sendMessage} type="submit" size="icon" className="absolute w-8 h-8 top-3 right-3">
                <SendIcon className="w-4 h-4 text-[#382bf0]" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>)
  );
}

function MessageCircleIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>)
  );
}


function MoveVerticalIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polyline points="8 18 12 22 16 18" />
      <polyline points="8 6 12 2 16 6" />
      <line x1="12" x2="12" y1="2" y2="22" />
    </svg>)
  );
}


function SendIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>)
  );
}


function SettingsIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>)
  );
}


function ThumbsDownIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M17 14V2" />
      <path
        d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
    </svg>)
  );
}


function ThumbsUpIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M7 10v12" />
      <path
        d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>)
  );
}
