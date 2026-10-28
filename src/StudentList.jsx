
import StudentCard from './StudentCard.jsx'

function StudentList({ students }) {
  if (students.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <h3 className="text-lg font-semibold text-slate-700">
          No students found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Try searching with a different name.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
        />
      ))}
    </div>
  )
}

export default StudentList
