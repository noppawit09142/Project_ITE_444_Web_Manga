import db from "@/lib/db";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import BootstrapClient from "@/components/BootstrapClient";



export default async function ProductDetail({ params }) {

    const { id } = await params;

    const [products] = await db.query(
        "SELECT * FROM products WHERE id = ?",
        [id]
    );

    const product = products[0];

    if (!product) {
        return (
            <div className="container mt-5">
                <h1>ไม่พบสินค้า</h1>
            </div>
        );
    }

    return (
        <>
         <Navbar />
        
        <BootstrapClient />
     
        
        <div className="container mt-5">

            <div className="row">

                <div className="col-md-6">

                    <img
                        src={product.img_url}
                        className="img-fluid"
                        alt={product.name}
                    />

                </div>

                <div className="col-md-6">

                    <h1>{product.name}</h1>

                    <h3 className="mt-3">
                        ราคา {Number(product.price).toLocaleString()} บาท
                    </h3>

                    <p className="mt-3">
                        {product.description}
                    </p>

                    <Link
                        href="/"
                        className="btn btn-secondary mt-3"
                    >
                        กลับหน้าสินค้า
                    </Link>

                </div>

            </div>

        </div>
            
    </>
    );
}

