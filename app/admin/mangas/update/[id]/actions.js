"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateManga(prevState, formData) {
  const id = Number(formData.get("id"));

  const title = formData.get("title")?.trim() || "";
  const author = formData.get("author")?.trim() || "";
  const cover_url = formData.get("cover_url")?.trim() || "";
  const description = formData.get("description")?.trim() || "";
  const status = formData.get("status") || "ongoing";

  const errors = [];

  // 1. ตรวจ ID มังงะ
  if (!id || Number.isNaN(id)) {
    errors.push("ไม่พบ ID มังงะที่ต้องการแก้ไข");
  }

  // 2. ตรวจชื่อเรื่อง
  if (!title || title.length < 2) {
    errors.push("ชื่อเรื่องต้องมีอย่างน้อย 2 ตัวอักษร");
  }

  // 3. ตรวจ URL รูปปก
  if (!cover_url || !cover_url.startsWith("http")) {
    errors.push("URL รูปปกต้องขึ้นต้นด้วย http หรือ https");
  }

  // 4. ตรวจเรื่องย่อ
  if (!description || description.length < 5) {
    errors.push("เรื่องย่อต้องมีอย่างน้อย 5 ตัวอักษร");
  }

  // หากมี Error ให้ส่งข้อผิดพลาดและค่าเดิมกลับไปแสดงบนฟอร์ม
  if (errors.length > 0) {
    return {
      errors,
      values: {
        id,
        title,
        author,
        cover_url,
        description,
        status,
      },
    };
  }

  // ทำการ Update ข้อมูลผ่าน Prisma ORM
  try {
    await prisma.mangas.update({
      where: { id },
      data: {
        title,
        author,
        cover_url,
        description,
        status,
      },
    });
  } catch (error) {
    console.error("Error updating manga:", error);
    return {
      errors: ["ไม่สามารถอัปเดตข้อมูลได้ กรุณาลองใหม่อีกครั้ง"],
      values: {
        id,
        title,
        author,
        cover_url,
        description,
        status,
      },
    };
  }

  // เคลียร์ Cache เพื่อให้หน้ารายการดึงข้อมูลใหม่ และ Redirect กลับหน้าแอดมิน
  revalidatePath("/admin/mangas");
  redirect("/admin/mangas?success=update");
}