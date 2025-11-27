import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollTopButton from "../components/ScrollTopButton";

type Props = {
    children?: React.ReactNode;
    className?: string;
};

function Layout({ children, className }: Props) {
    return (
        <>
            <Header />
            <main className={`layout__main page-fade ${className ?? ""}`}>{children}</main>
            <Footer />
            <ScrollTopButton />
        </>
    );
}

export default Layout;
