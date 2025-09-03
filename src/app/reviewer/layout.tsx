import "@/app/globals.css";

export default function ReviewerLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="reviewer-layout">
            {children}
        </div>
    );
}
