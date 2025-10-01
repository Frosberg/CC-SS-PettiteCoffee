# ☕🍰 Le Pettite Coffee

Le Pettite Coffee es una página web dedicada a mostrar y compartir la experiencia de los mejores cafés y pasteles. Su objetivo es ofrecer un espacio cálido y cercano donde los usuarios puedan descubrir sabores, recetas e inspiración alrededor del mundo del café y la repostería.

## 🛠️ Tecnologías principales

### Backend:
Nuestro backend, construido con Java ☕, es la base robusta que gestiona la lógica de negocio. Utilizamos PostgreSQL 🐘 como nuestra base de datos para garantizar la integridad y escalabilidad.
- **Frameworks y bibliotecas:**
    * **Spring Boot 🌱:** Permite un desarrollo rápido y eficiente, configurando automáticamente las dependencias y facilitando la creación de servicios robustos.
    * **Spring Web 🌐:** Proporciona las herramientas necesarias para construir APIs RESTful que manejan las solicitudes HTTP de manera fluida y segura.
    * **Spring Security 🔐** Asegura que nuestro sitio web esté protegido, gestionando la autenticación y la autorización de los usuarios de forma segura.
    * **JWT 🔑:** Utilizamos JSON Web Tokens para crear un sistema de autenticación ligero y eficiente, permitiendo una comunicación segura entre el cliente y el servidor.
---
### Frontend
El frontend está diseñado para ser intuitivo y visualmente atractivo, utilizando tecnologías web estándar.
- **Frameworks y bibliotecas:**
    * **React 🍃:** Nos permite construir una interfaz de usuario dinámica y reactiva, dividiendo el diseño en componentes reutilizables que mejoran la eficiencia del desarrollo.
    * **Node.js 🟩:** Se utiliza para ejecutar nuestro entorno de desarrollo y gestión de paquetes.
    * **TailwindCSS 💎** Facilita la creación de diseños modernos y responsivos con un enfoque de utilidad-first.
    * **Google Fonts 🔔:** Ofrece una amplia variedad de fuentes para mejorar la tipografía y el estilo del sitio.
    * **HTML5 🌐 y CSS3 🎨:** Son la base de nuestra estructura y diseño.
    * **JavaScript ⚡:** Proporciona interactividad y funcionalidad a la interfaz.
---
## 🏗️ Patrones de diseño
La adopción de patrones de diseño nos permite mantener un código limpio, modular y fácil de mantener, lo que es esencial para el crecimiento del proyecto.
- **DAO (Data Access Object) 📂:** Este patrón nos ayuda a abstraer la lógica de acceso a la base de datos, separando las operaciones de datos del resto de la aplicación para una mayor modularidad.
- **SOLID ⚖️:** Seguimos los principios de diseño SOLID para crear un software flexible y robusto.
- **MVC (Model-View-Controller) 🧩:** Se implementa para separar la lógica de negocio, la presentación y la entrada de datos, lo que facilita el desarrollo y el mantenimiento.
- **DDD (Domain-Driven Design) 🏗️:** Adoptamos este enfoque para alinear el diseño del software con el modelo de negocio del dominio.
---
## 💾 Modelo de Datos
La entidad venta es el centro de las transacciones, registrando cada compra realizada.
<table>
    <tr>
        <th>Campo</th>
        <th>Tipo</th>
        <th>Descripción</th>
    </tr>
    <tr>
        <td>id</td>
        <td>INT</td>
        <td>Identificador único de la venta</td>
    </tr>
    <tr>
        <td>IdVenta</td>
        <td>INT</td>
        <td>Identificador único de la venta</td>
    </tr>
    <tr>
        <td>CodVenta</td>
        <td>VARCHAR</td>
        <td>Código único asignado a la venta</td>
    </tr>
    <tr>
        <td>TipoComprobante</td>
        <td>VARCHAR</td>
        <td>Tipo de documento emitido</td>
    </tr>
    <tr>
        <td>FechaEmission</td>
        <td>DATE</td>
        <td>Fecha y hora en que se emitió el comprobante</td>
    </tr>
    <tr>
        <td>id</td>
        <td>INT</td>
        <td>Identificador único de la venta</td>
    </tr>
    <tr>
        <td>CantidadProductos</td>
        <td>INT</td>
        <td>Cantidad total de productos en la venta</td>
    </tr>
    <tr>
        <td>Total</td>
        <td>NUMERIC(10, 2)</td>
        <td>Monto total de la venta</td>
    </tr>
    <tr>
        <td>FormaPago</td>
        <td>VARCHAR</td>
        <td>Método de pago utilizado</td>
    </tr>
    <tr>
        <td>IdCaja</td>
        <td>INT</td>
        <td>Relación con la tabla caja</td>
    </tr>
    <tr>
        <td>IdEmpleado</td>
        <td>INT</td>
        <td>Relación con la tabla empleado</td>
    </tr>
    <tr>
        <td>IdCliente</td>
        <td>INT</td>
        <td>Relación con la tabla cliente</td>
    </tr>
</table>

---
## 🤝 Colaboración
Nuestro proceso de desarrollo se basa en la colaboración activa y la mejora continua.
- **Metodología de trabajo:** Utilizamos PMBOK para guiar nuestro proyecto, lo que nos permite una gestión organizada y estructurada.
- **Revisión de código:** Realizamos revisiones de código constantes para asegurar la calidad, la consistencia y para compartir conocimientos entre los miembros del equipo.

Figma
https://www.figma.com/design/XLiFkipsaDOK6vd8Rw6YTO?node-id=0-1

GitHub
https://github.com/YasinRomero/CC-SS-PettiteCoffee
