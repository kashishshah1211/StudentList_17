
function StudentCard({ student }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center gap-4">
        <img
          src={student.image}
          alt={`${student.firstName} ${student.lastName}`}
          className="h-16 w-16 rounded-full border border-slate-200 bg-slate-100 object-cover"
          loading="lazy"
        />

        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold text-slate-800">
            {student.firstName} {student.lastName}
          </h3>

          <p className="text-sm text-indigo-600">
            Student ID: {student.id}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 text-sm">
        <p className="break-all">
          <span className="font-semibold text-slate-700">Email: </span>
          <span className="text-slate-500">{student.email}</span>
        </p>

        <p>
          <span className="font-semibold text-slate-700">Age: </span>
          <span className="text-slate-500">{student.age} years</span>
        </p>

        <p>
          <span className="font-semibold text-slate-700">Gender: </span>
          <span className="capitalize text-slate-500">
            {student.gender}
          </span>
        </p>

        <p>
          <span className="font-semibold text-slate-700">University: </span>
          <span className="text-slate-500">
            {student.university || 'Not available'}
          </span>
        </p>
      </div>
    </article>
  )
}

export default StudentCard
