import React, { useRef } from 'react'
// import heroImg from '../../assets/heroImg.jpeg'
import dashboardImg from '../../assets/dashboard.webp'
import { Astroid, Calendars, CircleStar, MapPinned, MoveRight, Music, ShieldHalf, TicketPlusIcon, Users, UsersRound 
} from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router-dom'
// import Register from './Register'

// Explicitly register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
   const navigate = useNavigate()

   const containerRef = useRef(null)

   useGSAP(() => {
    // ----------------------------------------------------
    // 1. PRELOADER & HERO ENTRANCE TIMELINE
    // ----------------------------------------------------
    const tl = gsap.timeline();

    // Loader text reveal
    tl.fromTo('.loader-text span', 
      { y: 100, rotate: 5, opacity: 0 },
      { y: 0, rotate: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: 'power4.out' }
    )
    .fromTo('.loader-sub', 
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.4'
    )
    // Slide up and hide preloader screen
    .to('.preloader', {
      yPercent: -100,
      duration: 1,
      ease: 'power4.inOut',
      delay: 0.5,
    })
    // Force clean from-to executions so Hero elements never disappear
    .fromTo('.hero-heading', 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
      '-=0.4'
    ) 
    .fromTo('.hero-p', 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo('.hero-btn', 
      { y: 20, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)' },
      '-=0.3'
    );


    // ----------------------------------------------------
    // 2. SCROLL ANIMATION: STATS COUNTERS
    // ----------------------------------------------------
    gsap.fromTo('.stat-box', 
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.stats-grid',
          start: 'top 90%', 
          toggleActions: 'play none none reverse',
        },
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out'
      }
    );


    // ----------------------------------------------------
    // 3. SCROLL ANIMATION: WHAT WE DO SECTION
    // ----------------------------------------------------
    const servicesTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.services-header-trigger',
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      }
    });

    servicesTl.fromTo('.services-eyebrow, .services-title h2, .services-desc p', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out' }
    );

    // Completely safe layout reveal for the 5 grids/cards
    gsap.fromTo('.services-card', 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.main-div',
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out'
      }
    );


    
    // 4. SCROLL ANIMATION: VOLUNTEER SYSTEM FEATURE
    const volunteerTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.volunteer-section',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    });

    volunteerTl.fromTo('.volunteer-text', 
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo('.volunteer-image', 
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
      '-=0.5'
    );

    // 5. SCROLL ANIMATION: CTA/LAST SECTION
    gsap.fromTo('.cta-animate', 
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.cta-section',
          start: 'top 95%',
          toggleActions: 'play none none reverse',
        },
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out'
      }
    );

  }, { scope: containerRef });

  return (
    <div className='min-h-screen bg-zinc-black text-white overflow-hidden flex flex-col scroll-smooth ' ref={containerRef}>

        <div className="preloader fixed inset-0 bg-black z-9999 flex flex-col items-center justify-center">
            <h1 className="loader-text text-4xl sm:text-6xl font-bold tracking-widest text-white overflow-hidden flex">
               <span>A</span><span>p</span><span>e</span><span>x</span><span className="text-violet-500">.</span><span>c</span><span>o</span>
            </h1>
            <p className="loader-sub text-zinc-500 text-xs mt-4 tracking-widest uppercase">Creating Experiences...</p>
        </div>

      {/* HERO SECTION */}
      <section className='flex w-full min-h-screen justify-center items-center'>
        {/* BACKGROUND IMAGE */}
        {/* <img
          src={heroImg}
          className='hidden sm:block w-full h-full object-cover absolute inset-0'
          alt="hero"
        /> */}

        {/* DARK OVERLAY */}
        {/* <div className='flex w-full sm:w-full bg-violet-900'></div> */}

        {/* CONTENT */}
        <div className=' inset-0 flex items-center'>
          <div className='container p-6 mx-auto'>
            {/* TEXT WRAPPER */}
            <div className=' px-4 sm:px-0 justify-center flex flex-col items-center'>
              {/* HEADING */}
              <h1 className='hero-heading text-4xl sm:text-xl lg:text-7xl font-semibold tracking-tight leading-tight'>
                We Create. You <span className='text-violet-500'>Celebrate.</span>
              </h1> 

              {/* PARAGRAPH */}
              <p className='hero-p mt-8 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl'>
                Apex.co is an end-to-end event management platform
                delivering unforgettable experiences across concerts,
                sports, stadium operations and live events.
              </p>

              {/* BUTTONS */}
              <div className='flex sm:flex-row gap-4 mt-10'>
                {/* PRIMARY BUTTON */}
                <button className='hero-btn px-3 py-4 rounded-2xl bg-violet-600 hover:bg-violet-500 transition-all duration-300 flex items-center justify-center gap-3 font-medium cursor-pointer hover:scale-[1.03]'
                onClick={() => navigate('/all-events')}>
                  Explore Events
                  <MoveRight size={18} />
                </button>

                {/* GLASS BUTTON */}
                <button className='hero-btn px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer'>
                  Our Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS & WHAT WE DO SECTION */}
      <section className='flex flex-col w-full px-6 py max-w-7xl mx-auto'>
        
        {/* STATS GRID */}
        <div className='stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 w-full rounded-xl p-6 border-t-4 border-violet-600 bg-violet-900'>
          
          {/* STAT 1 */}
          <div className='stat-box flex flex-col items-center text-center p-4 gap-2'>
            <TicketPlusIcon className='text-violet-400 size-7' />
            <h1 className='text-2xl sm:text-3xl font-bold'>200+</h1>
            <p className='text-xs sm:text-sm text-zinc-400 tracking-wider'>Events Managed</p>
          </div>

          {/* STAT 2 */}
          <div className='stat-box flex flex-col items-center text-center p-4 gap-2'>
            <UsersRound className='text-violet-400 size-7' />
            <h1 className='text-2xl sm:text-3xl font-bold'>350+</h1>
            <p className='text-xs sm:text-sm text-zinc-400 tracking-wider'>Volunteers</p>
          </div>

          {/* STAT 3 */}
          <div className='stat-box flex flex-col items-center text-center p-4 gap-2'>
            <MapPinned className='text-violet-400 size-7' />
            <h1 className='text-2xl sm:text-3xl font-bold'>2+</h1>
            <p className='text-xs sm:text-sm text-zinc-400 tracking-wider'>Cities</p>
          </div>

          {/* STAT 4 */}
          <div className='stat-box flex flex-col items-center text-center p-4 gap-2'>
            <Calendars className='text-violet-400 size-7' />
            <h1 className='text-2xl sm:text-3xl font-bold'>3+</h1>
            <p className='text-xs sm:text-sm text-zinc-400 tracking-wider'>Years of Experience</p>
          </div>

        </div> 

        {/* WHAT WE DO CONTENT */}
      <div className='services-header-trigger mt-20 px-6 md:px-12 '>
          <h2 className='services-eyebrow text-2xl sm:text-xl font-bold tracking-wide text-violet-500'>
            WHAT WE DO
          </h2>

        <div className='flex mt-5 justify-between '>
          <div className='services-title'>
            <h2 className='text-3xl sm:text-4xl '>
              Events of every scale.
            </h2>

           <h2 className='text-3xl md:text-4xl '>
             Experiences that last.
           </h2>
          </div>

           <div className='services-desc hidden sm:block'>
             <p className='text-xl sm:text-sm'> From concerts to cricket matches, we handle </p>
             <p className='text-xl sm:text-sm'> everything with precision, passion and perfection </p>
           </div>
        </div>

      </div>
     
       {/* SERVICES CARDS */}
      <div className='main-div py-15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 px-2 rounded-2xl gap-5 w-full'>
         <div className='services-card bg-purple-950 p-7 flex flex-col justify-center rounded-2xl cursor-pointer hover:scale-[1.05] transition-all duration-300 w-full'>
            <div className='bg-violet-800 rounded-full p-4 w-16 h-16 flex items-center justify-center shrink-0'> <Music className='size-7' /> </div>
              <h1 className='mt-3 text-xl font-semibold'> Concerts </h1>
              <p className='mt-3 text-sm text-zinc-300'>
                 End-to-end management for live concerts and music festivals.
              </p>
         </div>
         <div className='services-card bg-purple-950 p-7 flex flex-col justify-center rounded-2xl cursor-pointer hover:scale-[1.05] transition-all duration-300 w-full'>
            <div className='bg-violet-800 rounded-full p-4 w-16 h-16 flex items-center justify-center shrink-0'> <CircleStar className='size-7' /> </div>
              <h1 className='mt-3 text-xl font-semibold'> Sports Events </h1>
              <p className='mt-3 text-sm text-zinc-300'>
                 End-to-end management for live concerts and music festivals.
              </p>
         </div>
         <div className='services-card bg-purple-950 p-7 flex flex-col justify-center rounded-2xl cursor-pointer hover:scale-[1.05] transition-all duration-300 w-full'>
            <div className='bg-violet-800 rounded-full p-4 w-16 h-16 flex items-center justify-center shrink-0'> <Users  className='size-7' /> </div>
              <h1 className='mt-3 text-xl font-semibold'> Volunteer Management </h1>
              <p className='mt-3 text-sm text-zinc-300'>
                 End-to-end management for live concerts and music festivals.
              </p>
         </div>
         <div className='services-card bg-purple-950 p-7 flex flex-col justify-center rounded-2xl cursor-pointer hover:scale-[1.05] transition-all duration-300 w-full'>
            <div className='bg-violet-800 rounded-full p-4 w-16 h-16 flex items-center justify-center shrink-0'> <ShieldHalf className='size-7' /> </div>
              <h1 className='mt-3 text-xl font-semibold'> Security & Staff </h1>
              <p className='mt-3 text-sm text-zinc-300'>
                 End-to-end management for live concerts and music festivals.
              </p>
         </div>
         <div className='services-card bg-purple-950 p-7 flex flex-col justify-center rounded-2xl cursor-pointer hover:scale-[1.05] transition-all duration-300 w-full'>
            <div className='bg-violet-800 rounded-full p-4 w-16 h-16 flex items-center justify-center shrink-0'> <Astroid className='size-7' /> </div>
              <h1 className='mt-3 text-xl font-semibold'> Full Event Support  </h1>
              <p className='mt-3 text-sm text-zinc-300'>
                 End-to-end management for live concerts and music festivals.
              </p>
         </div>
        
      </div>  

       {/* Volunteer system */}
       <div className='volunteer-section grid grid-cols-1 md:grid-cols-[35%_65%] gap-8 p-6 md:p-12 w-full max-w-7xl mx-auto items-center bg-black text-white'>
      
      {/* LEFT BOX: TEXT CONTAINER (35% Width) */}
      <div className=' flex flex-col justify-center gap-3 w-full'>
        
        {/* Eyebrow */}
        <span className='volunteer-text text-xs font-bold tracking-widest text-violet-500 uppercase'>
          Volunteer System
        </span>
        
        {/* Headings */}
        <h2 className='volunteer-text text-3xl sm:text-4xl font-semibold tracking-tight leading-tight'>
          Built for organizers.
        </h2>
        <h2 className='volunteer-text text-3xl sm:text-4xl font-semibold tracking-tight leading-tight text-zinc-400'>
          Loved by volunteers.
        </h2>
        
        {/* Paragraph */}
        <p className='volunteer-text mt-3 text-sm text-zinc-400 leading-relaxed max-w-sm'>
          Our smart volunteer system makes onboarding, assignments, and communication simple and effective for everyone.
        </p>

        {/* Call to Action Button */}
        <button className='volunteer-text mt-6 px-6 py-3 w-fit rounded-xl bg-violet-600 text-sm font-medium hover:bg-violet-500 transition-all duration-300 cursor-pointer hover:scale-[1.03]'
        onClick={() => {
          navigate('/register')
        }}>
          Join as a Volunteer →
        </button>

      </div>

      {/* RIGHT BOX: IMAGE CONTAINER (65% Width) */}
      <div className='w-full h-full flex items-center justify-center bg-black md:justify-end'>
        <img 
          src={dashboardImg}
          alt="Volunteer Dashboard Preview" 
          className='volunteer-image w-full h-auto object-contain rounded-2xl shadow-2xl border border-white/5'
        />
      </div>

    </div>

      </section>

     {/* LAST SECTION */}
   

    </div>
  )
}

export default Home