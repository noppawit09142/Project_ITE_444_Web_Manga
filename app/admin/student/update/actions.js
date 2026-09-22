"use server";

import db from "@/lib/db";
import { redirect } from "next/navigation";

export async function updateStudent(prevState, formData) {
  const id = formData.get("id");
  const student_code = formData.get("student_code")?.trim() || "";
  const student_name = formData.get("student_name")?.trim() || "";
  const student_major = formData.get("student_major")?.trim() || "";

  const errors = [];

  // ตรวจรหัสนักศึกษา
  if (!student_code || student_code.length < 8) {
    errors.push("รหัสนักศึกษาต้องมีอย่างน้อย 8 ตัวอักษร");
  }

  // ตรวจชื่อ-นามสกุล
  if (!student_name || student_name.length < 3) {
    errors.push("ชื่อ-นามสกุลต้องมีอย่างน้อย 3 ตัวอักษร");
  }

  // ตรวจสาขาวิชา
  if (!student_major || student_major.length < 3) {
    errors.push("ชื่อสาขาวิชาต้องมีอย่างน้อย 3 ตัวอักษร");
  }

  // ถ้ามี Error ส่งกลับไปหน้า Form พร้อมค่าเดิม
  if (errors.length > 0) {
    return {
      errors,
      values: {
        id,
        student_code,
        student_name,
        student_major,
      },
    };
  }

  // ผ่าน Validation อัปเดตลงฐานข้อมูล
  await db.query(
    `UPDATE student
     SET student_code = ?,
         student_name = ?,
         student_major = ?
     WHERE id = ?`,
    [student_code, student_name, student_major, id]
  );

  // Redirect กลับไปหน้าหลักของ student
  redirect("/admin/student?success=update");
}