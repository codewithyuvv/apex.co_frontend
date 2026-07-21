import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'
import founderImg from '../../assets/Founder.jpg'
import coFounderImg from '../../assets/co-founder.jpg'
import member1 from '../../assets/member1.jpg'
import member2 from '../../assets/member2.jpg'
import member3 from '../../assets/member3.jpg'
import member4 from '../../assets/member4.jpg'
import member5 from '../../assets/member5.jpg'
import member6 from '../../assets/member6.jpg'
import member7 from '../../assets/member7.jpg'
import member8 from '../../assets/member8.jpg'


const About = () => {
   const aboutRef = useRef(null)

   useGSAP( () => {
     const tl = gsap.timeline()

     tl.fromTo('.title', 
       // from //
      {
      opacity: 0,
      y: 40
     },
        // To //
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      }
    )
    .fromTo('.description', 
      {
       opacity: 0,
       x: -25 
    },

    {
      opacity: 1,
      x: 0,
      duration: 0.6,
      ease: 'power2.out'
    },
    '-=0.4')

    .fromTo('.founder-section', 
      {
      opacity: 0,
      y: 30,

    },

    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.15,
    }
  
  )
   
    
   }, {scope: aboutRef})


   const teamMembers = [
    { id: 1, name: 'Mellisa', role: 'CTO', desc: 'She is our Chief Technical operator', img: member1 },
    { id: 2, name: 'Rohan', role: 'Designer', desc: 'She is our Chief Technical operator', img: member6 },
    { id: 3, name: 'Mayank', role: 'Co-ordinator', desc: 'She is our Chief Technical operator', img: member8 },
    { id: 4, name: 'Mohit', role: 'Event Designer', desc: 'She is our Chief Technical operator', img: member4 },
    { id: 5, name: 'Raj', role: 'Team Leader', desc: 'She is our Chief Technical operator', img: member5 },
    { id: 6, name: 'Arohi', role: 'Event Manager', desc: 'She is our Chief Technical operator', img: member2 },
    { id: 7, name: 'Hemant', role: 'Manager', desc: 'She is our Chief Technical operator', img: member7 },
    { id: 8, name: 'Suhana', role: 'HR', desc: 'She is our Chief Technical operator', img: member3 },
  ];

  const testimonials = [
    {
      img: member1,
      review: "A wonderful experience by Apex",
      name: "Geeta"
    },
    {
      img: member8,
      review: "The are so professional",
      name: "suarabh"
    },
    {
      img: member5,
      review: "Everything is top-notch and by time",
      name: "vaibhav"
    },
    {
      img: member5,
      review: "Everything is top-notch and by time",
      name: "vaibhav"
    },
    {
      img: member5,
      review: "Everything is top-notch and by time",
      name: "vaibhav"
    },
    {
      img: member5,
      review: "Everything is top-notch and by time",
      name: "vaibhav"
    },
  ]

  return (
    <div className='w-full min-h-screen bg-black text-white ' ref={aboutRef}>
       <section className='flex flex-col px-9 ml-14 max-w-7xl mx-auto'>
           <div className='py-10 flex flex-col'>
              <h1 className='title text-2xl tracking-wide md:text-4xl '> Meet the Minds </h1>
              <h1 className='title text-2xl tracking-wide md:text-4xl '> Behind <span className='text-violet-900'>Apex.co</span> </h1>

              <p className='description w-80 mt-4 tracking-wider text-zinc-400 md:w-135'>
              Apex.co is a dynamic team of event industry veterans, tech visionaries, and creative innovators dedicated to redefining event experiences through unified software and premium event management services.
              </p>
           </div>

       <div className="founder-section mx-auto bg-zinc-900/50 border border-white/5 rounded-3xl flex flex-col md:flex-row       w-full overflow-hidden my-20">
        
          <div className='founder-img w-full md:w-1/2 h-80 md:h-112 overflow-hidden'>
             <img 
              src={founderImg}
               alt='Founder and CEO'
               className='w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 ease-out'
             />
          </div>
          <div className='founder-content w-full md:w-1/2 flex flex-col justify-center p-8 sm:p-12 lg:p-16 bg-linear-to-br from-zinc-900 to-black'>
           
             {/* Eyebrow Tag */}
             <span className='founder-element text-xs font-bold tracking-widest text-violet-500 uppercase mb-3 block'>
               Leadership
             </span>
      
             {/* Title/Name */}
             <h1 className='founder-element text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-1'>
               Yuvraj
             </h1>
           
             {/* Subtitle */}
             <h2 className='founder-element text-sm tracking-wider text-zinc-400 uppercase font-medium mb-6'> 
               Founder & CEO, Apex.co  
             </h2>
             
             {/* Founder Bio / Statement */}
             <p className='founder-element text-zinc-300 text-sm sm:text-base leading-relaxed tracking-wide max-w-md'>
               "Our mission isn't just to manage Events—it's to capture lightning in a bottle. We build the architecture that allows creative visionaries and global audiences to connect seamlessly, safely, and unforgettable."
             </p>
          </div>

        </div>
       </section>

        <section className='bg-zinc-950 text-white py-16 px-9 ml-14 lg:px-12 min-h-screen flex flex-col justify-center selection:bg-violet-500/30'>
      <div className='max-w-7xl mx-auto w-full'>
        
        {/* Header Section */}
        <div className='mb-16 max-w-2xl'>
          <p className='text-xs font-bold tracking-widest text-violet-500 uppercase mb-3'>
            // The Intellect Behind The Innovation
          </p>
          <h1 className='text-4xl md:text-5xl font-black tracking-tight bg-linear-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent'>
            Meet Our Team
          </h1>
          <p className='text-zinc-400 mt-4 text-base md:text-lg leading-relaxed'>
            A distributed group of engineers, designers, and innovators building the future of decentralized interfaces.
          </p>
        </div>
        
        {/* Main Grid Layout */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>

          {/* Featured Co-Founder Spotlight Card */}
          <div className="co-founder lg:col-span-1 group relative overflow-hidden bg-linear-to-b from-zinc-900 to-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl flex flex-col justify-between h-full min-h-125 shadow-2xl transition-all duration-300 hover:border-violet-500/40">
            {/* Subtle background glow effect on hover */}
            <div className="absolute inset-0 bg-linear-to-tr from-violet-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div>
              <div className='overflow-hidden rounded-xl aspect-4/3 w-full relative mb-6'>
                <img 
                  src={coFounderImg}
                  alt="Alex"
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105' 
                />
              </div>
              <div className="relative z-10">
                <span className='px-2.5 py-1 text-[10px] uppercase tracking-wider font-extrabold text-violet-400 bg-violet-500/10 rounded-full border border-violet-500/20'>
                  Executive Leadership
                </span>
                <h2 className='text-3xl font-bold text-white mt-4 tracking-tight'>Alex</h2>
                <p className='text-zinc-400 text-sm mt-3 leading-relaxed'>
                  Guiding organizational growth, strategic engineering alignment, and fostering architectural excellence across global engineering systems.
                </p>
              </div>
            </div>

            <div className='mt-8 pt-4 border-t border-zinc-800/60 flex items-center justify-between relative z-10'>
              <span className='text-xs uppercase font-semibold tracking-widest text-zinc-500'>Co-Founder / CEO</span>
              <span className='text-violet-400 group-hover:translate-x-1 transition-transform duration-300 text-sm'>→</span>
            </div>
          </div>

          {/* The Supporting Team Matrix */}
          <div className='other-members lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full'>
            {teamMembers.map((member) => (
              <div 
                key={member.id} 
                className='group bg-zinc-900/40 backdrop-blur-sm border border-zinc-900 rounded-xl overflow-hidden shadow-md flex flex-col justify-between transition-all duration-300 hover:bg-zinc-900/80 hover:border-zinc-800 hover:-translate-y-1'
              >
                <div className='p-5'>
                  {/* Avatar Layout with clean inline alignment */}
                  <div className='flex items-center gap-4 mb-4'>
                    <div className='h-14 w-14 overflow-hidden rounded-full border-2 border-zinc-800 group-hover:border-teal-500/40 transition-colors duration-300 shrink-0'>
                      <img src={member.img} alt={member.name} className='object-cover h-full w-full transition-transform duration-500 group-hover:scale-110' />
                    </div>
                    <div>
                      <h3 className='text-lg font-bold text-zinc-100 group-hover:text-white transition-colors'>{member.name}</h3>
                      <p className='text-xs font-medium tracking-wide text-teal-400'>{member.role}</p>
                    </div>
                  </div>
                  <p className='text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors line-clamp-3'>
                    {member.desc}
                  </p>
                </div>
                
                {/* Clean, subtle card footer indicator */}
                <div className='h-1 w-0 bg-linear-to-r from-teal-500 to-emerald-500 group-hover:w-full transition-all duration-500 ease-out' />
              </div>
            ))}
          </div>

        </div>
      </div>
       </section>

     <section className='px-9 py-3 ml-14 flex flex-col'>
       <h1 className=' tracking-widest font-bold text-violet-800'> Client Testimonials </h1>

       <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto p-4'>
  {testimonials.map((testimonial, idx) => {
    return (
      // 1. Added a unique key
      // 2. Swapped w-30/h-20 for full fluid width with structural padding
      <div 
        key={testimonial.id || idx} 
        className='w-full bg-zinc-900 border border-zinc-800 mx-2 rounded-xl relative flex flex-col items-center text-center shadow-lg'
      >
        {/* Rounded Avatar Wrapper */}
         <div className='w-full h-45 overflow-hidden rounded border-violet-500 mb-4'>
             <img 
               src={testimonial.img} 
               alt="User testimonial avatar" 
               className='w-full h-full object-cover' // Correct placement of object-cover
                />
                </div>

                  <h3 className='text-lg font-semibold text-white'>{testimonial.name}</h3>
                    <p className='text-sm text-zinc-400 mt-2 mb-4'>
                        "{testimonial.review}"
                  </p>
               </div>
                 );
              })}
          </div>

          <div>
             
          </div>
     </section>
    </div>
  )
}

export default About
