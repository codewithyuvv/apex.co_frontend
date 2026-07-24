import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowBigRight, ArrowRight } from 'lucide-react'

const Contact = () => {
  const containerRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  // GSAP Entrance Animations
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } })

    // Smooth staggered fade-up for content
    tl.fromTo('.animate-header', 
      { y: 40, opacity: 0 }, 
      { y: 0, opacity: 1, delay: 0.2 }
    )
    .fromTo('.animate-info', 
      { x: -30, opacity: 0 }, 
      { x: 0, opacity: 1, stagger: 0.15 }, 
      '-=0.5'
    )
    .fromTo('.animate-form-group', 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, stagger: 0.1 }, 
      '-=0.6'
    )
  }, { scope: containerRef })

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div ref={containerRef} className=" min-h-screen bg-black text-white px-7 md:px-16 py-20 flex items-center overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Column: Copy & Info */}
        <div className="flex flex-col space-y-8">
          <div className="animate-header opacity-0">
            <span className="text-sm font-semibold tracking-widest text-violet-500 uppercase block mb-3">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-none mb-6">
              Let’s create something <br />
              <span className="text-violet-500">unforgettable.</span>
            </h1>
            <p className="text-zinc-400 max-w-md text-base md:text-lg leading-relaxed">
              Have an idea for a legendary event, or just want to chat details? Drop us a line. Our team responds within 24 hours.
            </p>
          </div>

          <div className="space-y-6 pt-6 border-t border-zinc-900">
            <div className="animate-info opacity-0 flex flex-col">
              <span className="text-xs tracking-wider text-zinc-500 uppercase">Email Us</span>
              <a href="mailto:hello@yourbrand.com" className="text-lg font-medium hover:text-violet-400 transition-colors duration-200 mt-1">
                apexco@outlook.com
              </a>
            </div>

            <div className="animate-info opacity-0 flex flex-col">
              <span className="text-xs tracking-wider text-zinc-500 uppercase">Based In</span>
              <p className="text-lg font-medium text-zinc-200 mt-1">
                Delhi, India
              </p>
            </div>
          </div>

           <div className=''>
             <button className='bg-violet-800 px-4 py-1 rounded-2xl cursor-pointer tracking-wider flex hover:scale-103 transform transition-all hover:bg-violet-600'>
                Join as a Volunteer

                <ArrowRight  className='ml-2 items-center'/>
             </button>
           </div>
        </div>

        {/* Right Column: Form */}
        <div className="bg-zinc-950 border border-zinc-900 p-6 md:p-10 rounded-3xl w-full shadow-2xl relative">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name Input */}
            <div className="animate-form-group opacity-0 flex flex-col space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-zinc-300">Name</label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all duration-200"
              />
            </div>

            {/* Email Input */}
            <div className="animate-form-group opacity-0 flex flex-col space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-zinc-300">Email Address</label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all duration-200"
              />

            </div>

            {/* Message Input */}
            <div className="animate-form-group opacity-0 flex flex-col space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-zinc-300">Message</label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your next legendary event..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all duration-200 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="animate-form-group opacity-0 pt-2">
              <button
                type="submit"
                className="w-full bg-violet-800 text-white font-medium py-4 px-6 rounded-xl hover:bg-violet-600 transition-all duration-200 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
              >
                Send Message
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  )
}

export default Contact