import prisma from "@/lib/prisma";
 
export default async function PrismaTest() {
 
    const students =
        await prisma.student.findMany();
 
    return (
        <div className="container mt-5">
 
            <h1>Prisma Test</h1>
 
            {students.map((student) => (
 
                <p key={student.id}>
                    {student.student_name}
                </p>
 
            ))}
 
        </div>
    );
}