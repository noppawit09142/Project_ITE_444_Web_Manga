import prisma from "@/lib/prisma";
import EditTestForm from "@/components/EditTestForm";
import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import { notFound } from "next/navigation";

export default async function UpdatePage({ params }) {
  const { id } = await params;

  const test = await prisma.tbl_test.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!test) {
    notFound();
  }

  return (
    <>
      <NavbarAdmin />
      <BootstrapClient />

      <div className="container mt-4">
        <h2>แก้ไขข้อมูล</h2>
        <EditTestForm test={test} />
      </div>
    </>
  );
}