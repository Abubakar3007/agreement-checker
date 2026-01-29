import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileCheck, Upload, FileText, Trash2, Eye, LogOut } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/Badge';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Modal } from '../components/ui/Modal';
import { supabase } from '../lib/supabase';
import { formatDate } from '../utils/formatters';
import type { Document } from '../types';

export const DashboardPage = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    loadDocuments();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/login');
    }
  };

  const loadDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleDelete = async () => {
    if (!documentToDelete) return;

    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', documentToDelete);

      if (error) throw error;

      setDocuments(documents.filter((doc) => doc.id !== documentToDelete));
      setDeleteModalOpen(false);
      setDocumentToDelete(null);
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const openDeleteModal = (id: string) => {
    setDocumentToDelete(id);
    setDeleteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <FileCheck className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Agreement Checker AI</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/upload">
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New
                </Button>
              </Link>
              <Button variant="ghost" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Documents</h1>
          <p className="text-gray-600">View and manage all your analyzed documents</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : documents.length === 0 ? (
          <Card className="text-center py-12">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No documents yet
            </h2>
            <p className="text-gray-600 mb-6">
              Upload your first document to get started with AI analysis
            </p>
            <Link to="/upload">
              <Button size="lg">
                <Upload className="w-5 h-5 mr-2" />
                Upload Document
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-4">
            {documents.map((doc) => (
              <Card key={doc.id} hover>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {doc.file_name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span>{formatDate(doc.uploaded_at)}</span>
                        <span>{doc.file_type.toUpperCase()}</span>
                        <span>{Math.round(doc.file_size / 1024)} KB</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <StatusBadge status={doc.status} />
                    {doc.status === 'analyzed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/result/${doc.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Result
                      </Button>
                    )}
                    <button
                      onClick={() => openDeleteModal(doc.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Delete document"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Document"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to delete this document? This action cannot be undone.
          </p>
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
