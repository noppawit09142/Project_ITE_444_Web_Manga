"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createTest(prevState, formData) {
  const name = formData.get("name")?.trim() || "";
  const lastname = formData.get("lastname")?.trim() || "";

  const errors = [];

  // ตรวจ name
  if (!name || name.length < 3) {
    errors.push("ชื่อต้องมีอย่างน้อย 3 ตัวอักษร");
  }

  // ตรวจ lastname
  if (!lastname || lastname.length < 3) {
    errors.push("นามสกุลต้องมีอย่างน้อย 3 ตัวอักษร");
  }


  if (errors.length > 0) {
    return {
      errors,
      values: {
        name,
        lastname,
      },
    };
  }

  // ผ่าน Validation ทุกข้อแล้วค่อยบันทึกลง Prisma
  await prisma.tbl_test.create({
    data: {
      name,
      lastname,
    },
  });

  redirect("/admin/tests?success=create");
}