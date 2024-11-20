'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Facebook, Instagram, Briefcase, MapPin, Globe, Users, Camera } from 'lucide-react';
import { useState, useEffect } from "react";
import { MdOutlineVerified } from "react-icons/md";
import confetti from "canvas-confetti";
import { useRouter } from 'next/navigation';
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { toast, Toaster } from 'sonner';

export default function EditAccount() {
  const [formData, setFormData] = useState({
    imgName: '',
    profilePic: '',
    fname: '',
    lname: '',
    age: '',
    occupation: '',
    location: '',
    personaleWebsite: '',
    instagram: '',
    facebook: '',
    number: '',
    interests: '',
    description: ''
  });

  const supabase = createClient();
  const { user } = useUser();
  const router = useRouter();
  const currentUserId = user?.id;

  useEffect(() => {
    const fetchMyData = async () => {
      const { data, error } = await supabase.from('users').select().eq('uid', currentUserId).single();
      if (!error) {
        setFormData({
          imgName: data.imgName,
          profilePic: data.profilePic,
          fname: data.fname,
          lname: data.lname,
          age: data.age,
          occupation: data.occupation,
          location: data.location,
          personaleWebsite: data.personaleWebsite,
          instagram: data.instagram,
          facebook: data.facebook,
          number: data.number,
          interests: data.interests,
          description: data.description
        });
      }
    };
    fetchMyData();
  }, [currentUserId]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const timestamp = Date.now(); // Generate a unique timestamp
      const uniqueFileName = `${timestamp}${file.name}`; // Combine timestamp with the original file name
  
      // Upload the file to Supabase storage
      const { data, error } = await supabase.storage
        .from('images')
        .upload(`imgs/${uniqueFileName}`, file);
  
      if (data) {
        // Update form data with the new image name and path
        setFormData(prevState => ({
          ...prevState,
          imgName: uniqueFileName, // Save only the file name
          profilePic: `imgs/${uniqueFileName}`, // Save full path for display
        }));
  
        toast.success('Profile picture updated successfully!');
      } else {
        toast.error('Error uploading profile picture');
        console.error('Upload error:', error);
      }
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('users')
      .update(formData)
      .eq('uid', currentUserId);

    if (error) {
      console.error('Error updating user data:', error);
    } else {
      // Optional: Trigger confetti animation on successful update
      confetti();

      toast.success('Profile updated successfully!');
      // router.push('/profile'); // Redirect after successful update
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster richColors />
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Cover and Avatar */}
            <div className="relative">
              <div className="h-48 bg-gray-200 dark:bg-secondary rounded-lg overflow-hidden">
                <Camera onClick={()=> {document.getElementById("profilePic").click()}} className="absolute top-4 bg-secondary rounded-sm p-1 right-4 w-6 h-6 text-accent cursor-pointer" />
                <Image
                  width={100}
                  height={100}
                  src={`https://giyrlrcehqsypefjoayv.supabase.co/storage/v1/object/public/images/imgs/${formData.imgName}`}
                  alt="Profile Cover"
                  className="w-full h-full object-cover"
                />
              </div>
              <Avatar className="absolute bottom-0 left-4 transform translate-y-1/2 w-24 h-24 border-4 border-white dark:border-gray-900">
                <AvatarImage src={formData.profilePic} alt="Profile Picture" />
                <AvatarFallback>{formData.fname}</AvatarFallback>
              </Avatar>
            </div>

            {/* Profile Picture Upload */}
            <div className="space-y-4">
              <Label hidden htmlFor="profilePic">Change Profile Picture</Label>
              <Input
                id="profilePic"
                type="file"
                onChange={handleProfilePicChange}
                className="dark:bg-secondary hidden dark:text-black"
              />
            </div>

            {/* User Information */}
            <div className="grid  grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fname">First Name</Label>
                  <Input
                    id="fname"
                    value={formData.fname}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="dark:bg-secondary dark:text-black"
                  />
                </div>
                <div>
                  <Label htmlFor="lname">Last Name</Label>
                  <Input
                    id="lname"
                    value={formData.lname}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="dark:bg-secondary dark:text-black"
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Age"
                    className="dark:bg-secondary dark:text-black"
                  />
                </div>
                <div>
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    placeholder="Occupation"
                    className="dark:bg-secondary dark:text-black"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-gray-500 dark:text-white" />
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Location"
                      className="dark:bg-secondary dark:text-black"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="website">Website</Label>
                  <div className="flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-gray-500 dark:text-white" />
                    <Input
                      id="website"
                      value={formData.personaleWebsite}
                      onChange={handleInputChange}
                      placeholder="Website"
                      className="dark:bg-secondary dark:text-black"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <div className="flex items-center space-x-2">
                    <Instagram className="w-5 h-5 text-gray-500 dark:text-white" />
                    <Input
                      id="instagram"
                      value={formData.instagram}
                      onChange={handleInputChange}
                      placeholder="Instagram"
                      className="dark:bg-secondary dark:text-black"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="facebook">Facebook</Label>
                  <div className="flex items-center space-x-2">
                    <Facebook className="w-5 h-5 text-gray-500 dark:text-white" />
                    <Input
                      id="facebook"
                      value={formData.facebook}
                      onChange={handleInputChange}
                      placeholder="Facebook"
                      className="dark:bg-secondary dark:text-black"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.number}
                    onChange={handleInputChange}
                    placeholder="Phone"
                    className="dark:bg-secondary dark:text-black"
                  />
                </div>
              </div>
            </div>

            {/* Description and Interests */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="interests">Interests</Label>
                <Textarea
                  id="interests"
                  value={formData.interests}
                  onChange={handleInputChange}
                  placeholder="Your Interests"
                  className="dark:bg-secondary dark:text-black"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself"
                  className="dark:bg-secondary dark:text-black"
                />
              </div>
            </div>

            <Button type="submit" className="w-full">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
