import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaCloudUploadAlt } from 'react-icons/fa';

const ProjectForm = () => {
  const { id } = useParams(); // Jika ada ID, berarti mode EDIT
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    tech: '', // Kita input sebagai string dipisah koma
    image: '',
    demo_link: '',
    repo_link: '',
    color: 'from-blue-600/20 to-cyan-600/20'
  });

  useEffect(() => {
    if (id) fetchProject();
  }, [id]);

  const fetchProject = async () => {
    const { data } = await supabase.from('projects').select('*').eq('id', id).single();
    if (data) {
      setFormData({
        ...data,
        tech: data.tech ? data.tech.join(', ') : '' // Convert array ke string untuk input
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('project-images').getPublicUrl(filePath);
      setFormData({ ...formData, image: data.publicUrl });
      
    } catch (error) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const projectData = {
      ...formData,
      tech: formData.tech.split(',').map(t => t.trim()).filter(t => t), // Convert string balik ke array
    };

    try {
      if (id) {
        // Update
        const { error } = await supabase.from('projects').update(projectData).eq('id', id);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase.from('projects').insert([projectData]);
        if (error) throw error;
      }
      navigate('/admin');
    } catch (error) {
      alert('Error saving project: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate('/admin')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <FaArrowLeft /> Back to Dashboard
        </button>

        <h1 className="text-3xl font-black text-blue-500 mb-8">{id ? 'Edit Project' : 'New Project'}</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-mono text-gray-400 mb-2">Title</label>
              <input name="title" value={formData.title} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-blue-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-mono text-gray-400 mb-2">Category</label>
              <input name="category" value={formData.category} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-blue-500 outline-none" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-blue-500 outline-none" required />
          </div>

          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">Tech Stack (comma separated)</label>
            <input name="tech" value={formData.tech} onChange={handleChange} placeholder="React, Node.js, Tailwind" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-blue-500 outline-none" />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">Project Image</label>
            <div className="flex items-center gap-4">
              {formData.image && <img src={formData.image} alt="Preview" className="w-24 h-24 object-cover rounded-lg border border-white/20" />}
              <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all border border-white/10">
                <FaCloudUploadAlt /> {uploading ? 'Uploading...' : 'Upload Image'}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-mono text-gray-400 mb-2">Demo Link</label>
              <input name="demo_link" value={formData.demo_link} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-mono text-gray-400 mb-2">Repo Link</label>
              <input name="repo_link" value={formData.repo_link} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-blue-500 outline-none" />
            </div>
          </div>

          <button type="submit" disabled={loading || uploading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 mt-8">
            {loading ? 'Saving...' : 'Save Project'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
