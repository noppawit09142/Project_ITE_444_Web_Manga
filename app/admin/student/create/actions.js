"use server";

import db from "@/lib/db";
import { redirect } from "next/navigation";

export async function createStudent(prevState, formData) {
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

  // ถ้ามี Error ส่งกลับไปหน้า Form
  if (errors.length > 0) {
    return {
      errors,
      values: {
        student_code,
        student_name,
        student_major,
      },
    };
  }

  // ผ่าน Validation บันทึกลงฐานข้อมูล
  await db.query(
    `INSERT INTO student (student_code, student_name, student_major)
     VALUES (?, ?, ?)`,
    [student_code, student_name, student_major]
  );

  
redirect("/admin/student?success=create");
}