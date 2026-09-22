"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { updateTest } from "@/app/admin/tests/update/[id]/actions";

export default function EditTestForm({ test }) {
  const router = useRouter();

  const initialState = {
    errors: [],
    success: false,
    values: {
      id: test?.id,
      name: test?.name,
      lastname: test?.lastname,
    },
  };

  const [state, formAction, pending] = useActionState(
    updateTest,
    initialState
  );

  // ดักจับเมื่อบันทึกสำเร็จ แล้วเด้ง SweetAlert
  useEffect(() => {
    if (state?.success) {
      Swal.fire({
        title: "สำเร็จ!",
        text: "แก้ไขข้อมูลเรียบร้อยแล้ว",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        router.push("/admin/tests");
      });
    }
  }, [state?.success, router]);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={test?.id || ""} />

      {state?.errors?.length > 0 && (
        <div className="alert alert-danger">
          <ul className="mb-0">
            {state.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* name */}
      <div className="mb-3">
        <label className="form-label">name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="name"
          defaultValue={state?.values?.name ?? test?.name ?? ""}
        />
      </div>

      {/* lastname */}
      <div className="mb-3">
        <label className="form-label">lastname</label>
        <input
          type="text"
          className="form-control"
          name="lastname"
          placeholder="lastname"
          defaultValue={state?.values?.lastname ?? test?.lastname ?? ""}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={pending}
      >
        {pending ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
      </button>
    </form>
  );
}