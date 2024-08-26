import Landing from "@/components/component/landing";



export const metadata = {
    title:'Welcome to Aosta Hub',
    description: 'Discover Aosta Hub, a unique hub where people come together to share their stories',
    icons:{
        icon:'/ass/logo.png'
    },
    openGraph:{
        title:'Welcome to Aosta Hub',
    }

}
export default function Home() {
    return (
        <>
            <Landing />
        </>
    );
}
