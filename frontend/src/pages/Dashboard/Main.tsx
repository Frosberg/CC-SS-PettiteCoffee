import "./Main.css";

function Main() {
    return <div className="MainMenu">{/* Aqui iran los IFrames de Grafana */
        <iframe
            src="http://localhost:3000/d/spring_boot_21/spring-boot-2-1-system-monitor?orgId=1&from=now-1h&to=now&timezone=browser&var-application=&var-instance=host.docker.internal:8080&var-hikaricp=HikariPool-1&var-memory_pool_heap=$__all&var-memory_pool_nonheap=$__all&refresh=5s"
            width="100%"
            height="600"
            style={{ border: "none" }}
            title="Grafanita"
        ></iframe>
    }</div>;
}

export default Main;
