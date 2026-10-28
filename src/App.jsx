
import { useEffect, useState } from 'react'
import StudentList from './StudentList.jsx'

function App() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchStudents() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(
          'https://dummyjson.com/users?limit=30',
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch student records.')
        }

        const data = await response.json()
        setStudents(data.users)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchStudents()

    return () => controller.abort()
  }, [retry])

  const filteredStudents = students.filter((student) => {
    const fullName =
      `${student.firstName} ${student.lastName}`.toLowerCase()

    return (
      fullName.includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase())
    )
  })

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
              Student Portal
            </p>

            <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
              Student List
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              View student records retrieved from an API.
            </p>
          </div>

          <div className="rounded-xl bg-indigo-50 px-5 py-3">
            <p className="text-sm text-indigo-600">Total Students</p>
            <p className="text-2xl font-bold text-indigo-700">
              {students.length}
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <label
            htmlFor="student-search"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Search Students
          </label>

          <input
            id="student-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name or email..."
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        {loading && (
          <div
            role="status"
            className="rounded-xl bg-white p-12 text-center shadow-sm"
          >
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />

            <p className="mt-4 font-medium text-slate-700">
              Loading students...
            </p>
          </div>
        )}

        {!loading && error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-6 text-center"
          >
            <p className="font-semibold text-red-700">
              Unable to load student records
            </p>

            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={() => setRetry((prev) => prev + 1)}
              className="mt-4 rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl font-bold text-slate-800">
                All Students
              </h2>

              <span className="text-sm text-slate-500">
                Showing {filteredStudents.length} of {students.length}
              </span>
            </div>

            <StudentList students={filteredStudents} />
          </>
        )}
      </main>

      <footer className="mt-8 border-t border-slate-200 bg-white px-4 py-5 text-center text-sm text-slate-500">
        Student List Application | React + Tailwind CSS
      </footer>
    </div>
  )
}

export default App
