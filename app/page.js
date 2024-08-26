import Landing from "@/components/component/landing";



export const metadata = {
    title:'Welcome to Aosta Hub',
    description: 'Discover Aosta Hub, a unique hub where people come together to share their stories',
    icons:{
        icon:'/ass/logo.png'
    },
    openGraph:{
        title:'Welcome to Aosta Hub',
        description:'Discover Aosta Hub, a unique hub where people come together to share their stories',
        url:'https://aostahub.vercel.app',
        images:{
            url:'/ass/logo.png',
            width:800,
            height:600,
        }
    }

}
export default function Home() {
    return (
        <>
            <Landing />
        </>
    );
}
