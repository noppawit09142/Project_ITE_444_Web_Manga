import prisma from "@/lib/prisma";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function CreateMangaForm() {
  // Server Action สำหรับสร้างมังงะ
  async function createManga(formData) {
    "use server";

    const title = formData.get("title");
    const author = formData.get("author");
    const cover_url = formData.get("cover_url");
    const description = formData.get("description");
    const status = formData.get("status");

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
      return;
    }

    revalidatePath("/admin/mangas");
    redirect("/admin/mangas");
  }

  return (
    <form action={createManga} className="card p-4 shadow-sm">
      <div className="mb-3">
        <label className="form-label fw-bold">ชื่อเรื่อง (Title)</label>
        <input
          type="text"
          name="title"
          className="form-control"
          placeholder="เช่น One Piece, Naruto"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">ผู้แต่ง (Author)</label>
        <input
          type="text"
          name="author"
          className="form-control"
          placeholder="เช่น Eiichiro Oda"
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">URL รูปปก (Cover URL)</label>
        <input
          type="text"
          name="cover_url"
          className="form-control"
          placeholder="https://..."
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">สถานะ (Status)</label>
        <select name="status" className="form-select" defaultValue="ongoing">
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
          placeholder="ใส่เรื่องย่อสั้นๆ..."
        ></textarea>
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          บันทึกข้อมูล
        </button>
        <Link href="/admin/mangas" className="btn btn-secondary">
          ยกเลิก
        </Link>
      </div>
    </form>
  );
}