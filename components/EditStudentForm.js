"use client";

import { useActionState } from "react";
// แก้ไขบรรทัดนี้: เปลี่ยนจาก /students/ เป็น /student/
import { updateStudent } from "@/app/admin/student/update/actions";

export default function EditStudentForm({ student }) {
  const [state, formAction] = useActionState(updateStudent, null);

  return (
    <form action={formAction} className="mb-3">
      <input
        type="hidden"
        name="id"
        value={state?.values?.id || student.id}
      />

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
          defaultValue={state?.values?.student_code || student.student_code}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">ชื่อ-นามสกุล</label>
        <input
          type="text"
          className="form-control"
          name="student_name"
          defaultValue={state?.values?.student_name || student.student_name}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">สาขาวิชา</label>
        <input
          type="text"
          className="form-control"
          name="student_major"
          defaultValue={state?.values?.student_major || student.student_major}
          required
        />
      </div>

      <button type="submit" className="btn btn-warning">
        อัปเดตข้อมูลนักศึกษา
      </button>
    </form>
  );
}