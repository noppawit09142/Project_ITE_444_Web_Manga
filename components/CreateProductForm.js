"use client";
 
import { useActionState } from "react";
 
import { createProduct } from "@/app/admin/products/create/actions";
 
 
const initialState = {
 
    errors: [],
 
    values: {
        name: "",
        price: "",
        img_url: "",
        description: "",
        stock: ""
    }
 
};
 
 
export default function CreateProductForm() {
 
    const [
        state,
        formAction,
        pending
    ] = useActionState(
        createProduct,
        initialState
    );
 
 
    return (
 
        <form action={formAction}>
 
 
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
                    รายละเอียดสินค้า
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
 
 
 
            {/* Submit */}
 
            <button
                type="submit"
                className="btn btn-primary"
                disabled={pending}
            >
 
                {
                    pending
                        ? "กำลังบันทึก..."
                        : "บันทึกสินค้า"
                }
 
            </button>
 
 
        </form>
 
    );
}