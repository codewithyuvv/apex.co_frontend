import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateEvent = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [editForm, setEditForm] = useState({
    title: '',
    location: '',
    date: '',
    volunteersNeeded: '',
    description: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/event/events/${id}`);
        const currentEvent = res.data.singleEvent; 

       
        
        setEditForm({
          title: currentEvent?.title || '',
          location: currentEvent?.location || '',
          date: currentEvent?.date || '',
          volunteersNeeded: currentEvent?.volunteersNeeded || 0,
          description: currentEvent?.description || ''
        });
      } catch (error) {
        console.error("Error fetching single event:", error);
        toast.error("Failed to load existing event details");
      }
    };

    if (id) fetchEventData();
  }, [id]);

  // 3. TRACK TYPING CHANGES
  const handleInput = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  // 4. SUBMIT DYNAMIC PATCH REQUEST
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send PATCH package: target URL containing ID + the object payload payload
      const res = await axios.patch(
        `http://localhost:3000/api/event/events/${id}`, 
        editForm,
        { withCredentials: true }
      );

      toast.success(res.data.message || "Updated successfully!");
      
      // Redirect your administrator back to your main panel table view
      setTimeout(() => {
        navigate(-1); // Goes back to previous screen (the Admin panel)
      }, 1500);

    } catch (error) {
      console.log("ERROR:", error);
      toast.error(error?.response?.data?.message || "Something went wrong updating");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex flex-col w-full min-h-screen bg-zinc-800 text-white px-5 py-6 items-center'>
       <Back />
      {/* FIXED: Standard HTML form utilizing your submit handler */}
      <form 
        className='bg-gray-800 flex flex-col mt-6 w-full md:w-160 p-6 gap-4 text-zinc-100 rounded-lg shadow-xl'
        onSubmit={handleSubmit}
      >
        <div>
          <h1 className='text-3xl font-semibold text-violet-400'> Update Event </h1>
        </div>

        {/* Event Title */}
        <div className='flex flex-col gap-1'>
          <label htmlFor="title" className='text-sm font-medium text-zinc-300'> Event Title </label>
          <input 
            id="title"
            type='text'
            name="title"
            value={editForm.title} // Linked to state
            onChange={handleInput} // Tracks keystrokes
            className='w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100 focus:outline-none focus:border-violet-500 transition-all'
            placeholder="e.g. Rock Concert 2026"
          />
        </div>

        {/* Date Row */}
        <div className='flex flex-col md:flex-row justify-between gap-4'>
          <div className='flex flex-col flex-1 gap-1'>
            <label htmlFor="date" className='text-sm font-medium text-zinc-300'>Date & Time</label>
            <input 
              id="date"
              type='datetime-local'
              name='date'
              value={editForm.date}
              onChange={handleInput}
              className='w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100 focus:outline-none focus:border-violet-500 transition-all'
            />
          </div>
        </div>

        {/* Location & Volunteers Needed Row */}
        <div className='flex flex-col md:flex-row justify-between gap-4'>
          <div className='flex flex-col flex-1 gap-1'>
            <label htmlFor="location" className='text-sm font-medium text-zinc-300'>Location / Venue</label>
            <input 
              id="location"
              type='text'
              name='location'
              value={editForm.location}
              onChange={handleInput}
              className='w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100 focus:outline-none focus:border-violet-500 transition-all'
              placeholder="e.g. Madison Square Garden or Remote"
            />
          </div>

          <div className='flex flex-col flex-1 gap-1'>
            <label htmlFor="volunteersNeeded" className='text-sm font-medium text-zinc-300'>Volunteers Needed</label>
            <input 
              id="volunteersNeeded"
              type='number'
              name='volunteersNeeded'
              value={editForm.volunteersNeeded}
              onChange={handleInput}
              className='w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100 focus:outline-none focus:border-violet-500 transition-all'
              min="0"
            />
          </div>
        </div>

        {/* Description Input */}
        <div className='flex flex-col gap-1'>
          <label htmlFor="description" className='text-sm font-medium text-zinc-300'>Description</label>
          <textarea 
            id="description"
            name='description'
            value={editForm.description}
            onChange={handleInput}
            className='w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100 focus:outline-none focus:border-violet-500 transition-all h-28 resize-none'
            placeholder="Write comprehensive details about the upcoming event..."
          />
        </div>

        {/* Action Submit Button */}
        <div className='w-full items-center justify-center flex mt-2 gap-3'>
          <button 
            type='button'
            onClick={() => navigate(-1)}
            className="w-1/3 py-2 px-6 rounded-md font-semibold bg-zinc-700 hover:bg-zinc-600 text-white transition-all cursor-pointer"
          >
            Cancel
          </button>
          
          <button 
            type='submit'
            disabled={isSubmitting}
            className={`w-2/3 py-2 px-6 rounded-md font-semibold text-white transition-all shadow-md ${
              isSubmitting 
              ? 'bg-zinc-600 cursor-not-allowed text-zinc-400' 
              : 'bg-violet-700 hover:bg-violet-600 active:scale-[0.99] cursor-pointer'
            }`}
          >
            {isSubmitting ? 'Updating...' : 'Update Event'}
          </button>
        </div>
      </form>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default UpdateEvent;