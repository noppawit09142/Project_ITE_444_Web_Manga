"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Swal from "sweetalert2";

export default function StudentAlert() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const success = searchParams.get("success");

  useEffect(() => {
    if (success) {
      const message =
        success === "create"
          ? "เพิ่มข้อมูลนักศึกษาเรียบร้อยแล้ว"
          : "แก้ไขข้อมูลนักศึกษาเรียบร้อยแล้ว";

      Swal.fire({
        title: "สำเร็จ!",
        text: message,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        // ล้าง Query Parameter ออกจาก URL หลังเด้งเตือนเสร็จ
        router.replace(pathname);
      });
    }
  }, [success, router, pathname]);

  return null;
}