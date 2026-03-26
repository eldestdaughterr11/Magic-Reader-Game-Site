import React from 'react';

const AboutView = () => {
  const teamMembers = [
    {
      name: "Ashley Margaux A. Solis",
      role: "Project Manager",
      contribution: "Managing the team",
      image: "/assets/ashley.png"
    },
    {
      name: "Danica Joie R. Allauigan",
      role: "Data Analyst",
      contribution: "Budgeting for the costs of making the game and other expenses",
      image: "/assets/danica.png"
    },
    {
      name: "Christian Joseph G. Doronio",
      role: "Document Specialist",
      contribution: "Formatting of the manuscript and other documents",
      image: "/assets/christian.png"
    },
    {
      name: "Van Ryan M. Navarez",
      role: "Programmer",
      contribution: "Developing the whole game and coding",
      image: "/assets/vanryan.png"
    },
    {
      name: "Derille P. Pagayon",
      role: "3D Artist",
      contribution: "Modeling of the characters and environment",
      image: "/assets/derille.png"
    }
  ];

  return (
    <div className="flex flex-col items-center py-20 px-4 min-h-[70vh] space-y-16">
      <div className="text-center space-y-4">
        <h2 className="font-magic text-6xl text-[#E9D5FF] tracking-wider drop-shadow-lg">
          About Dream Pixels
        </h2>
        <h3 className="font-magic text-3xl text-yellow-400 opacity-90 uppercase italic">
          Team Description
        </h3>
      </div>

      <div className="w-full max-w-2xl flex flex-col gap-12">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center gap-10 group">
            {/* Avatar Circle Container */}
            <div className="w-32 h-32 md:w-36 md:h-36 bg-[#E5E5E5] rounded-full border-4 border-white/20 shrink-0 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center overflow-hidden relative">
               {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
               ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-2/3 h-2/3 text-gray-400 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
               )}
            </div>

            {/* Member Info */}
            <div className="text-center md:text-left space-y-1">
              <h4 className="text-3xl font-bold text-[#E9D5FF] leading-tight drop-shadow-sm">
                {member.name}
              </h4>
              <p className="text-xl font-black">
                <span className="text-yellow-400">Role: </span>
                <span className="text-white">{member.role}</span>
              </p>
              <p className="text-lg font-bold">
                <span className="text-yellow-400">Contribution: </span>
                <span className="text-white/80">{member.contribution}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutView;
