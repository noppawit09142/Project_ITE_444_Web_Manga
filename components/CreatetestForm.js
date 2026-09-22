"use client";
import { useActionState } from "react";
import { createTest } from "@/app/admin/tests/create/actions";

const initialState = {
  errors: [],
  values: {
    name: "",
    lastname: ""
  }
};

export default function CreateTestForm() {
  const [
    state,
    formAction,
    pending
  ] = useActionState(
    createTest,
    initialState
  );

  return (
    <form action={formAction} className="card p-4 shadow-sm">
      {/* แสดงรายการ Error ถ้ามี */}
      {state?.errors && state.errors.length > 0 && (
        <div className="alert alert-danger mb-3">
          <ul className="mb-0">
            {state.errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* name */}
      <div className="mb-3">
        <label className="form-label">
          name
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="name"
          defaultValue={
            state?.values?.name || ""
          }
        />
      </div>

      {/* lastname */}
      <div className="mb-3">
        <label className="form-label">
          lastname
        </label>
        <input
          type="text"
          className="form-control"
          name="lastname"
          placeholder="lastname"
          defaultValue={
            state?.values?.lastname || ""
          }
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={pending}
      >
        {pending ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
      </button>
    </form>
  );
}