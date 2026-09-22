"use client";

// เปลี่ยนจาก useActionState ใน "react" 
// เป็น useFormState ใน "react-dom"
import { useFormState } from "react-dom";
import Link from "next/link";

export default function EditMangaForm({ manga, updateMangaAction }) {
  // เปลี่ยนชื่อเรียกเป็น useFormState
  const [state, formAction] = useFormState(updateMangaAction, null);

  // ดึงค่าเดิมหรือค่าที่เคยกรอกค้างไว้จาก State
  const values = state?.values || manga;

  return (
    <form action={formAction} className="card p-4 shadow-sm">
      {/* Hidden input สำหรับส่ง ID */}
      <input type="hidden" name="id" value={manga.id} />

      {/* แสดงรายการ Error ถ้ามี */}
      {state?.errors && state.errors.length > 0 && (
        <div className="alert alert-danger mb-4">
          <ul className="mb-0 ps-3">
            {state.errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-3">
        <label className="form-label fw-bold">ชื่อเรื่อง (Title)</label>
        <input
          type="text"
          name="title"
          className="form-control"
          defaultValue={values.title}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">ผู้แต่ง (Author)</label>
        <input
          type="text"
          name="author"
          className="form-control"
          defaultValue={values.author || ""}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">URL รูปปก (Cover URL)</label>
        <input
          type="text"
          name="cover_url"
          className="form-control"
          defaultValue={values.cover_url}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">สถานะ (Status)</label>
        <select
          name="status"
          className="form-select"
          defaultValue={values.status || "ongoing"}
        >
          <option value="ongoing">ยังไม่จบ (Ongoing)</option>
          <option value="completed">จบแล้ว (Completed)</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">เรื่องย่อ (Description)</label>
        <textarea
          name="description"
          className="form-control"
          rows="4"
          defaultValue={values.description || ""}
        ></textarea>
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-warning fw-bold">
          อัปเดตข้อมูล
        </button>
        <Link href="/admin/mangas" className="btn btn-secondary">
          ยกเลิก
        </Link>
      </div>
    </form>
  );
}