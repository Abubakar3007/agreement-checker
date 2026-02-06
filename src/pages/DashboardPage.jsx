import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FileCheck, Upload, FileText, Trash2, Eye, LogOut, } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { StatusBadge } from "../components/ui/Badge";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { Modal } from "../components/ui/Modal";
import { formatDate } from "../utils/formatters";
import { useAuth } from "../context/AuthContext";

export const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const navigate = useNavigate();

  const { token, user, logout } = useAuth();

  if (!token) {
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Content */}
      <div className="px-4 py-12 mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-3 mb-8">
          <div>
            <h1 className="mb-2 text-3xl font-bold">My Documents</h1>
            <p className="text-gray-600"> View and manage all your analyzed documents</p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="px-6 font-semibold bg-primary"
          >
            <LogOut className="inline-block w-5 mr-2" />
            <span>Logout</span>
          </Button>
        </div>

        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>

        {/* <Card className="py-12 text-center">
          <FileText className="w-12 h-12 mx-auto mb-4 text-blue-600" />
          <h2 className="mb-6 text-xl font-semibold">No documents yet</h2>
          <Link to="/upload">
            <Button size="lg">
              <Upload className="inline-block w-5 h-5 mr-2" />
              Upload Document
            </Button>
          </Link>
        </Card> */}

        <div className="grid grid-cols-3 gap-4">
          <Card
          // key={doc.id} hover
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold truncate">My file</h3>
                <p className="text-sm text-gray-500">1024kb</p>
              </div>

              <div className="flex items-center gap-3">
                {/* <StatusBadge
                  status={doc.status}
                /> */}

                {/* {doc.status === "analyzed" && ( */}
                <Button
                  size="sm"
                  variant="outline"
                // onClick={() =>
                //   navigate(`/result/${doc.id}`)
                // }
                >
                  <Eye className="inline-block w-4 h-4 mr-2" />
                  View
                </Button>
                {/* )} */}
                <button
                  // onClick={() => openDeleteModal(doc.id)}
                  className="p-2 text-red-600 rounded-lg hover:bg-red-50"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Document"
        size="sm"
      >
        <p className="mb-4">
          Are you sure you want to delete this document?
        </p>
        <div className="flex gap-3">
          <Button fullWidth variant="secondary" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button
            fullWidth
            className="bg-red-600 hover:bg-red-700"
          // onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};