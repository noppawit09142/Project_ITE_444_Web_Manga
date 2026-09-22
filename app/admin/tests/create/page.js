import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import CreatetestForm from "@/components/CreatetestForm";

export default function Createtest() {
  return (
    <>
      <NavbarAdmin />
      <BootstrapClient />

      <div className="container mt-5">
        <h1 className="mb-4">เพิ่มข้อมูลทดสอบ</h1>
        <CreatetestForm /> 
      </div>
    </>
  );
}