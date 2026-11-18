import React, { useState } from 'react';

export default function Portfolio() {
  const [activeRole, setActiveRole] = useState('software');

  const roles = {
    software: {
      title: "Software Engineering",
      skills: ["React", "Node.js", "Python", "MongoDB", "Tailwind CSS"],
      projects: [
        { name: "TailorFit AI / Resume Maker AI", desc: "AI-powered resume tailoring web app with dynamic keyword matching. Deployed on Vercel." },
        { name: "SK Packs", desc: "Interactive e-commerce showcase website for eco-friendly packaging solutions." },
        { name: "Precision Client Finder", desc: "Vercel-hosted web app utilizing n8n workflows and OpenStreetMap Overpass API." }
      ]
    },
    ai: {
      title: "AI Automation Engineer",
      skills: ["Generative AI", "LLM APIs", "Computer Vision", "Deep Learning", "n8n"],
      projects: [
        { name: "Aerial Wildfire Detection", desc: "Deep learning computer vision POC for early wildfire detection using UAV imagery." },
        { name: "Brindleap B2B Sales Agent", desc: "AI-driven B2B sales development agent platform using the Polsia builder." },
        { name: "Franger AI", desc: "Wellness companion chat app supporting multiple LLM providers." }
      ]
    },
    data: {
      title: "Data Analytics",
      skills: ["SQL", "Data Pipelines", "Odoo ERP", "Firebase", "Analytics"],
      projects: [
        { name: "Data Analyst Internships", desc: "Completed data analysis and reporting roles across Grad Twin and Coursera." },
        { name: "Kingly & Trendz India Pipeline", desc: "Built backend data pipelines for e-commerce traffic tracking using Node.js and Firebase." },
        { name: "Odoo Functional Trainee", desc: "Configured Sales, Inventory, Accounting, and CRM modules alongside KSA VAT compliance." }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-teal-500 selection:text-white">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl font-bold">
            Hi, I'm <span className="text-teal-400">Irshad Ahmed</span>
          </h1>
          <p className="text-xl text-gray-400">
            B.E. Computer Science Engineering (CGPA: 8.31) | Dhaanish Ahmed College
          </p>
          
          <div className="flex gap-4 pt-4">
            <a 
              href="/assets/Irshad_Ahmed_Resume_Modern.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-all"
            >
              View Resume
            </a>
            <a 
              href="https://github.com/DevChipZ" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-gray-600 hover:border-teal-400 rounded-lg transition-all"
            >
              GitHub
            </a>
          </div>
        </div>
        
        {/* Profile Picture */}
        <div className="w-64 h-64 md:w-80 md:h-80 relative rounded-full overflow-hidden border-4 border-teal-500 shadow-[0_0_30px_rgba(20,184,166,0.3)]">
          <img 
            src="/assets/IMG-20241230-WA0006 (1).jpg" 
            alt="Irshad Ahmed" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Interactive Roles Section */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 border-b border-gray-700 pb-4">Areas of Expertise</h2>
        
        {/* Tab Selectors */}
        <div className="flex flex-wrap gap-4 mb-8">
          {Object.entries(roles).map(([key, role]) => (
            <button
              key={key}
              onClick={() => setActiveRole(key)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeRole === key 
                  ? 'bg-teal-500 text-white shadow-lg scale-105' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {role.title}
            </button>
          ))}
        </div>

        {/* Dynamic Content (Glassmorphism card) */}
        <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 p-8 rounded-2xl animate-fade-in">
          <h3 className="text-2xl font-bold text-teal-400 mb-6">{roles[activeRole].title}</h3>
          
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-300 mb-3">Core Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {roles[activeRole].skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-gray-900 border border-gray-600 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-300 mb-4">Featured Work</h4>
            <div className="grid gap-6 md:grid-cols-2">
              {roles[activeRole].projects.map(project => (
                <div key={project.name} className="bg-gray-900 p-5 rounded-xl border border-gray-700 hover:border-teal-500 transition-colors">
                  <h5 className="font-bold text-lg mb-2">{project.name}</h5>
                  <p className="text-gray-400 text-sm">{project.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
