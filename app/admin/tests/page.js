import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import DeleteButton from "@/components/DeleteButton";
import SuccessAlertTest from "@/components/SuccessAlertTest";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function Home() {
  // ฟังก์ชันลบข้อมูล ปรับชื่อเป็น deleteTest และใช้ Number(id)
  async function deleteTest(formData) {
    "use server";
    const id = formData.get("id");
    await prisma.tbl_test.delete({
      where: {
        id: Number(id),
      },
    });
    revalidatePath("/admin/tests");
  }

  const tests = await prisma.tbl_test.findMany();

  return (
    <>
      <NavbarAdmin />
      <BootstrapClient />
      <SuccessAlertTest />

      <div className="container mt-5">
        <h1 className="mb-4">
          รายการทดสอบ{" "}
          <Link className="btn btn-primary btn-sm" href="/admin/tests/create">
            + ข้อมูล
          </Link>
        </h1>

        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead>
              <tr>
                <th width="10%" className="text-center">
                  ID
                </th>
                <th width="35%">ชื่อ</th>
                <th width="35%">นามสกุล</th>
                <th width="10%" className="text-center">
                  edit
                </th>
                <th width="10%" className="text-center">
                  remove
                </th>
              </tr>
            </thead>
            <tbody>
              {tests.map((item) => (
                <tr key={item.id}>
                  <td className="text-center">{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.lastname}</td>
                  <td className="text-center">
                    <Link
                      href={`/admin/tests/update/${item.id}`}
                      className="btn btn-warning btn-sm"
                    >
                      edit
                    </Link>
                  </td>
                  <td className="text-center">
                    {/* ผูกฟังก์ชัน action={deleteTest} ตรงตามโจทย์ */}
                    <form action={deleteTest}>
                      <input type="hidden" name="id" value={item.id} />
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
