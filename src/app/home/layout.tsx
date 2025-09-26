import "@/app/globals.css";
import { Header } from "@/components/header";

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="home-layout">
            <Header></Header>
            {children}
        </div>
    );
}
