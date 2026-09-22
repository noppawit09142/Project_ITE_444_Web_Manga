import Navbar from "@/components/Navbar";
import BootstrapClient from "@/components/BootstrapClient";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  // ดึงข้อมูลมังงะทั้งหมดผ่าน Prisma ORM
  const mangas = await prisma.mangas.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <>
      <Navbar />
      <BootstrapClient />

      <div className="container mt-5">
        <h1 className="mb-4">รายการมังงะทั้งหมด</h1>

        <div className="row">
          {mangas.length === 0 ? (
            <div className="col-12 text-center py-5">
              <p className="text-muted fs-5">ยังไม่มีรายการมังงะในขณะนี้</p>
            </div>
          ) : (
            mangas.map((manga) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                key={manga.id}
              >
                <div className="card h-100 shadow-sm">
                  <img
                    src={manga.cover_url || "https://via.placeholder.com/300x400?text=No+Cover"}
                    className="card-img-top"
                    alt={manga.title}
                    style={{ height: "320px", objectFit: "cover" }}
                  />

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-truncate">{manga.title}</h5>

                    <p className="card-text text-muted mb-2 small">
                      ผู้แต่ง: {manga.author || "ไม่ระบุ"}
                    </p>

                    <div className="mb-3">
                      <span
                        className={`badge ${
                          manga.status === "completed"
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {manga.status === "completed" ? "จบแล้ว" : "ยังไม่จบ"}
                      </span>
                    </div>

                    <Link
                      href={`/manga/${manga.id}`}
                      className="btn btn-outline-primary mt-auto w-100"
                    >
                      อ่านมังงะ
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}