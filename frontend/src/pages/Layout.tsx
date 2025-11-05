import Header from "../components/Header";
import Footer from "../components/Footer";

type Props = {
    children?: React.ReactNode;
    className?: string;
};

function Layout({ children, className }: Props) {
    return (
        <>
            <Header />
            <main className={`layout__main ${className}`}>{children}</main>
            <Footer />
        </>
    );
}

export default Layout;
