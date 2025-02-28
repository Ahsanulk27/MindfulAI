import React from 'react';
import { BookOpen, Phone, Video, Users, FileText, Headphones } from 'lucide-react';

export function ResourcesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Mental Health Resources
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Access a curated collection of resources to support your mental health journey.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ResourceCard 
          icon={<Phone className="w-6 h-6 text-blue-500" />}
          title="Crisis Hotlines"
          description="Immediate support for those in crisis or experiencing suicidal thoughts."
          resources={[
            { name: "988 Suicide & Crisis Lifeline", link: "tel:988" },
            { name: "Crisis Text Line", link: "sms:741741" },
            { name: "Veterans Crisis Line", link: "tel:18002738255" },
          ]}
        />
        
        <ResourceCard 
          icon={<Video className="w-6 h-6 text-green-500" />}
          title="Online Therapy"
          description="Connect with licensed therapists from the comfort of your home."
          resources={[
            { name: "BetterHelp", link: "https://www.betterhelp.com" },
            { name: "Talkspace", link: "https://www.talkspace.com" },
            { name: "Cerebral", link: "https://cerebral.com" },
          ]}
        />
        
        <ResourceCard 
          icon={<Users className="w-6 h-6 text-purple-500" />}
          title="Support Groups"
          description="Connect with others who understand what you're going through."
          resources={[
            { name: "NAMI Support Groups", link: "https://www.nami.org/Support-Education/Support-Groups" },
            { name: "Mental Health America", link: "https://www.mhanational.org/find-support-groups" },
            { name: "7 Cups", link: "https://www.7cups.com" },
          ]}
        />
        
        <ResourceCard 
          icon={<FileText className="w-6 h-6 text-red-500" />}
          title="Educational Resources"
          description="Learn more about mental health conditions and treatment options."
          resources={[
            { name: "NIMH", link: "https://www.nimh.nih.gov" },
            { name: "Psychology Today", link: "https://www.psychologytoday.com" },
            { name: "Mental Health First Aid", link: "https://www.mentalhealthfirstaid.org" },
          ]}
        />
        
        <ResourceCard 
          icon={<BookOpen className="w-6 h-6 text-yellow-500" />}
          title="Self-Help Books"
          description="Recommended reading for various mental health topics."
          resources={[
            { name: "Feeling Good by David Burns", link: "#" },
            { name: "The Anxiety and Phobia Workbook", link: "#" },
            { name: "The Body Keeps the Score", link: "#" },
          ]}
        />
        
        <ResourceCard 
          icon={<Headphones className="w-6 h-6 text-indigo-500" />}
          title="Meditation & Mindfulness"
          description="Apps and resources for practicing mindfulness and meditation."
          resources={[
            { name: "Headspace", link: "https://www.headspace.com" },
            { name: "Calm", link: "https://www.calm.com" },
            { name: "Insight Timer", link: "https://insighttimer.com" },
          ]}
        />
      </div>
      
      <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Disclaimer
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          MindfulAI is not a substitute for professional medical advice, diagnosis, or treatment. 
          If you're experiencing a mental health emergency, please call your local emergency services 
          or visit the nearest emergency room.
        </p>
      </div>
    </div>
  );
}

function ResourceCard({ icon, title, description, resources }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="flex items-center space-x-3 mb-4">
        {icon}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <ul className="space-y-2">
        {resources.map((resource, index) => (
          <li key={index}>
            <a 
              href={resource.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 hover:underline"
            >
              {resource.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}