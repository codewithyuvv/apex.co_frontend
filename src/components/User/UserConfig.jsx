import React, { useContext, useRef, useState, useEffect } from 'react'
import { authContext } from '../Global/AuthProvider'
import { User } from 'lucide-react'
import Spinner from '../../assets/Spinner'
import { useNavigate } from 'react-router-dom'
import KycPopupBar from '../Global/KYCPopup'
import KYCPopup from '../Global/KYCPopup'

const UserConfig = () => {
  const navigate = useNavigate()
  const imageRef = useRef()
  const { user, setUser } = useContext(authContext)

  const [file, setFile] = useState(null)          // the actual File to upload
  const [preview, setPreview] = useState(user?.profilePic || null) // what to display
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e) => {
    const selected = e.target.files[0]
    if (!selected) return

    setFile(selected)
    setPreview(URL.createObjectURL(selected)) // instant local preview
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("profile", file)

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/profile`, {
        credentials: "include",
        method: "POST",
        body: formData,
      })
      const data = await res.json()

      if (data?.success) {
        setUser((prev) => ({ ...prev, profilePic: data.profilePic })) // sync context
        setPreview(data.profilePic) // switch preview to the real Cloudinary URL
      }
    } catch (error) {
      console.log("Error here: ", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 md:px-10 py-8 md:ml-20">

  <div className="max-w-5xl mx-auto space-y-6">

    {/* Heading */}
    <div>
      <h1 className="text-3xl font-bold">Account Settings</h1>
      <p className="text-zinc-400 mt-1">
        Manage your profile and account preferences.
      </p>
    </div>

    {/* Profile Card */}
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center">

      <div
        onClick={() => imageRef.current.click()}
        className="cursor-pointer w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-violet-600"
      >
        {preview ? (
          <img
            src={preview}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center bg-zinc-800">
            <User size={50} />
          </div>
        )}
      </div>

      <div className="flex-1 text-center md:text-left">

        <h2 className="text-2xl font-semibold">
          {user?.name}
        </h2>

        <p className="text-zinc-400">
          {user?.email}
        </p>

        <span className="inline-block mt-3 px-3 py-1 rounded-full bg-violet-600/20 text-violet-300 text-sm">
          {user?.role}
        </span>

      </div>

    </div>

    {/* KYC Banner */}

    {user?.isKYC !== "TRUE" && (
      <div className="bg-violet-700/40 border border-purple-600 rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center">

        <div>

          <h3 className="font-semibold text-red-400">
            Complete your KYC
          </h3>

          <p className="text-zinc-300 mt-1">
            Verify your identity to unlock all platform features and increase trust with organizers.
          </p>

        </div>

        <button
          onClick={() => navigate("/user/kyc")}
          className="mt-4 md:mt-0 px-5 py-2 rounded-lg bg-pink-700 text-black font-medium hover:bg-purple-400 transition"
        >
          Complete Now
        </button>

      </div>
    )}
     <KYCPopup />

    {/* Upload */}

    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

      <h2 className="text-xl font-semibold mb-5">
        Profile Picture
      </h2>

      <input
        ref={imageRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />

      <button
        type="button"
        onClick={() => imageRef.current.click()}
        className="px-5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700"
      >
        Choose Image
      </button>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="ml-3 px-6 py-2 rounded-lg bg-violet-700 hover:bg-violet-600 disabled:opacity-60"
      >
        {loading ? <Spinner size="sm" /> : "Upload"}
      </button>

    </div>

    {/* Account */}

    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

      <h2 className="text-xl font-semibold mb-6">
        Account Information
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <div>
          <p className="text-zinc-500 text-sm">
            Name
          </p>
          <p>{user?.name}</p>
        </div>

        <div>
          <p className="text-zinc-500 text-sm">
            Email
          </p>
          <p>{user?.email}</p>
        </div>

        <div>
          <p className="text-zinc-500 text-sm">
            Role
          </p>
          <p>{user?.role}</p>
        </div>

        <div>
          <p className="text-zinc-500 text-sm">
            KYC Status
          </p>
          <p>{user?.isKYC}</p>
        </div>

      </div>

    </div>

  </div>

</div>
  )
}

export default UserConfig