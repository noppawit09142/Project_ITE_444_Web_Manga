"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateTest(prevState, formData) {
  const id = formData.get("id");
  const name = formData.get("name")?.trim() || "";
  const lastname = formData.get("lastname")?.trim() || "";

  const errors = [];

  if (!name || name.length < 3) {
    errors.push("name ต้องอย่างน้อย 3 ตัวอักษร");
  }
  if (!lastname || lastname.length < 3) {
    errors.push("lastname ต้องอย่างน้อย 3 ตัวอักษร");
  }

  if (errors.length > 0) {
    return { errors, values: { id, name, lastname }, success: false };
  }

  try {
    await prisma.tbl_test.update({
      where: { id: Number(id) },
      data: { name, lastname },
    });

    revalidatePath("/admin/tests");
    return { success: true, errors: [] }; // ส่ง success กลับไปให้ Client
  } catch (error) {
    return {
      errors: ["เกิดข้อผิดพลาดในการบันทึกข้อมูล"],
      values: { id, name, lastname },
      success: false,
    };
  }
}