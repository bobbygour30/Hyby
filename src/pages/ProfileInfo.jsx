import React, { useState, useRef } from "react";
import { Edit2, Trash2 } from "lucide-react";

const ProfileInfo = () => {
  const [profileImage, setProfileImage] = useState(
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-31%20at%202.17.00%20PM-SCHDLq8y6ZQvNPJyzWNGE69ppzQhGP.jpeg"
  );
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState({});
/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Handles the form submission.
   * @param {React.FormEvent<HTMLFormElement>} e
   * @returns {Promise<void>}
   */
/******  e2e08727-8d88-4ead-a33a-9d8554e560bb  *******/  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setProfileImage("");
  };

  const toggleEditMode = (field) => {
    setEditMode(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(Object.fromEntries(formData.entries()));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setEditMode({}); // Exit edit mode after submission
    }
  };

  const handleCancel = () => {
    // Reset form values here if needed
    setEditMode({});
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6">
        <h1 className="text-center text-2xl font-semibold text-yellow-500 mb-8">
          Your Profile
        </h1>

        <div className="bg-gradient-to-b from-purple-100 via-white to-purple-200 rounded-lg shadow-lg">
          <form onSubmit={onSubmit}>
            <div className="p-4 sm:p-6">
              <h2 className="text-lg font-medium mb-6">Basic Info</h2>

              <div className="relative w-32 h-32 mx-auto mb-8 group">
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-yellow-500">
                  <img
                    src={profileImage || "/placeholder.svg"}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -right-2 top-0 flex flex-col gap-2 sm:-right-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="rounded-full bg-yellow-500 text-white hover:bg-yellow-600 p-2 transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteImage}
                    className="rounded-full bg-yellow-500 text-white hover:bg-yellow-600 p-2 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                />
              </div>

              <div className="space-y-4">
                {[
                  { id: 'fullName', label: 'Full Name', defaultValue: 'Jasmin Bhandari' },
                  { id: 'username', label: 'Username', defaultValue: 'Jas1234bh12' },
                  { id: 'phone', label: 'Mobile Number', type: 'tel', defaultValue: '+91 80 766 12345' },
                  { id: 'email', label: 'Your Email', type: 'email', defaultValue: 'Jasmine.98@Gmail.Com' },
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block mb-2 font-medium">
                      {field.label}
                    </label>
                    <div className="relative">
                      <input
                        id={field.id}
                        name={field.id}
                        type={field.type || 'text'}
                        defaultValue={field.defaultValue}
                        className="w-full p-2 border rounded-lg pr-10 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                        readOnly={!editMode[field.id]}
                      />
                      <button
                        type="button"
                        onClick={() => toggleEditMode(field.id)}
                        className="absolute right-3 top-2.5 text-green-500 hover:text-green-600"
                      >
                        {editMode[field.id] ? (
                          <span className="text-sm">Save</span>
                        ) : (
                          <Edit2 className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}

                <div className="pt-4">
                  <h2 className="text-lg font-medium mb-4">Social Media</h2>
                  <div className="space-y-4">
                    {[
                      { 
                        id: 'instagram', 
                        label: 'Instagram Username', 
                        icon: 'instagram', 
                        defaultValue: 'Jasmine_bhandari_4567' 
                      },
                      { 
                        id: 'youtube', 
                        label: 'YouTube Link', 
                        icon: 'youtube', 
                        defaultValue: 'www.youtube.com/@jasmine123bhand...' 
                      },
                      { 
                        id: 'facebook', 
                        label: 'Facebook Link', 
                        icon: 'facebook', 
                        defaultValue: 'www.facebook.com/@jasmine25f45bb...' 
                      },
                    ].map((social) => (
                      <div key={social.id}>
                        <label htmlFor={social.id} className="flex items-center gap-2 mb-2 font-medium">
                          {/* Social media icons here */}
                          {social.label}
                        </label>
                        <div className="relative">
                          <input
                            id={social.id}
                            name={social.id}
                            defaultValue={social.defaultValue}
                            className="w-full p-2 border rounded-lg pr-10 focus:ring-2 focus:ring-yellow-500"
                          />
                          <button
                            type="button"
                            onClick={() => toggleEditMode(social.id)}
                            className="absolute right-3 top-2.5 text-green-500 hover:text-green-600"
                          >
                            {editMode[social.id] ? (
                              <span className="text-sm">Save</span>
                            ) : (
                              <Edit2 className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6 bg-gray-50 rounded-b-lg">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition-colors"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;