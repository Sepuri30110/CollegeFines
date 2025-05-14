import { Link, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaPlus,
  FaFileInvoiceDollar,
  FaUsers,
  FaSignOutAlt,
  FaRupeeSign,
  FaHourglassHalf,
  FaListOl
} from "react-icons/fa";
import { useEffect, useState } from 'react';
import axios from 'axios';

function Admin() {

  const navigate = useNavigate()
  const [details, setDetails] = useState({
    total_collected: 0,
    total_pending: 0,
    total_fines: 0,
    total_batches: 0,
    batches: []
  })
  const [analysis, setAnalysis] = useState({
    total_collected: "0.00",
    total_pending: "0",
    total_fines: "0",
    total_batches: "0",
    batches: []
  })

  useEffect(() => {
    async function func() {
      let d = new Date().toISOString()
      let curr_batch = Number(d.toString().substring(2, 4))
      let batches = [];
      for (let i = 5; i >= 0; i--) {
        batches.push({
          batch: curr_batch - i,
          total_fines: 0,
          total_amount: "0.00"
        });
      }
      setDetails(prev => ({
        ...prev,
        batches: batches
      }))
      setAnalysis(prev=>({
        ...prev,
        batches: batches
      }))
    }
    func()
  }, [])

  useEffect(() => {
    if (!details.batches || details.batches.length === 0) return;

    const fetchAnalysis = async () => {
      try {
        console.log(details)
        const res = await axios.post("http://localhost:4000/admin/getAnalysis", { details });
        setDetails(res.data)
      } catch (err) {
        console.log(err);
      }
    };

    fetchAnalysis();
    // eslint-disable-next-line
  }, [analysis.batches]);

  return (
    <div className="bg-gray-50 h-screen">
      <main className="flex h-screen">
        <aside className="bg-blue-600 text-white shadow-md w-64 py-4 px-4">
          <div className="text-2xl font-semibold mb-8">Admin Menu</div>
          <nav>
            <Link className="block py-2 px-2 hover:bg-blue-800 rounded bg-blue-700 font-semibold">
              <FaHome className="mr-2 w-6 inline-block text-center" /> Home
            </Link>
            <Link to="NewFineEntry/" className="block py-2 px-2 hover:bg-blue-800 rounded">
              <FaPlus className="mr-2 w-6 inline-block text-center" /> New Fine Entry
            </Link>
            <Link to="ViewFines/" className="block py-2 px-2 hover:bg-blue-800 rounded">
              <FaFileInvoiceDollar className="mr-2 w-6 inline-block text-center" /> View Fines
            </Link>
            <p onClick={() => { navigate("/") }} className="block mt-4 py-2 px-2 hover:bg-blue-800 rounded cursor-pointer">
              <FaSignOutAlt className="mr-2 w-6 inline-block text-center" /> Logout
            </p>
          </nav>
        </aside>

        <div className="flex-1 flex flex-col overflow-auto">
          <header className="bg-white py-4 px-6 shadow-md sticky top-0">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              <FaHome className="mr-2 inline-block" /> Home
            </h2>
          </header>

          <div className="flex-1 overflow-auto bg-gray-50 py-4 px-6 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <FaRupeeSign className="fa-2x text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Collected</p>
                  <p className="text-2xl font-bold text-gray-800">₹ {details.total_collected}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <FaHourglassHalf className="fa-2x text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Pending Fines</p>
                  <p className="text-2xl font-bold text-gray-800">{details.total_pending}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaListOl className="fa-2x text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Fines Issued</p>
                  <p className="text-2xl font-bold text-gray-800">{details.total_fines}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <FaUsers className="fa-2x text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Batches with Fines</p>
                  <p className="text-2xl font-bold text-gray-800">{details.total_batches}</p>
                </div>
              </div>
            </div>

            {/* Batch-wise Fines Table */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Batch-wise Analysis</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Fines</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {details.batches.map((batch, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">20{batch.batch}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{batch.total_fines}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹ {batch.total_amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default Admin;