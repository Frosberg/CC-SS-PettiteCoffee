import { createContext, type ReactNode } from "react";
import { Tab, Nav } from "react-bootstrap";
import "./TabsCustom.css";

const TabsContext = createContext<{ containerId?: string }>({});

function TabsCustom({
    id,
    defaultActiveKey = "first",
    children,
}: {
    id?: string;
    defaultActiveKey?: string;
    children: ReactNode;
}) {
    return (
        <Tab.Container id={id} defaultActiveKey={defaultActiveKey}>
            <TabsContext.Provider value={{ containerId: id }}>
                <div className="tabs-container">{children}</div>
            </TabsContext.Provider>
        </Tab.Container>
    );
}

function TabNavbar({ children }: { children: ReactNode }) {
    return <Nav className="tabs-nav">{children}</Nav>;
}

function TabItem({ eventKey, title }: { eventKey: string; title: string }) {
    return (
        <Nav.Item>
            <Nav.Link className="nav-link" eventKey={eventKey}>
                {title}
            </Nav.Link>
        </Nav.Item>
    );
}

function TabsContent({ children }: { children: ReactNode }) {
    return <Tab.Content className="tabs-content">{children}</Tab.Content>;
}

function TabPanel({
    eventKey,
    className,
    children,
}: {
    eventKey: string;
    className?: string;
    children: ReactNode;
}) {
    return (
        <Tab.Pane className={`tab-pane ${className}`} eventKey={eventKey}>
            {children}
        </Tab.Pane>
    );
}

export { TabsCustom, TabNavbar, TabItem, TabsContent, TabPanel };
