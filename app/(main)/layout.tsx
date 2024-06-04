import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { Helmet } from 'react-helmet';


const MainLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full">
            <Helmet>
                <meta name="google-site-verification" content="hTwJDS3uUs3_9oea-NXkWtcS_3wXX_sGuC7iVL5jdg4" />
            </Helmet>
            <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
                <NavigationSidebar />
            </div>
            <main className="md:pl-[72px] h-full">
                {children}
            </main>
        </div>
    );
}

export default MainLayout;