"use client";
 
import { useActionState } from "react";
import { updateProduct } from "@/app/admin/products/update/[id]/actions";
 
export default function EditProductForm({ product }) {
 
    const initialState = {
 
        errors: [],
 
        values: {
            id: product.id,
            name: product.name,
            price: product.price,
            img_url: product.img_url,
            description: product.description,
            stock: product.stock
        }
 
    };
 
 
    const [
        state,
        formAction,
        pending
    ] = useActionState(
        updateProduct,
        initialState
    );
 
 
    return (
 
        <form action={formAction}>
 
            {/* ส่ง id ไป Server Action */}
            <input
                type="hidden"
                name="id"
                value={product.id}
            />
 
 
            {/* Validation Error */}
            {state?.errors?.length > 0 && (
 
                <div
                    className="alert alert-danger"
                    role="alert"
                >
 
                    <strong>
                        กรุณาตรวจสอบข้อมูล
                    </strong>
 
                    <ul className="mb-0 mt-2">
 
                        {state.errors.map(
                            (error, index) => (
 
                                <li key={index}>
                                    {error}
                                </li>
 
                            )
                        )}
 
                    </ul>
 
                </div>
 
            )}
 
 
            {/* ชื่อสินค้า */}
            <div className="mb-3">
 
                <label className="form-label">
                    ชื่อสินค้า
                </label>
 
                <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="กรอกชื่อสินค้า"
                    defaultValue={
                        state?.values?.name || ""
                    }
                />
 
            </div>
 
 
            {/* ราคา */}
            <div className="mb-3">
 
                <label className="form-label">
                    ราคา
                </label>
 
                <input
                    type="number"
                    className="form-control"
                    name="price"
                    placeholder="กรอกราคาสินค้า"
                    defaultValue={
                        state?.values?.price || ""
                    }
                />
 
            </div>
 
 
            {/* URL รูปภาพ */}
            <div className="mb-3">
 
                <label className="form-label">
                    URL รูปภาพ
                </label>
 
                <input
                    type="text"
                    className="form-control"
                    name="img_url"
                    placeholder="https://example.com/image.jpg"
                    defaultValue={
                        state?.values?.img_url || ""
                    }
                />
 
            </div>
 
 
            {/* รายละเอียด */}
            <div className="mb-3">
 
                <label className="form-label">
                    รายละเอียด
                </label>
 
                <textarea
                    className="form-control"
                    name="description"
                    rows="4"
                    placeholder="กรอกรายละเอียดสินค้า"
                    defaultValue={
                        state?.values?.description || ""
                    }
                ></textarea>
 
            </div>
 
 
            {/* จำนวนสินค้า */}
            <div className="mb-3">
 
                <label className="form-label">
                    QTY
                </label>
 
                <input
                    type="number"
                    className="form-control"
                    name="stock"
                    placeholder="กรอกจำนวนสินค้า"
                    defaultValue={
                        state?.values?.stock || ""
                    }
                />
 
            </div>
 
 
            {/* ปุ่มบันทึก */}
            <button
                type="submit"
                className="btn btn-primary"
                disabled={pending}
            >
 
                {
                    pending
                        ? "กำลังบันทึก..."
                        : "บันทึกการแก้ไข"
                }
 
            </button>
 
        </form>
 
    );
}