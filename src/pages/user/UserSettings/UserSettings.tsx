import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useUserDetailsMutation } from '../../../hooks/useUserDetails';
import { UserProfileFormValues } from '../../../types/users';
import { IoCameraOutline } from "react-icons/io5";

const UserSettings: React.FC = () => {
    const { getUserDetials, updateUserProfile } = useUserDetailsMutation();
    const { data: userDetails } = getUserDetials;
    const user = userDetails?.data?.userDetail;

    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);

    // console.log("userDetails", userDetails)

    const formik = useFormik<UserProfileFormValues>({
        initialValues: {
            fullName: user?.fullName || '',
            secondName: user?.secondName || '',
            email: user?.email || '',
            avatar: null,
            coverPhoto: null,
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('fullName', values.fullName);
            formData.append('secondName', values.secondName || '');
            formData.append('email', values.email);
            if (values.avatar instanceof File) {
                formData.append('avatar', values.avatar);
                // console.log('Submitting avatar:', values.avatar.name);
            }
            if (values.coverPhoto instanceof File) {
                formData.append('coverPhoto', values.coverPhoto);
            }
            updateUserProfile.mutate(formData)
        },
    });

const MAX_FILE_SIZE = 5 * 1024 * 1024; 
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
  const file = e.target.files?.[0];
  if (file) {
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      alert('Only JPEG, PNG, or GIF files are allowed.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert('File size exceeds 5MB.');
      return;
    }
    formik.setFieldValue(field, file);
  }
};

    useEffect(() => {
  
        if (formik.values.avatar instanceof File) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(formik.values.avatar);
        } else {
            setAvatarPreview(user?.avatar || null);
        }
    }, [formik.values.avatar, user?.avatar]);

    useEffect(() => {
        if (formik.values.coverPhoto instanceof File) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverPreview(reader.result as string);
            };
            reader.readAsDataURL(formik.values.coverPhoto);
        } else {
            setCoverPreview(user?.coverPhoto || null);
        }
    }, [formik.values.coverPhoto, user?.coverPhoto]);

    return (
        <div className="text-white min-h-screen py-10 px-4 bg-[#191919]">
            <div className="max-w-4xl mx-auto relative">
                {/* Cover Image */}
                <div className="relative h-52 w-full rounded-lg overflow-hidden">
                    <img
                        src={
                            coverPreview ||
                            'https://images.unsplash.com/photo-1568952433726-3896e3881c65?q=80&w=2070&auto=format&fit=crop'
                        }
                        alt="cover"
                        className="w-full h-full object-cover"
                    />
                    <input
                        id="cover-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, 'coverPhoto')}
                    />
                    <label htmlFor="cover-upload" className="cursor-pointer">
                        <span className="absolute bottom-3 right-4 bg-[#2d2d2dd2] text-white text-sm px-3 py-1 rounded hover:bg-[#3a3a3a] inline-block">
                            Change cover
                        </span>
                    </label>
                </div>

                {/* Profile image */}
                <div className="absolute top-[150px] sm:top-[160px] left-1/2 sm:left-10 transform -translate-x-1/2 sm:translate-x-0">
                    <div className="relative">
                        <img
                            src={
                                avatarPreview ||
                                'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c'
                            }
                            alt="profile"
                            className="h-20 w-20 rounded-lg object-cover border-4 border-[#1e1e1e]"
                        />
                        <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, 'avatar')}
                        />
                        <label
                            htmlFor="avatar-upload"
                            className="absolute bottom-2 -right-2 bg-[#2d2d2d9b] text-white text-xs p-1.5 rounded-full hover:bg-[#3a3a3a] flex items-center justify-center cursor-pointer shadow-md"
                        >
                            <IoCameraOutline className="w-4 h-4" />
                        </label>
                    </div>
                </div>

                {/* {`${member.user.fullName}${member.user.secondName ? ` ${member.user.secondName}` : ''}`} */}

                {/* Name + Email */}
                <div className="mt-10 mb-10">
                    <h2 className="text-xl font-semibold">{`${user?.fullName}${user?.secondName ? ` ${user?.secondName}` : ''}`}</h2>
                    <p className="text-gray-400 text-sm">{user?.email}</p>
                </div>

                {/* Form */}
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={formik.handleSubmit}>
                    <div>
                        <label className="block mb-1 text-sm">
                            First name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            className="w-full bg-[#2b2b2b] border border-[#3a3a3a] p-2 rounded text-white"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm">Last name</label>
                        <input
                            type="text"
                            name="secondName"
                            value={formik.values.secondName}
                            onChange={formik.handleChange}
                            className="w-full bg-[#2b2b2b] border border-[#3a3a3a] p-2 rounded text-white"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm">
                            Display name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            disabled
                            defaultValue="danielcx532"
                            className="w-full bg-[#2b2b2b] border border-[#3a3a3a] p-2 rounded text-white opacity-60 cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            className="w-full bg-[#2b2b2b] border border-[#3a3a3a] p-2 rounded text-white"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm">
                            Role <span className="text-red-500">*</span>
                        </label>
                        <select className="w-full bg-[#2b2b2b] border border-[#3a3a3a] p-2 rounded text-white">
                            <option>Individual contributor</option>
                            <option>Manager</option>
                            <option>Admin</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 text-sm">
                            Timezone <span className="text-red-500">*</span>
                        </label>
                        <select className="w-full bg-[#2b2b2b] border border-[#3a3a3a] p-2 rounded text-white">
                            <option>UTC</option>
                            <option>IST</option>
                            <option>GMT</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 text-sm">Language</label>
                        <select className="w-full bg-[#2b2b2b] border border-[#3a3a3a] p-2 rounded text-white">
                            <option>English</option>
                            <option>Hindi</option>
                        </select>
                    </div>
                </form>

                <div className="mt-8">
                    <button
                        type="submit"
                        onClick={() => formik.handleSubmit()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                        disabled={updateUserProfile.isPending}
                    >
                        {updateUserProfile.isPending ? 'Saving...' : 'Save changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserSettings;