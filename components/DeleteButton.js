"use client";

import Swal from "sweetalert2";

export default function DeleteButton() {
  const handleDelete = (e) => {
    e.preventDefault();
    const form = e.target.closest("form");

    Swal.fire({
      title: "ยืนยันการลบ?",
      text: "เมื่อลบแล้วไม่สามารถกู้คืนได้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7c4dff",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "ลบเลย",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        form.requestSubmit();
      }
    });
  };

  return (
    <button
      type="button"
      className="btn btn-danger btn-sm"
      onClick={handleDelete}
    >
      ลบ
    </button>
  );
}