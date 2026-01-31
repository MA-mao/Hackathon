import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Templates = () => {
  const [selected, setSelected] = useState(1);

  const templates = [
    {
      id: 1,
      name: "Modern Professional",
      category: "Corporate Jobs",
      desc: "Clean, ATS-friendly design for corporate roles",
      color: "from-blue-500 to-blue-700",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      style: "modern",
      icon: "💼"
    },
    {
      id: 2,
      name: "Creative Portfolio",
      category: "Design/Creative",
      desc: "Modern layout with visual appeal for creative fields",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-100",
      style: "creative",
      icon: "🎨"
    },
    {
      id: 3,
      name: "Minimalist Elegant",
      category: "General Purpose",
      desc: "Simple, elegant design that works for all industries",
      color: "from-gray-700 to-gray-900",
      bgColor: "bg-gradient-to-br from-gray-50 to-gray-100",
      style: "minimal",
      icon: "✨"
    }
  ];

  const preview = {
    name: "John Doe",
    title: "Software Developer",
    email: "john.doe@example.com",
    phone: "+1 (123) 456-7890",
    summary: "Experienced developer with 5+ years in web technologies",
    education: "B.Tech Computer Science - MIT (2018-2022)",
    experience: "Senior Developer at TechCorp (2020-Present)",
    skills: "React, Node.js, MongoDB, AWS, TypeScript"
  };

  const selectTemplate = (id) => {
    setSelected(id);
    Swal.fire('Template Selected!', `You selected ${templates.find(t => t.id === id).name}`, 'success');
    localStorage.setItem('selectedTemplate', id);
    window.location.href = '/create-resume';
  };

  const renderPreview = (template) => {
    const { style, bgColor } = template;
    
    if (style === 'modern') {
      return (
        <div className={`bg-white p-6 rounded-lg shadow-inner border-2 border-blue-200 ${bgColor}`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{preview.name}</h3>
              <p className="text-blue-600 font-medium">{preview.title}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">{preview.email}</p>
              <p className="text-sm text-gray-600">{preview.phone}</p>
            </div>
          </div>
          <div className="border-t pt-4">
            <h4 className="font-bold text-gray-700 mb-2">SUMMARY</h4>
            <p className="text-sm text-gray-600">{preview.summary}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div><h4 className="font-bold text-gray-700 mb-1">EDUCATION</h4><p className="text-sm text-gray-600">{preview.education}</p></div>
            <div><h4 className="font-bold text-gray-700 mb-1">EXPERIENCE</h4><p className="text-sm text-gray-600">{preview.experience}</p></div>
          </div>
        </div>
      );
    }

    if (style === 'creative') {
      return (
        <div className={`bg-white p-6 rounded-lg shadow-inner border-l-4 border-purple-500 ${bgColor}`}>
          <div className="flex items-center mb-6">
            <div className="w-3 h-20 bg-gradient-to-b from-purple-500 to-pink-500 mr-4 rounded"></div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{preview.name}</h3>
              <p className="text-purple-600">{preview.title}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex"><div className="w-1/4 font-bold text-gray-700">Contact</div><div className="w-3/4 text-gray-600"><p>{preview.email}</p><p>{preview.phone}</p></div></div>
            <div className="flex"><div className="w-1/4 font-bold text-gray-700">Profile</div><div className="w-3/4 text-gray-600">{preview.summary}</div></div>
            <div className="flex"><div className="w-1/4 font-bold text-gray-700">Skills</div><div className="w-3/4"><div className="flex flex-wrap gap-2">{preview.skills.split(', ').map((s, i) => <span key={i} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">{s}</span>)}</div></div></div>
          </div>
        </div>
      );
    }

    if (style === 'minimal') {
      return (
        <div className={`bg-white p-6 rounded-lg shadow-inner ${bgColor}`}>
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">{preview.name}</h3>
            <p className="text-gray-500 mt-1">{preview.title}</p>
            <div className="flex justify-center space-x-4 mt-2 text-sm text-gray-600">
              <span>{preview.email}</span><span>•</span><span>{preview.phone}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div><div className="h-px bg-gray-300 mb-2"></div><p className="text-gray-600 italic">{preview.summary}</p></div>
            <div className="flex">
              <div className="w-1/2 pr-4 border-r"><h4 className="font-bold text-gray-700 mb-2">EDUCATION</h4><p className="text-gray-600 text-sm">{preview.education}</p></div>
              <div className="w-1/2 pl-4"><h4 className="font-bold text-gray-700 mb-2">EXPERIENCE</h4><p className="text-gray-600 text-sm">{preview.experience}</p></div>
            </div>
          </div>
        </div>
      );
    }
  };

  const features = [
    { name: "ATS Friendly", t1: "✅", t2: "✅", t3: "✅" },
    { name: "Custom Colors", t1: "✅", t2: "✅", t3: "✅" },
    { name: "Creative Design", t1: "Medium", t2: "High", t3: "Low" },
    { name: "Best For", t1: "Corporate Jobs", t2: "Creative Fields", t3: "All Industries" }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Resume Template</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Select from professionally designed templates.</p>
      </div>

      {/* Templates Grid */}
      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        {templates.map((t) => (
          <div key={t.id} className={`flex flex-col h-full rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl ${selected === t.id ? 'ring-2 ring-blue-500' : ''}`}>
            <div className={`p-6 ${t.bgColor} flex-1`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{t.icon}</span>
                    <span className={`px-3 py-1 bg-white text-xs font-medium rounded-full ${t.color.replace('from-', 'text-').replace(' to-', '')}`}>{t.category}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{t.name}</h3>
                </div>
                {selected === t.id && <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">Selected</span>}
              </div>
              <p className="text-gray-600 mb-6">{t.desc}</p>
              <div className="h-64 overflow-y-auto"><div className="scale-90 origin-top">{renderPreview(t)}</div></div>
            </div>
            <div className="bg-white p-4 border-t">
              <div className="flex justify-between items-center space-x-4">
                <button onClick={() => setSelected(t.id)} className={`px-4 py-2 rounded-lg font-medium ${selected === t.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  {selected === t.id ? 'Selected ✓' : 'Select'}
                </button>
                <button onClick={() => selectTemplate(t.id)} className={`flex-1 bg-gradient-to-r ${t.color} text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 min-w-[140px]`}>
                  Use Template
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="bg-gray-50 p-8 rounded-2xl mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Template Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="bg-white"><th className="p-4 text-left">Feature</th>{templates.map(t => <th key={t.id} className="p-4 text-center">{t.name}</th>)}</tr></thead>
            <tbody>
              {features.map((f, i) => (
                <tr key={i} className={i < features.length - 1 ? 'border-b' : ''}>
                  <td className="p-4 font-medium">{f.name}</td>
                  <td className="p-4 text-center">{f.t1}</td>
                  <td className="p-4 text-center">{f.t2}</td>
                  <td className="p-4 text-center">{f.t3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Large Preview */}
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Preview: {templates.find(t => t.id === selected)?.name}</h2>
          <div className="flex space-x-4">
            <button onClick={() => setSelected(selected > 1 ? selected - 1 : 3)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">← Previous</button>
            <button onClick={() => selectTemplate(selected)} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-bold hover:opacity-90">Use This Template</button>
            <button onClick={() => setSelected(selected < 3 ? selected + 1 : 1)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Next →</button>
          </div>
        </div>
        <div className="max-w-3xl mx-auto mb-8">{renderPreview(templates.find(t => t.id === selected))}</div>
        <div className="text-center">
          <button onClick={() => selectTemplate(selected)} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:opacity-90">
            Use {templates.find(t => t.id === selected)?.name} Template
          </button>
          <p className="text-gray-600 mt-4 text-sm">You can customize colors and layout after selection</p>
        </div>
      </div>
    </div>
  );
};

export default Templates;