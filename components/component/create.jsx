'use client'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Create() {
  return (
    (<div className="container mx-auto max-w-md py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create Your Box Profile</h1>
          <p className="mt-2 text-muted-foreground">Fill out the form below to create your profile.</p>
        </div>
        <Card>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <div className="flex items-center gap-2">
                  <Input id="name" placeholder="Enter your name" />
                  <UserIcon className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastname">Last Name</Label>
                <div className="flex items-center gap-2">
                  <Input id="lastname" placeholder="Enter your last name" />
                  <UserIcon className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <div className="flex items-center gap-2">
                <Input id="age" type="number" placeholder="Enter your age" />
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Tell us about yourself"
                className="min-h-[100px]" />
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="instagram">Instagram</Label>
                <div className="flex items-center gap-2">
                  <Input id="instagram" placeholder="Enter your Instagram" className="w-full" />
                  <InstagramIcon className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="facebook">Facebook</Label>
                <div className="flex items-center gap-2">
                  <Input id="facebook" placeholder="Enter your Facebook" className="w-full" />
                  <FacebookIcon className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="flex items-center gap-2">
                  <Input id="phone" placeholder="Enter your Phone Number" className="w-full" />
                  <PhoneIcon className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto">Create Profile</Button>
          </CardFooter>
        </Card>
      </div>
    </div>)
  );
}

function CalendarIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>)
  );
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


function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>)
  );
}
