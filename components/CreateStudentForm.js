"use client";

import { useActionState } from "react";
// แก้ไขบรรทัดนี้: เปลี่ยนจาก /students/ เป็น /student/
import { createStudent } from "@/app/admin/student/create/actions";

export default function CreateStudentForm() {
  const [state, formAction] = useActionState(createStudent, null);

  return (
    <form action={formAction} className="mb-3">
      {/* แสดงข้อความแจ้งเตือน Error เมื่อมี Validation ไม่ผ่าน */}
      {state?.errors && (
        <div className="alert alert-danger mb-4">
          <ul className="mb-0">
            {state.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">รหัสนักศึกษา</label>
        <input
          type="text"
          className="form-control"
          name="student_code"
          placeholder="เช่น 650000000-0"
          defaultValue={state?.values?.student_code || ""}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">ชื่อ-นามสกุล (ภาษาไทย)</label>
        <input
          type="text"
          className="form-control"
          name="student_name"
          placeholder="สมชาย ใจดี"
          defaultValue={state?.values?.student_name || ""}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">สาขาวิชา</label>
        <input
          type="text"
          className="form-control"
          name="student_major"
          placeholder="วิทยาการคอมพิวเตอร์"
          defaultValue={state?.values?.student_major || ""}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        บันทึกข้อมูลนักศึกษา
      </button>
    </form>
  );
}