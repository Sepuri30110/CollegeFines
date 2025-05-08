import { Link } from 'react-router-dom';
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

function Admin() {
  return (
    <div className="bg-gray-50 h-screen">
      <main className="flex h-screen">
        <aside className="bg-blue-600 text-white shadow-md w-64 py-4 px-4">
          <div className="text-2xl font-semibold mb-8">Admin Menu</div>
          <nav>
            <Link to="" className="block py-2 px-2 hover:bg-blue-800 rounded bg-blue-700 font-semibold">
              <FaHome className="mr-2 w-6 inline-block text-center" /> Home
            </Link>
            <Link to="fine" className="block py-2 px-2 hover:bg-blue-800 rounded">
              <FaPlus className="mr-2 w-6 inline-block text-center" /> New Fine Entry
            </Link>
            <Link to="view-fines" className="block py-2 px-2 hover:bg-blue-800 rounded">
              <FaFileInvoiceDollar className="mr-2 w-6 inline-block text-center" /> View Fines
            </Link>
            <Link to="/" className="block mt-4 py-2 px-2 hover:bg-blue-800 rounded">
              <FaSignOutAlt className="mr-2 w-6 inline-block text-center" /> Logout
            </Link>
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
                  <p className="text-2xl font-bold text-gray-800">₹ 0.00</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <FaHourglassHalf className="fa-2x text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Pending Fines</p>
                  <p className="text-2xl font-bold text-gray-800">0</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaListOl className="fa-2x text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Fines Issued</p>
                  <p className="text-2xl font-bold text-gray-800">0</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <FaUsers className="fa-2x text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Batches with Fines</p>
                  <p className="text-2xl font-bold text-gray-800">0</p>
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
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2025</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹ 0.00</td>
                    </tr>
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