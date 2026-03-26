import React from 'react';

const ResourcesView = () => {
  const resources = [
    { name: 'Vocabulary Guide', icon: '📖' },
    { name: 'Grammar Tips', icon: '✍️' },
    { name: 'Practice Exercises', icon: '📝' },
    { name: 'Reading Nook', icon: '📚' }
  ];

  return (
    <div className="flex flex-col items-center py-20 px-4 min-h-[70vh] space-y-12">
      <h2 className="font-magic text-[#E9D5FF] text-6xl text-center drop-shadow-lg">
        Grade 3 English Resources
      </h2>

      <div className="w-full max-w-xl bg-amber-100 rounded-sm overflow-hidden shadow-2xl border-4 border-[#77815C]/20">
        {resources.map((res, index) => (
          <button 
            key={res.name}
            className={`w-full py-8 text-3xl font-magic text-[#4A312B] hover:bg-amber-50 hover:text-orange-700 transition-all flex items-center justify-center gap-4 ${
              index !== resources.length - 1 ? 'border-b-4 border-[#77815C]/10' : ''
            }`}
          >
            <span>{res.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResourcesView;
