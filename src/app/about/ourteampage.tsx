// src\app\about\ourteampage.tsx


import Image from 'next/image';

const teamMembers = [
  {
    name: 'Sanju Peramuna',
    role: 'Chief Technology Officer',
    image: '/team/sanju.jpg',
    bio: 'Sanju brings 8+ years of digital strategy and performance marketing expertise with a passion for CRO-driven results.',
  },
  {
    name: 'Chamo Hewawasam',
    role: 'Chief Executive Officer',
    image: '/team/chamo.jpeg',
    bio: 'Chamo is the brain behind our AI models and infrastructure, ensuring speed, scale, and learning intelligence.',
  },
  {
    name: 'Lashen Yasawardhana',
    role: 'Junior Data Analyst',
    image: '/team/lashen.jpg',
    bio: 'Lashen creates pixel-perfect, high-converting UI experiences and links user behavior to our CRO insights.',
  },
];

export default function OurTeamPage() {
  return (
    <section className="min-h-screen bg-black text-white px-6 py-20 md:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4">
          Meet Our Team
        </h2>
        <p className="text-gray-400 mb-12 text-lg">
          The minds behind KordorAI. Combining expertise in AI, CRO, and design to fuel your growth.
        </p>

        <div className="grid gap-10 md:grid-cols-3">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-zinc-900 p-6 rounded-2xl shadow-md hover:shadow-purple-700/40 transition duration-300 transform hover:-translate-y-1"
            >
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-purple-500 mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-purple-400">{member.name}</h3>
              <p className="text-sm  mb-2">{member.role}</p>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
