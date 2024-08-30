'use client'
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { Toaster, toast } from "sonner";

export function Chat() {
  const supabase = createClient();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const { user } = useUser();
  const currentUserId = user?.id;
  const userProfile = user?.imageUrl;
  const currentUser = user?.fullName;
  const messagesEndRef = useRef(null);

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase
        .from('users')
        .select()
        .order('id', { ascending: false });
      data ? setUsers(data) : toast.message('No online users now.');
    }
    fetchUsers();

    async function fetchMessages() {
      const { data, error } = await supabase
        .from('msgs')
        .select('*')
        .order('id', { ascending: true });
      data ? setMessages(data) : toast.message('No messages yet.');
      scrollToBottom();
    }
    fetchMessages();

    async function realTimeFetchMessages() {
      const { data, error } = await supabase
        .channel('msgListen')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'msgs' }, (payload) => {
          console.log(payload)
          fetchMessages();
        })
        .subscribe();
    }
    realTimeFetchMessages();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  async function sendMessage() {
    if (message) {
      await supabase
        .from('msgs')
        .insert({
          msgSenderUid: currentUserId,
          message,
          msgSender: currentUser,
          msgSenderPicture: userProfile,
        });
      setMessage('');
    }
  }

  return (
    <div className="flex flex-col h-screen max-h-screen bg-background rounded-2xl shadow-lg">
      <header className="flex items-center gap-4 bg-[#382bf0] p-4 border-b border-card-foreground/10">
        <div className="flex-1" />
        <Button variant="ghost" size="icon" className="rounded-full">
          <SettingsIcon className="w-5 h-5 text-primary-foreground" />
          <span className="sr-only">Settings</span>
        </Button>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {/* Online Users Section */}
        <div className="w-64 bg-card border-r border-card-foreground/10 overflow-y-auto">
          <h2 className="p-4 text-sm font-medium">Online Users</h2>
          <div className="p-4">
            {users.map((user, index) => (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer mb-4">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.profilePic} alt="User Avatar" />
                    <AvatarFallback>{user.id}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm font-medium">{user.lname} {user.fname}</div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Send Message</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> 
            ))}
          </div>
        </div>
        {/* Chat Messages Section */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid gap-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex items-start gap-4 ${message.msgSenderUid === currentUserId ? 'justify-end' : ''}`}>
                  {message.msgSenderUid !== currentUserId && (
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="grid gap-1 text-sm max-w-[80%]">
                    <div className={`flex items-center justify-between ${message.msgSenderUid === currentUserId ? 'text-right' : ''}`}>
                      <div className="font-medium">{message.msgSenderUid === currentUserId ? 'You' : 'John Doe'}</div>
                      <div className="text-xs text-muted-foreground">10:35 AM</div>
                    </div>
                    <div className={`p-3 rounded-2xl ${message.msgSenderUid === currentUserId ? 'bg-[#382bf0] text-primary-foreground' : 'bg-muted'}`}>
                      {message.message}
                    </div>
                  </div>
                  {message.msgSenderUid === currentUserId && (
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                      <AvatarFallback>YO</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="bg-card p-4 border-t border-card-foreground/10 sticky bottom-0">
            <div className="relative">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="pr-16 rounded-2xl resize-none"
              />
              <Button onClick={sendMessage} type="submit" size="icon" className="absolute w-8 h-8 top-3 right-3">
                <SendIcon className="w-4 h-4 text-[#382bf0]" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
