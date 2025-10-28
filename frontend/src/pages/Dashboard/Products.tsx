import { Table } from "react-bootstrap";
import useProductsStore from "../../stores/useProductsStore";
import "./CommonDashboard.css";

function Products() {
    const products = useProductsStore((store) => store.products);
    if (!products || products.length === 0) return null;
    const keys = Object.keys(products[0]) as (keyof (typeof products)[0])[];

    return (
        <article className="commons">
            <section className="commons__header"></section>
            <section className="commons__table">
                <Table className="table__content">
                    <thead>
                        <tr>
                            <th>#</th>
                            {keys.map((key) => (
                                <th key={key}>{key.toUpperCase()}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.codproducto}>
                                <td>{index + 1}</td>
                                {keys.map((key) => (
                                    <td key={String(key)}>{String(product[key])}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </section>
            <section className="commons__pagination"></section>
            <section className="commons__actions">
                <div>
                    <button>AGREGAR</button>
                    <button>EDITAR</button>
                    <button>BORRAR SELECCION</button>
                </div>

                <button>ACTUALIZAR</button>
            </section>
        </article>
    );
}

export default Products;
