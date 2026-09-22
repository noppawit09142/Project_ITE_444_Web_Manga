import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import DeleteButton from "@/components/DeleteButton";
import StudentAlert from "@/components/StudentAlert"; // Import เพิ่มเติม
import db from "@/lib/db";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function StudentList() {
  async function deleteStudent(formData) {
    "use server";
    const id = formData.get("id");
    await db.query("DELETE FROM student WHERE id = ?", [id]);
    revalidatePath("/admin/student");
  }

  const [students] = await db.query(
    "SELECT * FROM student ORDER BY id DESC"
  );

  return (
    <>
      <NavbarAdmin />
      <BootstrapClient />
      <StudentAlert /> {/* ใส่ไว้ที่นี่เพื่อดักเด้ง Alert */}

      <div className="container mt-5">
        <h1 className="mb-4">
          รายการนักศึกษา{" "}
          <Link
            className="btn btn-primary btn-sm"
            href="/admin/student/create"
          >
            + เพิ่มนักศึกษา
          </Link>
        </h1>

        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead>
              <tr>
                <th width="5%" className="text-center">ID</th>
                <th width="20%" className="text-center">รหัสนักศึกษา</th>
                <th width="30%">ชื่อ-นามสกุล</th>
                <th width="30%">สาขาวิชา</th>
                <th width="7%" className="text-center">edit</th>
                <th width="8%" className="text-center">remove</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="text-center">{student.id}</td>
                  <td className="text-center">{student.student_code}</td>
                  <td>{student.student_name}</td>
                  <td>{student.student_major}</td>
                  <td className="text-center">
                    <Link
                      href={`/admin/student/update?id=${student.id}`}
                      className="btn btn-warning btn-sm"
                    >
                      edit
                    </Link>
                  </td>
                  <td className="text-center">
                    <form action={deleteStudent}>
                      <input type="hidden" name="id" value={student.id} />
                      <DeleteButton />
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}