"use server";
 
import db from "@/lib/db";
import { redirect } from "next/navigation";
 
export async function createProduct(prevState, formData) {
 
    const name = formData.get("name")?.trim() || "";
    const price = formData.get("price") || "";
    const img_url = formData.get("img_url")?.trim() || "";
    const description = formData.get("description")?.trim() || "";
    const stock = formData.get("stock") || "";
 
    const errors = [];
 
    // ตรวจชื่อสินค้า
    if (!name || name.length < 3) {
        errors.push(
            "ชื่อสินค้าต้องมีอย่างน้อย 3 ตัวอักษร"
        );
    }
 
    // ตรวจราคา
    if (
        price === "" ||
        Number.isNaN(Number(price)) ||
        Number(price) < 0
    ) {
        errors.push(
            "ราคาสินค้าต้องเป็นตัวเลขและห้ามติดลบ"
        );
    }
 
    // ตรวจจำนวนสินค้า
    if (
        stock === "" ||
        !Number.isInteger(Number(stock)) ||
        Number(stock) < 0
    ) {
        errors.push(
            "จำนวนสินค้าต้องเป็นจำนวนเต็มและห้ามติดลบ"
        );
    }
 
    // ตรวจ URL รูปภาพ
    if (
        !img_url ||
        !img_url.startsWith("http")
    ) {
        errors.push(
            "URL รูปภาพต้องขึ้นต้นด้วย http หรือ https"
        );
    }
 
    // ตรวจรายละเอียด
    if (
        !description ||
        description.length < 5
    ) {
        errors.push(
            "รายละเอียดสินค้าต้องมีอย่างน้อย 5 ตัวอักษร"
        );
    }
 
    // ถ้ามี Error ส่งกลับไปหน้า Form
    if (errors.length > 0) {
 
        return {
            errors,
 
            values: {
                name,
                price,
                img_url,
                description,
                stock
            }
        };
    }
 
    // ผ่าน Validation ทุกข้อแล้วค่อยบันทึก
    await db.query(
        `INSERT INTO products
        (name, price, img_url, description, stock)
        VALUES (?, ?, ?, ?, ?)`,
        [
            name,
            Number(price),
            img_url,
            description,
            Number(stock)
        ]
    );
 
    redirect(
        "/admin/products?success=create"
    );
}