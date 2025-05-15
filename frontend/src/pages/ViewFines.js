import { useState, useEffect } from "react";
import { FaFileInvoiceDollar, FaSearch, FaFilter, FaTimes, FaHome, FaPlus, FaSignOutAlt, } from "react-icons/fa";
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

function ViewFines() {

  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    batch: "",
    due_date: "",
  })

  const [batches, setBatches] = useState([])

  const [studentId, setStudentId] = useState("")

  const [fines, setFines] = useState([])
  const [filteredfines, setFilteredFines] = useState([])
  const [students, setStudents] = useState([])

  const [approve,setApprove] = useState(false)

  useEffect(() => {
    async function fetchData() {

      setBatches([])
      let d = new Date().toISOString()
      let curr_batch = Number(d.toString().substring(2, 4))
      let batches = []
      batches.push("20" + (curr_batch - 5) + " - Batch")
      batches.push("20" + (curr_batch - 4) + " - Batch")
      batches.push("20" + (curr_batch - 3) + " - Batch")
      batches.push("20" + (curr_batch - 2) + " - Batch")
      batches.push("20" + (curr_batch - 1) + " - Batch")
      batches.push("20" + (curr_batch) + " - Batch")
      setBatches(batches)

      try {
        await axios.get("http://localhost:4000/admin/getfines")
          .then((res) => {
            setFines(res.data)
            setFilteredFines(res.data)
          })
          .catch((err) => {
            console.log(err)
          })
        await axios.get("http://localhost:4000/admin/getDetails")
          .then(res => {
            setStudents(res.data)
          })
          .catch(err => {
            console.log(err)
          })
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [approve])

  const handleClear = () => {
    setFilters({
      batch: "",
      due_date: ""
    })
    setFilteredFines(fines)
  }

  const handleFilter = (e) => {
    const { name, value } = e.target
    setFilters({
      ...filters,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let f_fines = fines
    if (filters.due_date) {
      f_fines = f_fines.filter(fine => fine.due_date.toString().split("T")[0] === filters.due_date)
    }
    if (filters.batch) {
      f_fines = f_fines.filter(fine => fine.studentId.substring(0, 2) === filters.batch)
    }
    if (studentId && studentId.trim()) {
      const regex = new RegExp(studentId.trim(), 'i');
      f_fines = f_fines.filter(fine => regex.test(fine.studentId));
    }

    setFilteredFines(f_fines)
  }

  const handleApprove = async (id) => {
    try {
      axios.post('http://localhost:4000/admin/paymentApproval', { id })
        .then((res) => {
          setApprove(!approve)
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex bg-gray-50 h-screen">
      <main className="flex h-screen">
        <aside className="bg-blue-600 text-white shadow-md w-64 py-4 px-4">
          <div className="text-2xl font-semibold mb-8">Admin Menu</div>
          <nav>
            <Link to="/Admin" className="block py-2 px-2 hover:bg-blue-800 rounded">
              <FaHome className="mr-2 w-6 inline-block text-center" /> Home
            </Link>
            <Link to="/Admin/NewFineEntry" className="block py-2 px-2 hover:bg-blue-800 rounded">
              <FaPlus className="mr-2 w-6 inline-block text-center" /> New Fine Entry
            </Link>
            <Link className="block py-2 px-2 hover:bg-blue-800 rounded bg-blue-700 font-semibold">
              <FaFileInvoiceDollar className="mr-2 w-6 inline-block text-center" /> View Fines
            </Link>
            <p onClick={() => { navigate("/") }} className="block mt-4 py-2 px-2 hover:bg-blue-800 rounded cursor-pointer">
              <FaSignOutAlt className="mr-2 w-6 inline-block text-center" /> Logout
            </p>
          </nav>
        </aside>


      </main>
      <div className="flex-1 overflow-auto bg-gray-50 py-4 px-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              <FaFileInvoiceDollar className="inline-block mr-2" />
              View Fines
            </h2>
            <div className="flex items-center space-x-2">
              <form className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    name="student_id"
                    value={studentId}
                    onChange={(e) => { setStudentId(e.target.value) }}
                    placeholder="Search by Student ID"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => { setStudentId("") }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
                >
                  Clear
                </button>
              </form>
            </div>
          </div>

          <form className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
              <div className="filter-group relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Batch</label>
                <select name="batch" value={filters.batch} onChange={(e) => { handleFilter(e) }} className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                  <option value="">All Batches</option>
                  {
                    batches.map((batch, i) => (
                      <option key={i} value={batch.substring(2, 4)}>{batch}</option>
                    ))
                  }
                </select>
              </div>

              <div className="filter-group relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  name="due_date"
                  value={filters.due_date}
                  onChange={(e) => { handleFilter(e) }}
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">&nbsp;</label>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                >
                  <FaFilter className="mr-2" />
                  Apply
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">&nbsp;</label>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center"
                  onClick={handleClear}
                >
                  <FaTimes className="mr-2" />
                  Clear
                </button>
              </div>
            </div>
          </form>

          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Student ID
                  </th>
                  <th className="px-3 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-3 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Fine Details
                  </th>
                  <th className="px-3 py-3 border-b-2 border-gray-200 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-3 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Issued
                  </th>
                  <th className="px-3 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-3 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-3 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {
                  filteredfines.map((fine, index) => (
                    <tr key={index}>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">{fine.studentId}</td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">{students.find(std => std.id === fine.studentId)?.name || "Unknown"}</td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-800">{fine.category}</span>
                          <span className="text-gray-600 text-sm mt-1">{fine.reason}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-right">₹{fine.amount}</td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">{fine.issue_date.toString().split("T")[0]}</td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">{fine.due_date.toString().split("T")[0]}</td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">{fine.txnId}</td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-green-600 font-semibold">
                        {fine.status}
                      </td>
                      <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
                        <button className="text-red-600 hover:text-red-800 text-xs font-bold py-1 px-2 rounded cursor-pointer"
                          disabled={fine.status !== "pending_approval" && fine.txnId}
                          onClick={() => handleApprove(fine.id)}
                        >
                          Approve
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewFines;