import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import CreateProductForm from "@/components/CreateProductForm";
 
 
export default function CreateProduct() {
 
    return (
        <>
 
            <NavbarAdmin />
 
            <BootstrapClient />
 
 
            <div className="container mt-5">
 
                <h1 className="mb-4">
                    เพิ่มสินค้า
                </h1>
 
                <CreateProductForm />
 
            </div>
 
        </>
    );
}