"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createManga(prevState, formData) {
  const title = formData.get("title")?.trim() || "";
  const author = formData.get("author")?.trim() || "";
  const cover_url = formData.get("cover_url")?.trim() || "";
  const description = formData.get("description")?.trim() || "";
  const status = formData.get("status") || "ongoing";

  const errors = [];

  // 1. ตรวจชื่อเรื่องมังงะ
  if (!title || title.length < 2) {
    errors.push("ชื่อเรื่องต้องมีอย่างน้อย 2 ตัวอักษร");
  }

  // 2. ตรวจ URL รูปปก
  if (!cover_url || !cover_url.startsWith("http")) {
    errors.push("URL รูปปกต้องขึ้นต้นด้วย http หรือ https");
  }

  // 3. ตรวจเรื่องย่อ
  if (!description || description.length < 5) {
    errors.push("เรื่องย่อต้องมีอย่างน้อย 5 ตัวอักษร");
  }

  // หากมี Error ให้ส่งข้อผิดพลาดและค่าที่เคยกรอกกลับไปที่ Client
  if (errors.length > 0) {
    return {
      errors,
      values: {
        title,
        author,
        cover_url,
        description,
        status,
      },
    };
  }

  // บันทึกข้อมูลลงฐานข้อมูลด้วย Prisma ORM
  try {
    await prisma.mangas.create({
      data: {
        title,
        author,
        cover_url,
        description,
        status,
      },
    });
  } catch (error) {
    console.error("Error creating manga:", error);
    return {
      errors: ["เกิดข้อผิดพลาดไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง"],
      values: {
        title,
        author,
        cover_url,
        description,
        status,
      },
    };
  }

  // อัปเดต Cache ของหน้าแอดมิน แล้ว Redirect กลับไป
  revalidatePath("/admin/mangas");
  redirect("/admin/mangas?success=create");
}