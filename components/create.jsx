'use client'

import { useState,useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Upload, Instagram, Facebook, Phone, Briefcase, MapPin, Globe, Music } from 'lucide-react'
import { color, motion } from "framer-motion";
import { MdOutlineSportsGymnastics } from "react-icons/md";
import Image from 'next/image';
import { MdOutlineVerified } from "react-icons/md";

import { createClient } from "@/utils/supabase/client"
import { toast, Toaster } from 'sonner';
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export function  CreateProfile() {
  const [me,setMe] = useState([]);
  const [fname,setFname] = useState('');
  const [lname,setLname] = useState('');
  const [age,setAge] = useState(0);
  const [gender,setGender] = useState('');
  const [description,setDescription] = useState('');
  const [skillLevel, setSkillLevel] = useState([10])
  const [interests,setInterests] = useState('');
  const [permission,setPermission] = useState(true)
  const [occupation,setOccupation] = useState('');
  const [email,setEmail] = useState('');
  const [personaleWebsite,setPersonaleWebsite] = useState('');
  const [username,setUsername] = useState('');
  const [location,setLocation] = useState('');
  const [profilePic,setUserp] = useState('');
  const [imgInp,setImgInp] = useState();
  const [imgName,setImgName] = useState('');
  const [bg,setBg] = useState(false);

  const [inlist,setInlist] = useState(false);
  const [uid,setUid] = useState();

  const [instagram,setInstagram] = useState('');
  const [facebook,setFacebook] = useState('');
  const [number,setNumber] = useState(''); 

  const supabase = createClient();
  const router = useRouter();

  const {user,isLoaded} = useUser();


  const [imagePreview, setImagePreview] = useState(null)

  const currentUserId = user?.id;
  const currentInterests = interests.split(/[,.:&;\s]|and/).filter(Boolean);
  console.log(currentInterests)
  
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
      const imgName = `${Date.now()}${e.target.files[0].name}`;
      setImgName(imgName);
      setBg(true);
      const {data,error} = await 
      supabase.storage.from('images').upload(`imgs/${imgName}`,file)
      data ? toast.success('Profile picture uploaded successfully') : toast.error('Error uploading profile picture');
    }

    
  }

  async function create(e) {
    e.preventDefault();
  
    // Basic validation
    if (!fname || !lname || !age || !description || !location || !imagePreview ) {
      toast.error('Please fill in all required fields.');
      return;
    }
  
    // console.log('Submitting form with data:', { fname, lname, age, description, instagram, facebook, number, profilePic, username, uid, email, imgName, gender, interests, location, skillLevel });
  
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{ 
          fname, lname, age, description, instagram, facebook, number, permission,
          personaleWebsite, username, 
          profilePic, uid, email, imgName, gender, occupation,
          interests, location, skillLevel: skillLevel[0]
        }])
        .single();
  
      if (error) throw error;
    
      console.log('Data inserted successfully:', data);
      toast.success(`${lname} ${fname} added successfully!`);
      setTimeout(() => {
        router.push('/explore');
      }, 3000);
    } catch (err) {
      console.error('Error submitting form:', err);
      toast.error(`Error: ${err.message}`);
    }

  }
  async function check() {
    const {data,error} = await supabase.from('users').select().eq('uid',currentUserId).single();
    console.log(user.fullName);

    if(data){
      toast.warning('You are already in list');
      setInlist(true);
      setMe(data);
    }else{
      toast.success('You are not in list');
    }
    // console.log(data.length)
  }
    //----------------------------------------------------------------
    useEffect(() => {
      if (isLoaded && user) {
        setUserp(user.imageUrl);
        setUid(user.id);
        setUsername(user?.username);
        setEmail(user?.emailAddresses);
        console.log('emailis '+ user?.emailAddresses)
        check();
      }
      console.log(permission)

    }, [isLoaded, user,fname]);
  //----------------------------------------------------------------  

 const deleteMyProfile = async (id) => {
  const { data, error } = await supabase
  .from('users')
  .delete()
  .eq('uid',id);

  if (error) {
    toast.error(error.message);
  } else {
    toast.success('Profile deleted successfully');
    router.push('/create');
  }
 }
  return (
    (<div
      className="min-h-screen dark:bg-gray-900  text-[#050315] py-12 px-4 sm:px-6 lg:px-8">
        <Toaster richColors />
        {
          inlist ? (
            <div className="fixed w-full top-0 left-0 right-0 z-50 flex items-center justify-center h-screen ">
              <div className=" p-6 rounded-lg shadow-lg">
                <h2 className="text-lg text-center dark:text-white font-semibold font-poppins mb-4">You already have a profile !</h2>
                <div className="flex items-center justify-center h-full">
                    <div className="flex flex-col items-center">
                      <img src="/ullis/boring.svg" alt="Empty" className="w-64 h-64 mb-4" />
                    </div>
                  </div>
                  <div className="actions shadow-xl border-l mb-1 gap-2 flex  p-2 rounded w-full  items-center">
                      <Image src={`https://giyrlrcehqsypefjoayv.supabase.co/storage/v1/object/public/images/imgs/${me.imgName}`}  alt="Empty" width={60} height={60} className="w-10 h-10 rounded-full mb-4" />
                      <h2 className="text-lg flex items-center gap-1 text-center dark:text-white font-semibold font-poppins mb-4">{me.fname + ' ' +  me.lname} {me.verified == 1 &&  <MdOutlineVerified size={20} style={{ color: '#0284c7' }} /> }</h2>

                  </div>
                <div className="actions gap-2 flex bg-secondary p-2 rounded w-full  justify-between">
                  <button onClick={() => {router.push('/profile/'+ me.id)}} className='p-1 m-1 bg-accent rounded w-20 text-white max-sm:w-[30%]' >
                    Show
                    </button>
                    <button onClick={()=>{router.push('/account/edit/')}} className='p-1 m-1 bg-green-400 rounded w-20 text-white max-sm:w-[30%]' >
                      Edit
                      </button>
                      <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className='p-1 hover:bg-red-300 m-1 bg-red-400 rounded w-20 text-white max-sm:w-[30%]'>Delete</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="dark:text-white bg-white text-[#050315]">
                        <AlertDialogHeader className="dark:text-white text-[#050315]" >
                          <AlertDialogTitle className="dark:text-white text-[#050315]">Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription className="dark:text-white text-[#050315]">
                            This action cannot be undone. This will permanently delete your
                            account and remove your data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className=" hover:bg-secondary text-[#050315]">Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteMyProfile(me.uid)}  className="hover:bg-red-300 bg-red-400">Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                </div>
              </div>
            </div>
          ) : (
            <div
            className="max-w-4xl rounded mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-[#2f27ce] text-white py-8 px-8 relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-64 h-64 bg-[#433bff] rounded-full transform translate-x-1/3 -translate-y-1/2 opacity-50 font-poppins "></div>
              <h1 className="text-2xl font-poppins font-bold relative z-10">Create Your Box Profile</h1>
              <p className="mt-2 relative z-10">Fill out the form below to create your unique profile.</p>
            </div>
            <form onSubmit={create} className="p-8 space-y-6">
              <div className="flex flex-col items-center">
                <motion.div
                  className="w-40 cursor-pointer h-40 rounded-full bg-[#dedcff] flex items-center justify-center overflow-hidden mb-4 border-4 border-secondary transition-all duration-300 hover:scale-105">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <Upload className="w-16 h-16 text-[#2f27ce]" />
                  )}
                </motion.div>
                <motion.label
                  htmlFor="picture"
                  className="cursor-pointer bg-[#433bff] text-white p-3 rounded-lg hover:bg-[#2f27ce] transition-colors transform hover:scale-105 duration-200 shadow-lg">
                  Select your profile picture
                </motion.label>
                <Input
                  required
                  id="picture"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input required onChange={(e) =>{setFname(e.target.value)}} id="name" placeholder="Enter your name" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input required onChange={(e) =>{setLname(e.target.value)}} id="lastName" placeholder="Enter your last name" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input required onChange={(e) =>{setAge(e.target.value)}} id="age" type="number" placeholder="Enter your age" />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select required onValueChange={(e) =>{setGender(e);console.log(e)}} >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent style={{backgroundColor:'white'}} >
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea required onChange={(e) =>{setDescription(e.target.value)}} id="description" placeholder="Tell us about yourself" className="h-24" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input onChange={(e) =>{setInstagram(e.target.value)}}  id="instagram" placeholder="Enter your Instagram" className="pl-10" />
                  <Instagram className="absolute left-3 top-9 w-5 h-5 text-[#2f27ce]" />
                  <p className="text-sm text-gray-500 mt-1">Without @</p>
                </div>
                <div className="relative">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input onChange={(e) =>{setFacebook(e.target.value)}}  id="facebook" placeholder="Enter your Facebook" className="pl-10" />
                  <Facebook className="absolute left-3 top-9 w-5 h-5 text-[#2f27ce]" />
                </div>
              </div>
              <div className="relative">
                <Label htmlFor="phone">Phone</Label>
                <Input onChange={(e) =>{setNumber(e.target.value)}}  id="phone" placeholder="Enter your Phone Number" className="pl-10" />
                <Phone className="absolute left-3 top-9 w-5 h-5 text-[#2f27ce]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <Label  htmlFor="occupation">Occupation</Label>
                  <Input onChange={(e) =>{setOccupation(e.target.value)}} id="occupation" placeholder="Enter your occupation" className="pl-10" />
                  <Briefcase className="absolute left-3 top-9 w-5 h-5 text-[#2f27ce]" />
                </div> 
                <div className="relative">
                  <Label htmlFor="location">Location</Label>
                  <Input required onChange={(e) =>{setLocation(e.target.value)}} id="location" placeholder="Enter your location" className="pl-10" />
                  <MapPin className="absolute left-3 top-9 w-5 h-5 text-[#2f27ce]" />
                </div>
              </div>
              <div>
                <Label htmlFor="website">Personal Website</Label>
                <div className="relative">
                  <Input onChange={(e) =>{setPersonaleWebsite(e.target.value)}} id="website" placeholder="https://yourwebsite.com" className="pl-10" />
                  <Globe className="absolute left-3 top-3 w-5 h-5 text-[#2f27ce]" />
                </div>
              </div>
              <div>
                <Label htmlFor="interests">Interests (comma-separated)</Label>
                <Input onChange={(e) =>{
                  setInterests(e.target.value);
                  }} id="interests" placeholder="e.g., photography, travel, cooking" />
                <div id='currentInterests' className='grid grid-cols-4  max-sm:grid-cols-1 max-md:grid-cols-2  max-xl:grid-cols-6  w-full justify-center items-center p-2' >
                  {
                    currentInterests.map((interest,index) => (
                      <motion.div
                      initial={{
                        opacity: 0,
                        x: -20
                      }}
                      animate={{
                        opacity: 1,
                        x: 0
                      }}
                      whileHover={{
                        scale: 1.1,
                        skew: 10,
                        cursor: 'pointer'
                      }}
                      key={index} className="grid gid-col-2  max-w-[100%] m-1  gap-2 m-2 bg-secondary rounded text-white items-center  p-2 first-letter:capitalize  space-x-2">
                        <div className="flex  items-center truncate  ">
                          <img  width={30} height={30} src={`https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${interest}&backgroundColor=dedcff`} />
                          <span className='font-poppins first-letter:capitalize text-text break-words ' >{interest}</span>
                        </div>
                      </motion.div>
                    ))
                  }
                </div>
              </div>
              <div>
                <Label>Interests Percent</Label>
                <div className="flex items-center space-x-4">
                  <MdOutlineSportsGymnastics className="w-5 h-5 text-[#2f27ce]" />
                  
                  <Slider
                    value={skillLevel}
                    onValueChange={setSkillLevel}
                    max={100}
                    step={1}
                    className="flex-grow" />
                  <span>{skillLevel}%</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch checked={permission} name="permission"  onCheckedChange={(e)=>{setPermission(e);console.log(e)}} id="permission" />
                <Label htmlFor="permission">Show Your Account Image</Label>
              </div>
              <button
                type="submit"
                className="w-full bg-[#2f27ce] hover:bg-[#433bff] rounded text-white text-lg py-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                Create Your Box Profile
              </button>
              
            </form>
          </div>
          )
        }
     
    </div>)
  );
} 