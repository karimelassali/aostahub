// 'use client'
// import { Card, CardContent } from "@/components/ui/card"
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"


// import {motion} from 'framer-motion'





// export function Cards() {
 

//   let [isOpen, setIsOpen] = useState(true)

//   function open() {
//     setIsOpen(true)
//   }

//   function close() {
//     setIsOpen(false)
//   }

//   async function delAno(id) {
//     try {
//       const { data, error } = await supabase.from('users').delete().eq('id', id);
//       if (error) throw error;
//     } catch (error) {
//       console.error('Error deleting user:', error.message);
//       }
//   }



// return (
//   <>
//   <Suspense fallback={'loading'} >
    
//     <div className="grid p-2 gap-6 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4">
  
//     { (
          
//         users.map(user => (
          
//           <motion.Card 
//           whileHover={{ shadow: '0 10px 20px red'}}
//           onHoverStart={e => {}}
//           onHoverEnd={e => {}}
//           onDoubleClick={(e)=>{router.push('profile/'+user.id)  }} key={user.id} className="bg-background max-h-[100%] rounded-lg  border-t border-accent overflow-hidden shadow-lg hover:cursor-pointer ">
//               <div style={{ backdropFilter: 'blur(30px)' }}>
//                 <div className="relative h-32 flex items-end justify-end p-1" style={{ backgroundSize: 'cover' }}>
//                   {
//                     user.permission == "true" ? (
//                       <Image width={100} height={100} src={user.profilePic} className="w-full h-full object-cover rounded-sm" style={{borderRadius:'4px'}}  alt="bgImage" />

//                     ):
//                     (
//                       <Image width={100} height={100} src={'/ass/logo.png'} className="w-full h-full object-cover rounded-sm" style={{borderRadius:'4px'}}  alt="bgImage" />

//                     )
//                   }
//                   <Avatar style={{borderRadius:'50px'}} className="absolute top-[70%] left-4 w-20 h-20 border-4 border-background rounded-lg ">
//                     <span className="flex h-[100%] w-full items-center justify-center " >
//                     <AlertDialog>
//                       <AlertDialogTrigger asChild>
//                         <AvatarImage className="hover:scale-150 hover:cursor-pointer" src={`https://giyrlrcehqsypefjoayv.supabase.co/storage/v1/object/public/images/imgs/${user.imgName}`} alt="User Avatar" />
//                       </AlertDialogTrigger>
//                       <AlertDialogContent  style={{backdropFilter:'blur(40px)'}}>
//                         <AlertDialogHeader>
//                             <AlertDialogDescription>
//                               <Image
//                                 style={{ borderRadius: '9px' }}
//                                 className="w-full h-[200px] object-contain "
//                                 src={`https://giyrlrcehqsypefjoayv.supabase.co/storage/v1/object/public/images/imgs/${user.imgName}`}
//                                 width={300}
//                                 height={300}
//                                 alt="profile pic"
//                               />
//                             </AlertDialogDescription>
//                         </AlertDialogHeader>
//                         <AlertDialogFooter>
//                           <AlertDialogCancel className='bg-accent text-white' style={{borderRadius:'4px'}}>Chiuso</AlertDialogCancel>
//                         </AlertDialogFooter>
//                       </AlertDialogContent>
//                     </AlertDialog>
//                     </span>
//                     <AvatarFallback>{user.id}</AvatarFallback>
//                   </Avatar>
//                 </div>
//               </div>
//             <CardContent className="p-6 pt-12   space-y-4">
//               <div className="flex items-center justify-between lg:flex-col lg:items-start lg:gap-2 lg:justify-center">
//                 <div className="space-y-1">
//                   <h3 className="text-xl flex items-center gap-2 font-semibold font-poppins ">
//                     {user.fname + ' ' +  user.lname} 
//                     {user.verified == 1 && <MdOutlineVerified size={20} style={{ color: '#0284c7' }} />}
//                   </h3>
//                   <p className="text-sm text-muted-foregro und font-open ">{user.age} years old</p>
//                 </div>
//                 <div className="flex items-center space-x-3 rounded-sm p-1" style={{ backdropFilter: 'blur(30px)', border: '0.2px solid #e2e8f0',borderRadius:'4px' }}>
//                   {user.instagram && (
//                     <Link href={"https://www.instagram.com/"+user.instagram} className="hover:scale-110 text-muted-foreground hover:text-primary" prefetch={false}>
//                       <InstagramIcon className="w-5 h-5" style={{ color: '#c026d3' }} />
//                     </Link>
//                   )}
//                   {user.facebook && (
//                     <Link href={"https://www.facebook.com/"+user.facebook} className="hover:scale-110 text-muted-foreground hover:text-primary" prefetch={false}>
//                       <FacebookIcon className="w-5 h-5" style={{ color: '#06b6d4' }} />
//                     </Link>
//                   )}
//                   {user.number && (
//                     <Link href={"tel:"+user.number} className="hover:scale-110 text-muted-foreground hover:text-primary" prefetch={false}>
//                       <PhoneIcon className="w-5 h-5" style={{ color: '#4ade80' }} />
//                     </Link>
//                   )}
//                 </div>
//               </div>
//               <hr />
//               {/* via rue abbe ame gorret */}
//               <p className="text-sm text-muted-foreground font-open line-clamp-4 ">
//                 {user.description}
//               </p>
//               <hr />
//               {
//                 user.uid == currentUserId? (
//                   <motion.div
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 1.3 ,delay:3}}
//                   className="flex items-center justify-end  ">
//                       <Button
//                         style={{border:'1px solid red',borderRadius:'4px'}}  
//                         variant="ghost"
//                         size="icon"
//                         className=" w-[50%]  0 text-white hover:bg-red-500" onClick={()=>delAno(user.id)} >
//                           <TrashIcon className="w-5 h-5 " style={{ color: '#e11d48' }} />
//                         </Button>
//                   </motion.div>
//                 ) : null  
//               }
//               {/* <div className="flex items-center justify-end ">
//                {
//                 user.uid == currentUserId ? 
//                 <Button
//                 variant="ghost"
//                 size="icon"
//                 className=" w-[50%]  0 text-white" style={{border:'1px solid red'}}>
//                 <TrashIcon className="w-5 h-5" style={{ color: '#e11d48' }} />
//               </Button> : null
//                }
//               </div> */}
//             </CardContent>
//           </motion.Card>
//         ))
//       )
//     }
//   </div>
//   </Suspense>
  
//   </>
// );

// function FacebookIcon(props) {
//   return (
//     (<svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round">
//       <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
//     </svg>)
//   );
// }


// function InstagramIcon(props) {
//   return (
//     (<svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round">
//       <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
//       <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
//       <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
//     </svg>)
//   );
// }


// function PhoneIcon(props) {
//   return (
//     (<svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round">
//       <path
//         d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
//     </svg>)
//   );
// }


// function TrashIcon(props) {
//   return (
//     (<svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round">
//       <path d="M3 6h18" />
//       <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
//       <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
//     </svg>)
//   );
// }}
