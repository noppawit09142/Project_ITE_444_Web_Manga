import prisma from "@/lib/prisma";
import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import EditMangaForm from "@/components/EditMangaForm";

export default async function EditMangaPage({ params }) {
  const { id } = await params;

  // ดึงข้อมูลมังงะเดิมผ่าน Prisma ORM
  const manga = await prisma.mangas.findUnique({
    where: {
      id: Number(id),
    },
  });

  // ถ้าไม่พบข้อมูลมังงะ
  if (!manga) {
    return (
      <>
        <NavbarAdmin />
        <BootstrapClient />

        <div className="container mt-5">
          <div className="alert alert-danger text-center shadow-sm">
            <h4>ไม่พบข้อมูลมังงะเรื่องนี้ในระบบ</h4>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavbarAdmin />
      <BootstrapClient />

      <div className="container mt-5" style={{ maxWidth: "700px" }}>
        <h1 className="mb-4">✏️ แก้ไขข้อมูลมังงะ</h1>

        <EditMangaForm manga={manga} />
      </div>
    </>
  );
}