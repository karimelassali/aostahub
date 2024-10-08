'use client'
import { createClient } from "@/utils/supabase/client";
import { useState,useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link";
export default function TopUsers() {
  const supabase = createClient();
  const [topUsers,setTopUsers] = useState([]);

  async function getTopUsers() {
    const { data, error } = await supabase
    .rpc('get_top_users')
    if (error) {
      console.log(error);
    }
    if (data) {
      setTopUsers(data)
    }   
  }

  useEffect(() => {
        getTopUsers();
  },[])
  return (
    <div className='w-auto'  >
      <div className='gap-y-2 items-center'>
        {
            topUsers.map((user)=>(
              <>    
                    <div className="user border border-secondary rounded">
                        <div className="info">
                            <div className="profile p-2 gap-2  flex items-center">
                            <Avatar>
                                <AvatarImage src={`https://giyrlrcehqsypefjoayv.supabase.co/storage/v1/object/public/images/imgs/${user.imgName}`} alt="@shadcn" />
                                <AvatarFallback>{user.username}</AvatarFallback>
                            </Avatar>
                            <h3 className='font-bold text-lg'  >{user.fname + user.lname}</h3> <br />
                            <p className='text-sm text-slate-600'  >{user.age}</p>
                            </div>
                            <div className="grid gap-2 p-2  ">
                                <p>Skill: React Developer</p>
                                <p>Location: {user.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 rounded-sm p-1" style={{ backdropFilter: 'blur(30px)',borderRadius:'4px' }}>
                        {user.instagram && (
                            <Link href={"https://www.instagram.com/"+user.instagram} className="hover:scale-110 text-muted-foreground hover:text-primary" prefetch={false}>
                            <InstagramIcon className="w-5 h-5" style={{ color: '#c026d3' }} />
                            </Link>
                        )}
                        {user.facebook && (
                            <Link href={"https://www.facebook.com/"+user.facebook} className="hover:scale-110 text-muted-foreground hover:text-primary" prefetch={false}>
                            <FacebookIcon className="w-5 h-5" style={{ color: '#06b6d4' }} />
                            </Link>
                        )}
                        {user.number && (
                            <Link href={"tel:"+user.number} className="hover:scale-110 text-muted-foreground hover:text-primary" prefetch={false}>
                            <PhoneIcon className="w-5 h-5" style={{ color: '#4ade80' }} />
                            </Link>
                        )}
                        </div>
                    </div>
                    <br />
              </>
            ))
        }
            <br />
        </div>
    </div>
  )
}




function FacebookIcon(props) {
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
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>)
    );
  }
  
  
  function InstagramIcon(props) {
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
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>)
    );
  }
  
  
  function PhoneIcon(props) {
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
          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>)
    );
  }
  