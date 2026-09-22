import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import CreateStudentForm from "@/components/CreateStudentForm";

export default function CreateStudent() {
  return (
    <>
      <NavbarAdmin />
      <BootstrapClient />

      <div className="container mt-5">
        <h1 className="mb-4">เพิ่มข้อมูลนักศึกษา</h1>
        <CreateStudentForm />
      </div>
    </>
  );
}