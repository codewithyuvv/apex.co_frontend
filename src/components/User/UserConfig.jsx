import React, { useContext, useRef, useState, useEffect } from 'react'
import { authContext } from '../Global/AuthProvider'
import { User } from 'lucide-react'
import Spinner from '../../assets/Spinner'

const UserConfig = () => {
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

      const res = await fetch("http://localhost:3000/api/user/profile", {
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
    <div className='px-3 ml-19'>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept='image/*'
          ref={imageRef}
          onChange={handleImageChange}
          className='hidden'
        />

        <div className='w-full py-3 bg-zinc-900 flex flex-col justify-center items-center'>
          <div
            className='w-20 h-20 bg-mauve-700 rounded-full flex justify-center items-center overflow-hidden md:w-40 md:h-40'
            onClick={() => imageRef.current.click()}
          >
            {preview ? (
              <img className='profile w-full h-full object-cover rounded-full' src={preview} />
            ) : (
              <User size={40} />
            )}
          </div>

          <button
            className={`mt-2 flex cursor-pointer px-3 py-1 rounded-xl text-md ${
              loading ? "bg-purple-600" : "bg-purple-900"
            }`}
            type='submit'
            disabled={loading}
          >
            {loading ? <Spinner size='sm'/> : "Upload"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserConfig