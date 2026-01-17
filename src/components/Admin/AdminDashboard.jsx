import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaUserEdit, FaCamera } from 'react-icons/fa';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [profile, setProfile] = useState({ full_name: '', avatar_url: '' });
  const [savingProfile, setSavingProfile] = useState(false);
  const [newAvatarFile, setNewAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
    fetchProfile();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('id', { ascending: false });
    if (data) setProjects(data);
  };

  const fetchProfile = async () => {
    const { data } = await supabase.from('profile').select('*').single();
    if (data) setProfile(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await supabase.from('projects').delete().eq('id', id);
      fetchProjects(); // Refresh list
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAvatarFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSavingProfile(true);

    try {
      let avatarUrl = profile.avatar_url;

      if (newAvatarFile) {
        // 1. Upload new image
        const fileExt = newAvatarFile.name.split('.').pop();
        const fileName = `profile-avatar-${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('project-images') // Reusing existing bucket
          .upload(fileName, newAvatarFile);
        
        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('project-images')
          .getPublicUrl(fileName);
        
        const newAvatarUrl = publicUrlData.publicUrl;

        // 2. Delete old image if exists and it's different
        if (profile.avatar_url) {
          const oldUrl = profile.avatar_url;
          // Attempt to extract the path. Standard Supabase URL format:
          // .../storage/v1/object/public/bucket-name/filename.ext
          const pathPart = oldUrl.split('/project-images/')[1];
          if (pathPart) {
            await supabase.storage.from('project-images').remove([pathPart]);
          }
        }
        
        avatarUrl = newAvatarUrl;
      }

      // 3. Update DB
      const { error: updateError } = await supabase.from('profile').upsert({
        id: 1,
        full_name: profile.full_name,
        avatar_url: avatarUrl
      });

      if (updateError) throw updateError;
      
      alert('Profile updated successfully!');
      setNewAvatarFile(null);
      setPreviewUrl(null);
      fetchProfile();

    } catch (error) {
      alert('Error updating profile: ' + error.message);
    } finally {
      setSavingProfile(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-blue-500">Admin Dashboard</h1>
          <button 
            onClick={() => { logout(); navigate('/login'); }}
            className="flex items-center gap-2 px-4 py-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition-all"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* Profile Settings Section */}
        <div className="mb-12 glass p-8 rounded-2xl border border-white/10 bg-white/5 animate-[hologram-open_0.8s_ease-out]">
          <div className="flex items-center gap-3 mb-6">
            <FaUserEdit className="text-2xl text-blue-400" />
            <h2 className="text-2xl font-bold">Profile Settings</h2>
          </div>
          
          <form onSubmit={handleProfileSave} className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar Input */}
            <div className="relative group cursor-pointer">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-blue-500 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-300 bg-gray-900">
                {(previewUrl || profile.avatar_url) ? (
                  <img 
                    src={previewUrl || profile.avatar_url} 
                    alt="Profile" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">No Image</div>
                )}
              </div>
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
                <FaCamera className="text-white text-xl" />
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            </div>

            {/* Name Input */}
            <div className="flex-1 w-full space-y-4">
              <div>
                <label className="block text-sm font-mono text-gray-400 mb-2">Display Name</label>
                <input 
                  type="text" 
                  value={profile.full_name} 
                  onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:border-blue-500 outline-none text-xl font-bold"
                  placeholder="e.g. Yusuf Ramadani"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={savingProfile}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all disabled:opacity-50"
              >
                {savingProfile ? 'Saving...' : 'Update Profile'}
              </button>
            </div>
          </form>
        </div>

        {/* Projects Section */}
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Projects Manager</h2>
          <button 
            onClick={() => navigate('/admin/project/new')}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold transition-all"
          >
            <FaPlus /> Add New
          </button>
        </div>

        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-all">
              <div className="flex items-center gap-4">
                <img src={project.image} alt={project.title} className="w-16 h-16 object-cover rounded-lg bg-gray-800" />
                <div>
                  <h3 className="font-bold text-lg">{project.title}</h3>
                  <p className="text-sm text-gray-400">{project.category}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => navigate(`/admin/project/edit/${project.id}`)}
                  className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                  title="Edit"
                >
                  <FaEdit size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(project.id)}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                  title="Delete"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="text-center text-gray-500 py-10">No projects found. Create one!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;