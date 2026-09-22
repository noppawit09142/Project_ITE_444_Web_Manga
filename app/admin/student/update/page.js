import db from "@/lib/db";
import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import EditStudentForm from "@/components/EditStudentForm";

export default async function EditStudentPage({ searchParams }) {
  // รับ id จาก URL query string (?id=1)
  const { id } = await searchParams;

  const [students] = await db.query(
    "SELECT * FROM student WHERE id = ?",
    [id]
  );

  const student = students?.[0];

  if (!student) {
    return (
      <>
        <NavbarAdmin />
        <BootstrapClient />
        <div className="container mt-5">
          <div className="alert alert-danger">ไม่พบข้อมูลนักศึกษา</div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavbarAdmin />
      <BootstrapClient />

      <div className="container mt-5">
        <h1 className="mb-4">แก้ไขข้อมูลนักศึกษา</h1>
        <EditStudentForm student={student} />
      </div>
    </>
  );
}