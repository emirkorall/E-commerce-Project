import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const teamMembers = [
  {
    id: 1,
    name: 'Emir Koral',
    role: 'Full Stack Developer',
    imageUrl: 'https://media.licdn.com/dms/image/v2/C4D03AQEt1NCy0Dm3ew/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1663277512905?e=2147483647&v=beta&t=5YBkYEmgunqFYrpQBXWF0sSWrkHS1pE_gVQbe_7KCLY',
    bio: 'Emir specializes in building full-stack applications with modern frameworks. He has a passion for clean code and innovative solutions.',
    socials: {
      github: '#',
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    id: 2,
    name: 'Kanat Baykal',
    role: 'CEO',
    imageUrl: 'https://media.licdn.com/dms/image/v2/C5603AQEejMSy5TmY6g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1517623349734?e=2147483647&v=beta&t=t3H1-VNaoTNDJl2xequSBL3zMpnFMdGjRlCjyJQfjAA',
    bio: 'Kanat leads our company vision and strategy. With his leadership, we continue to push the boundaries of gaming technology.',
    socials: {
      github: '#',
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    id: 3,
    name: 'Erim Eriz',
    role: 'UI/UX Designer',
    imageUrl: 'https://media.licdn.com/dms/image/v2/D5603AQFd45UBMyFm5g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1684163086172?e=1750896000&v=beta&t=NN-v0LqZl6-6NmrXLNAiXGSZVDjROM3uP4746A_Vz3c',
    bio: 'Erim creates intuitive and engaging user experiences. His designs combine aesthetics with functionality to delight our users.',
    socials: {
      github: '#',
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    id: 4,
    name: 'Batuhan Kurt',
    role: 'Project Manager',
    imageUrl: 'https://media.licdn.com/dms/image/v2/C4D03AQFgOSZCL-MYnQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1658862453425?e=2147483647&v=beta&t=BiTxATbHjg_S7HZgCDf8sJBECP08sqOY7_AO5pkZrOc',
    bio: 'Batuhan ensures our projects are delivered on time and to the highest standards. His organizational skills keep our team efficient and focused.',
    socials: {
      github: '#',
      linkedin: '#',
      twitter: '#',
    },
  },
];

const TeamPage = () => {
  return (
    <div className="flex-grow py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Our Team
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the talented individuals behind EpicLoot who work together to provide you with the ultimate gaming experience.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {teamMembers.map((member) => (
            <div key={member.id} className="group">
              <div className="relative overflow-hidden rounded-2xl shadow-lg transform transition duration-500 hover:shadow-2xl group-hover:scale-105">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70 z-10"></div>
                
                {/* Image */}
                <img 
                  src={member.imageUrl} 
                  alt={member.name} 
                  className="w-full h-96 object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform transition-transform duration-500">
                  <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-purple-300 font-medium mb-2">{member.role}</p>
                  
                  {/* Social icons */}
                  <div className="flex space-x-3 mb-4 opacity-0 transform -translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    {member.socials.github && (
                      <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300 transition-colors">
                        <FaGithub className="w-5 h-5" />
                      </a>
                    )}
                    {member.socials.linkedin && (
                      <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300 transition-colors">
                        <FaLinkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300 transition-colors">
                        <FaTwitter className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Bio - outside the card */}
              <div className="mt-4 text-center px-4">
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage; 