import { Link, useNavigate } from 'react-router-dom';
import {
    FaHome,
    FaPlus,
    FaFileInvoiceDollar,
    FaSignOutAlt,
} from "react-icons/fa";
import { useEffect, useState } from 'react';
import axios from 'axios'

function NewFineEntry() {
    const navigate = useNavigate()

    const [std, setStd] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                await axios.get("http://localhost:4000/admin/getDetails")
                    .then((res) => {
                        setStd(res.data)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    const fineCategories = [
        { type: "Select Category...", amt: "0" },
        { type: "Attendance", amt: "400" },
        { type: "No Buss Pass", amt: "500" },
        { type: "Invalid Bus Pass", amt: "5000" },
        { type: "Informal Dressing", amt: "300" },
        { type: "Late(to clg)", amt: "200" },
        { type: "Roaming without ID", amt: "500" },
        { type: "Others", amt: "0" }
    ]

    const [details, setDetails] = useState({
        student_id: "",
        student_email: "",
        fine_category: "",
        amount: "0",
        due_date: "",
        reason: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        let email = ""
        if (name === "student_id") {
            std.forEach((student) => {
                if (student.id === value) {
                    email = student.email
                }
            })
        }
        let amount = "0"
        if (name === "fine_category") {
            amount = fineCategories.find(category => category.type === value).amt;
        }
        if (name === "amount") {
            amount = value
        }
        setDetails({
            ...details,
            [name]: value,
            student_email: email,
            amount: amount
        })
    }

    const handleSubmit = async(e) => {
        
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
                        <Link className="block py-2 px-2 hover:bg-blue-800 rounded bg-blue-700 font-semibold">
                            <FaPlus className="mr-2 w-6 inline-block text-center" /> New Fine Entry
                        </Link>
                        <Link to="/Admin/ViewFines" className="block py-2 px-2 hover:bg-blue-800 rounded">
                            <FaFileInvoiceDollar className="mr-2 w-6 inline-block text-center" /> View Fines
                        </Link>
                        <p onClick={() => { navigate("/") }} className="block mt-4 py-2 px-2 hover:bg-blue-800 rounded">
                            <FaSignOutAlt className="mr-2 w-6 inline-block text-center" /> Logout
                        </p>
                    </nav>
                </aside>


            </main>
            <main className="flex-1 overflow-auto bg-gray-50 py-4 px-6">
                <div className="bg-white shadow rounded-lg p-6 mb-8 max-w-4xl mx-auto">
                    <form id="newFineForm" onSubmit={(e) => handleSubmit(e)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="student_id">Student ID</label>
                                <input
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    id="student_id"
                                    name="student_id"
                                    type="text"
                                    pattern="[0-9]{2}B81A[0-9]{2}[A-Z0-9]{2}"
                                    title="Enter valid Student ID in caps (e.g., 23B81A05H1)"
                                    value={details.student_id}
                                    onChange={(e) => { handleChange(e) }}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="student_email">Student Email</label>
                                <input
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 focus:outline-none sm:text-sm"
                                    id="student_email"
                                    name="student_email"
                                    type="email"
                                    readOnly
                                    tabIndex="-1"
                                    value={details.student_email}
                                    onChange={(e) => { handleChange(e) }}
                                />
                                <p id="student_email_status" className="mt-1 text-sm text-red-600 hidden">Student not found.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fine_category">Fine Category</label>
                                <select
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    id="fine_category"
                                    name="fine_category"
                                    required
                                    value={details.fine_category}
                                    onChange={(e) => { handleChange(e) }}
                                >
                                    {fineCategories.map((category) => (
                                        <option key={category.type} value={category.type}>{category.type}</option>
                                    ))}
                                </select>
                                <p className="mt-1 text-sm text-red-600 hidden" id="fineCategoryError">
                                    Fine category not found or amount mismatch.
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="amount">Fine Amount</label>
                                <input
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    step="1"
                                    min="0"
                                    required
                                    value={details.amount}
                                    onChange={(e) => { handleChange(e) }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="due_date">Due Date</label>
                                <input
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    id="due_date"
                                    name="due_date"
                                    type="date"
                                    required
                                    value={details.due_date}
                                    onChange={(e) => { handleChange(e) }}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="reason">Reason</label>
                                <textarea
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    id="reason"
                                    name="reason"
                                    rows="3"
                                    maxLength="200"
                                    required
                                    value={details.reason}
                                    onChange={(e) => { handleChange(e) }}
                                ></textarea>
                                <p className="text-sm text-gray-500 text-right" id="charCount">
                                    {details.reason.length} / 200 characters
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                type="submit"
                            >
                                Create Fine
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>

    );
}

export default NewFineEntry;