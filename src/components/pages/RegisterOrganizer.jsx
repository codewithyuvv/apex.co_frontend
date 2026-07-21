import React from 'react'

const RegisterOrganizer = () => {
  return (
    <div>
       <div className='bg-linear-to-br from-violet-900 via-indigo-950 to-black hidden lg:flex lg:w-1/2 flex-col justify-center p-12 relative overflow-hidden'>

<div className='absolute -top-20 -right-20 w-64 h-64 bg-violet-500/20 blur-3xl rounded-full'></div>
<div className='absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full'></div>

<div className='relative z-10'>

    <h1 className='text-5xl font-black tracking-tight'>
        apex<span className='text-violet-400'>.</span>co
    </h1>

    <p className='mt-5 text-2xl font-semibold leading-relaxed'>
        Build unforgettable events.
    </p>

    <p className='mt-3 text-zinc-300 leading-7'>
        Create events, recruit passionate volunteers,
        manage applications, track attendance,
        and organize everything from one dashboard.
    </p>

    <div className='mt-12 space-y-5'>

        <div className='flex gap-4 items-center'>
            <div className='h-12 w-12 rounded-xl bg-violet-600 flex items-center justify-center'>
                📅
            </div>

            <div>
                <h3 className='font-semibold'>
                    Create Events
                </h3>

                <p className='text-sm text-zinc-400'>
                    Publish events within minutes.
                </p>
            </div>
        </div>

        <div className='flex gap-4 items-center'>
            <div className='h-12 w-12 rounded-xl bg-violet-600 flex items-center justify-center'>
                👥
            </div>

            <div>
                <h3 className='font-semibold'>
                    Recruit Volunteers
                </h3>

                <p className='text-sm text-zinc-400'>
                    Accept or reject applications easily.
                </p>
            </div>
        </div>

        <div className='flex gap-4 items-center'>
            <div className='h-12 w-12 rounded-xl bg-violet-600 flex items-center justify-center'>
                📈
            </div>

            <div>
                <h3 className='font-semibold'>
                    Track Attendance
                </h3>

                <p className='text-sm text-zinc-400'>
                    Monitor participation in real time.
                </p>
            </div>
        </div>

    </div>

</div>

</div>
    </div>
  )
}

export default RegisterOrganizer
