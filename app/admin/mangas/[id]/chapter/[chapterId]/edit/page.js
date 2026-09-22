"use client";

import { useFormState } from "react-dom";
import { updateChapterAction } from "@/app/admin/mangas/chapterActions";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function EditChapterPage({ params }) {
  // สำหรับ Next.js 14 ดึงค่าจาก params ตรงๆ ได้เลยครับ
  const mangaId = Number(params.id);
  const chapterId = Number(params.chapterId);

  const [state, formAction] = useFormState(updateChapterAction, null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State สำหรับเก็บข้อมูลตอนและรูปภาพเดิม
  const [chapterData, setChapterData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ดึงข้อมูลตอนเดิมพร้อมรายการรูปภาพ
  useEffect(() => {
    async function fetchChapter() {
      try {
        const res = await fetch(`/api/chapter/${chapterId}`);
        if (res.ok) {
          const data = await res.json();
          setChapterData(data);
        }
      } catch (err) {
        console.error("Error fetching chapter:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (chapterId) {
      fetchChapter();
    }
  }, [chapterId]);

  useEffect(() => {
    if (state?.error) {
      setIsSubmitting(false);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: state.error,
      });
    } else if (state?.success) {
      Swal.fire({
        icon: "success",
        title: "อัปเดตข้อมูลสำเร็จ!",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = `/admin/mangas/${mangaId}/chapter`;
      });
    }
  }, [state, mangaId]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    Swal.fire({
      title: "กำลังบันทึกข้อมูล...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
  };

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">กำลังโหลดข้อมูลตอน...</p>
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ maxWidth: "800px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>แก้ไขตอน (Chapter ID: {chapterId})</h3>
        <Link href={`/admin/mangas/${mangaId}/chapter`} className="btn btn-outline-secondary">
          ย้อนกลับ
        </Link>
      </div>

      <form action={formAction} onSubmit={handleSubmit} className="card p-4 shadow-sm" encType="multipart/form-data">
        <input type="hidden" name="chapter_id" value={chapterId} />
        <input type="hidden" name="manga_id" value={mangaId} />

        {/* ตอนที่ */}
        <div className="mb-3">
          <label className="form-label fw-bold">ตอนที่ (Chapter Number) *</label>
          <input
            type="number"
            step="0.1"
            name="chapter_number"
            defaultValue={chapterData?.chapter_number || ""}
            className="form-control"
            required
          />
        </div>

        {/* ชื่อตอน */}
        <div className="mb-3">
          <label className="form-label fw-bold">ชื่อตอน (Title)</label>
          <input
            type="text"
            name="title"
            defaultValue={chapterData?.title || ""}
            className="form-control"
          />
        </div>

        {/* แสดงรูปภาพเดิมที่มีอยู่ */}
        <div className="mb-4">
          <label className="form-label fw-bold">รูปภาพปัจจุบัน ({chapterData?.pages?.length || 0} หน้า)</label>
          <div
            className="p-3 border rounded bg-light d-flex flex-wrap gap-2"
            style={{ maxHeight: "300px", overflowY: "auto" }}
          >
            {!chapterData?.pages || chapterData.pages.length === 0 ? (
              <p className="text-muted mb-0">ไม่มีรูปภาพในตอนนี้</p>
            ) : (
              chapterData.pages.map((page) => (
                <div key={page.id} className="position-relative text-center" style={{ width: "90px" }}>
                  <img
                    src={page.image_url}
                    alt={`หน้า ${page.page_number}`}
                    className="img-thumbnail"
                    style={{ width: "90px", height: "120px", objectFit: "cover" }}
                  />
                  <span className="badge bg-dark position-absolute bottom-0 start-50 translate-middle-x mb-1 opacity-75">
                    หน้า {page.page_number}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* อัปโหลดรูปภาพใหม่ */}
        <div className="mb-4">
          <label className="form-label fw-bold text-primary">อัปโหลดรูปภาพใหม่แทนที่ของเดิม (ถ้ามี)</label>
          <input type="file" name="images" className="form-control" accept="image/*" multiple />
          <small className="text-muted d-block mt-1">
            * หากอัปโหลดรูปใหม่ ระบบจะลบรูปภาพเดิมทั้งหมดของตอนนี้และใช้อยู่ชุดใหม่แทน หากไม่ต้องการเปลี่ยน ให้เว้นว่างไว้
          </small>
        </div>

        <button type="submit" disabled={isSubmitting} className="btn btn-warning btn-lg w-100 fw-bold">
          {isSubmitting ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
        </button>
      </form>
    </div>
  );
}