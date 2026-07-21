  import axios from 'axios';
  import toast, { Toaster } from 'react-hot-toast';
  import { ErrorMessage, Field, Form, Formik } from 'formik';
  import React, { useContext } from 'react';
  import * as Yup from 'yup';
  import { useNavigate } from 'react-router-dom';
  import { authContext } from '../Global/AuthProvider';
  import Back from '../Global/Back';

  const CreateEventForm = () => {
    const {user} = useContext(authContext)
    const navigate = useNavigate()
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const validationSchema = Yup.object({
    title: Yup.string().required("Event Title is required"),
    description: Yup.string().min(10, 'Description must contain at least 10 characters').required("Description is required"),
    location: Yup.string().required("Location is required"),
    date: Yup.date().required("Date is required"),
    fromTime: Yup.string().required("This feild is required"),
    toTime: Yup.string().required("This feild is required"),
    category: Yup.string()
      .oneOf(['concert', 'clubs', 'festival', 'sports', 'promotion', 'conference'], 'Invalid Category Type')
      .required("Category is required"),
    volunteersNeeded: Yup.number()
      .min(0, "Volunteers needed cannot be negative")
      .typeError("Must be a number")
      .required("Please specify how many volunteers are needed"),
  });

  return (
    <div className='flex flex-col w-full min-h-screen bg-zinc-800 text-white px-5 py-6 items-center'>
      
      <Formik 
      validationSchema={validationSchema}
      initialValues={{
        title: '',
        description: '',
        location: '',
        date: '',
        fromTime: '',
        toTime: '',
        category: '',
        volunteersNeeded: 0,
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {  
        try {
          // Sending the perfectly mapped schema payload down the wire
          const res = await axios.post("http://localhost:3000/api/event/create-event", values, {
            withCredentials: true 
          });

          const successMessage = res.data.message || "Event published successfully!";
          toast.success(successMessage, {
            style: {
              background: '#333',
              color: '#fff',
            },
          });

          toast.success(res.data?.message || "Event Created successfuly")
          resetForm();
          navigate('/dashboard')
        } catch (error) {
          console.error("Something went wrong:", error?.response?.data || error.message);
          toast.error(error?.response?.data.message|| "Something went wrong");
          //  alert(error?.response?.data?.message || "Failed to create event. See console.");
        } finally {
          setSubmitting(false);
        }
      }}
      >
        {({ isSubmitting }) => (
          <Form className='bg-gray-800 flex flex-col mt-6 w-full md:w-160 p-6 gap-4 text-zinc-100 rounded-lg shadow-xl'>
              <Back />

            <div>
              <h1 className='text-3xl font-semibold text-violet-400'> Create New Event </h1>
              <p className='tracking-wider text-zinc-400 text-sm mt-1'> Publish a new event to your organization dashboard </p>
            </div>

              {/* Event Title */}
              <div className='flex flex-col gap-1'>
                <label htmlFor="title" className='text-sm font-medium text-zinc-300'> Event Title </label>
                <Field 
                id="title"
                type='text'
                name="title"
                className='w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100 focus:outline-none focus:border-violet-500 transition-all'
                placeholder="e.g. Rock Concert 2026"
                />
                <ErrorMessage name='title' component='div' className='text-red-400 text-xs mt-1' />
              </div>

              {/* Date & Category Group Row */}
              <div className='flex flex-col md:flex-row justify-between gap-4'>
                  {/* Date Control */}
                  <div className='flex flex-col flex-1 gap-1'>
                    <label htmlFor="date" className='text-sm font-medium text-zinc-300'> Date </label>
                    <Field 
                    id="date"
                    type='date'
                    min={new Date().toISOString().split("T")[0]}
                    name='date'
                    className='w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100 focus:outline-none focus:border-violet-500 transition-all'
                    />
                    <ErrorMessage name='date' component='div' className='text-red-400 text-xs mt-1' />
                  </div>
                 
                   <div className=' flex flex-col w-full gap-4 md:flex-row md:w-1/2'>
                       <div className='flex flex-col flex-1 gap-1'>
                        <label htmlFor="time" className='text-sm font-medium text-zinc-300'> From </label>
                        <Field 
                        id="fromTime"
                        type='time'
                        //  min={new Date().toISOString().split("T")[0]}
                        name='fromTime'
                        className='w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100 focus:outline-none focus:border-violet-500 transition-all'
                        />
                        <ErrorMessage name='fromTime' component='div' className='text-red-400 text-xs mt-1' />
                      </div>
                      <div className='flex flex-col flex-1 gap-1'>
                        <label htmlFor="time" className='text-sm font-medium text-zinc-300'> To </label>
                        <Field 
                        id="toTime"
                        type='time'
                        //  min={new Date().toISOString().split("T")[0]}
                        name='toTime'
                        className='w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100 focus:outline-none focus:border-violet-500 transition-all'
                        />
                        <ErrorMessage name='toTime' component='div' className='text-red-400 text-xs mt-1' />
                      </div>
                   </div>

                  {/* Category dropdown control */}
                  <div className='flex flex-col flex-1 gap-1'>
                    <label htmlFor="category" className='text-sm font-medium text-zinc-300'>Category</label>
                    <Field 
                    id='category'
                    as='select'
                    name='category'
                    className='w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100 focus:outline-none focus:border-violet-500 transition-all cursor-pointer'
                    >
                      <option value="" disabled>Select a category...</option>
                      <option value="concert">Concert</option>
                      <option value="clubs">Clubs</option>
                      <option value="festival">Festival</option>
                      <option value="sports">Sports</option>
                      <option value="promotion">Brand Promotion</option>
                      {/* <option value="seminar">Seminar</option> */}
                      {/* <option value="webinar">Webinar</option> */}
                      <option value="conference">Conference</option>
                      {/* <option value="meetup">Meetup</option> */}
                    </Field>
                    <ErrorMessage name='category' component='div' className='text-red-400 text-xs mt-1' />
                  </div>
              </div>

              {/* Location & Volunteers Needed Row */}
              <div className='flex flex-col md:flex-row justify-between gap-4'>
                  {/* Location field */}
                  <div className='flex flex-col flex-1 gap-1'>
                    <label htmlFor="location" className='text-sm font-medium text-zinc-300'>Location / Venue</label>
                    <Field 
                    id="location"
                    type='text'
                    name='location'
                    className='w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100 focus:outline-none focus:border-violet-500 transition-all'
                    placeholder="e.g. Madison Square Garden or Remote"
                    />
                    <ErrorMessage name='location' component='div' className='text-red-400 text-xs mt-1' />
                  </div>

                  {/* Volunteers Needed count field */}
                  <div className='flex flex-col flex-1 gap-1'>
                    <label htmlFor="volunteersNeeded" className='text-sm font-medium text-zinc-300'>Volunteers Needed</label>
                    <Field 
                    id="volunteersNeeded"
                    type='number'
                    name='volunteersNeeded'
                    className='w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100 focus:outline-none focus:border-violet-500 transition-all'
                    min="0"
                    />
                    <ErrorMessage name='volunteersNeeded' component='div' className='text-red-400 text-xs mt-1' />
                  </div>
              </div>

              {/* Description field */}
              <div className='flex flex-col gap-1'>
                    <label htmlFor="description" className='text-sm font-medium text-zinc-300'>Description</label>
                    <Field 
                    id="description"
                    as='textarea'
                    name='description'
                    className='w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100 focus:outline-none focus:border-violet-500 transition-all h-28 resize-none'
                    placeholder="Write comprehensive details about the upcoming event..."
                    />
                    <ErrorMessage name='description' component='div' className='text-red-400 text-xs mt-1' />
              </div>

              {/* Action Submit Button */}
              <div className='w-full items-center justify-center flex mt-2'>
                  <button 
                  type='submit'
                  disabled={isSubmitting}
                  className={`w-full py-2 px-6 rounded-md font-semibold text-white transition-all shadow-md ${
                    isSubmitting 
                    ? 'bg-zinc-600 cursor-not-allowed text-zinc-400' 
                    : 'bg-violet-700 hover:bg-violet-600 active:scale-[0.99]'
                  }`}
                  >
                      {isSubmitting ? 'Publishing Event...' : 'Publish Now'}
                  </button>
              </div>
          </Form>
        )}
      </Formik>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
  };

  export default CreateEventForm;