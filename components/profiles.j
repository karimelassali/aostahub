// "use client"

// import { useState, useEffect, useCallback, useRef } from 'react'
// import { ChevronLeft, ChevronRight, Heart, ExternalLink } from 'lucide-react'
// import { Button } from "@/components/ui/button"


// const useKeyPress = (targetKey) => {
//   const [keyPressed, setKeyPressed] = useState(false)

//   useEffect(() => {
//     const downHandler = ({ key }) => key === targetKey && setKeyPressed(true)
//     const upHandler = ({ key }) => key === targetKey && setKeyPressed(false)

//     window.addEventListener('keydown', downHandler)
//     window.addEventListener('keyup', upHandler)

//     return () => {
//       window.removeEventListener('keydown', downHandler)
//       window.removeEventListener('keyup', upHandler)
//     }
//   }, [targetKey])

//   return keyPressed
// }

// export default function Profiles() {
//   const [dragStart, setDragStart] = useState(0)
//   const [dragEnd, setDragEnd] = useState(0)
//   const [isAnimating, setIsAnimating] = useState(false)
//   const sliderRef = useRef(null)
//   const leftPress = useKeyPress('ArrowLeft')
//   const rightPress = useKeyPress('ArrowRight')



//   const scrollToBottom = () => {
//     const bottom = document.getElementById('bottom');
//     if (bottom) {
//       bottom.scrollIntoView({ behavior: 'smooth' });
//     }
//   }

//   scrollToBottom();

//   const nextSlide = useCallback(() => {
//     if (!isAnimating) {
//       setIsAnimating(true)
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length)
//       setTimeout(() => setIsAnimating(false), 300)
//     }
//   }, [isAnimating, users.length])

//   const prevSlide = useCallback(() => {
//     if (!isAnimating) {
//       setIsAnimating(true)
//       setCurrentIndex((prevIndex) => (prevIndex - 1 + users.length) % users.length)
//       setTimeout(() => setIsAnimating(false), 300)
//     }
//   }, [isAnimating, users.length])

//   useEffect(() => {
//     if (leftPress) prevSlide()
//     if (rightPress) nextSlide()
//   }, [leftPress, rightPress, prevSlide, nextSlide])

//   const handleDragStart = (e) => {
//     if ('touches' in e) {
//       setDragStart(e.touches[0].clientX)
//     } else {
//       setDragStart(e.clientX)
//     }
//   }

//   const handleDragMove = (e) => {
//     if (dragStart === 0) return
//     if ('touches' in e) {
//       setDragEnd(e.touches[0].clientX)
//     } else {
//       setDragEnd(e.clientX)
//     }
//   }

//   const handleDragEnd = () => {
//     if (dragStart === 0) return
//     const dragThreshold = 50
//     if (dragStart - dragEnd > dragThreshold) {
//       nextSlide()
//     } else if (dragEnd - dragStart > dragThreshold) {
//       prevSlide()
//     }
//     setDragStart(0)
//     setDragEnd(0)
//   }

//   return (
//     <div className="container mx-auto px-4 py-6 h-screen flex flex-col justify-center  ">
//       {/* <h1 className="text-3xl font-bold mb-6 text-center">User Profiles</h1> */}
//       <div className="flex-grow flex flex-col lg:flex-row gap-6">
//         <div
//           className="w-full lg:w-2/3 relative overflow-hidden"
//           ref={sliderRef}
//           onMouseDown={handleDragStart}
//           onMouseMove={handleDragMove}
//           onMouseUp={handleDragEnd}
//           onMouseLeave={handleDragEnd}
//           onTouchStart={handleDragStart}
//           onTouchMove={handleDragMove}
//           onTouchEnd={handleDragEnd}>
//           <div
//             className="flex transition-transform duration-300 ease-in-out h-full"
//             style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
//             {users.map((user) => (
//               <div key={user.id} className="w-full flex-shrink-0">
//                 <div className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
//                   <div className="relative h-40 lg:h-48">
//                     <img alt="" className="w-full h-full object-cover" />
//                     <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
//                       {user.permission === "true" ? (
//                       ) : (
//                       )}   
//                     </div>
//                   </div>
//                   <div className="pt-12 lg:pt-16 px-4 lg:px-6 pb-4 lg:pb-6 flex flex-col justify-between flex-grow">
//                     <div>
//                       <h2 className="text-xl lg:text-2xl font-semibold text-center">{user.fname}</h2>
//                       <p className="text-sm lg:text-base text-muted-foreground text-center">{user.age} • {user.location}</p>
//                       <p className="mt-2 lg:mt-4 text-sm lg:text-base text-center">{user.description}</p>
                     
//                     </div>
//                     <div className="flex justify-center space-x-4 mt-4 lg:mt-6">
//                       <Button variant="outline" size="sm" onClick={() => like(currentUserId, user.id)}>
//                         <Heart className="w-4 h-4 mr-2" />
//                         Like
//                       </Button>
//                       <Button variant="default" size="sm">
//                         <ExternalLink className="w-4 h-4 mr-2" />
//                         Visit Profile
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4">
//             <Button onClick={prevSlide} variant="outline" size="icon" className="bg-background/80">
//               <ChevronLeft className="w-4 h-4" />
//             </Button>
//             <Button onClick={nextSlide} variant="outline" size="icon" className="bg-background/80">
//               <ChevronRight className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>
//       </div>
//       <div id="bottom"></div>
//     </div>
//   )
// }
