import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Templates() {
  const [selected, setSelected] = useState(1);
  const navigate = useNavigate();

  const templates = [
    {
      id: 1,
      name: "Modern Professional",
      category: "Corporate Jobs",
      desc: "Clean, ATS-friendly design for corporate roles",
      color: "from-blue-500 to-blue-700",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      style: "modern",
      icon: "💼",
    },
    {
      id: 2,
      name: "Creative Portfolio",
      category: "Design / Creative",
      desc: "Visual layout for creative professionals",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-100",
      style: "creative",
      icon: "🎨",
    },
    {
      id: 3,
      name: "Minimalist Elegant",
      category: "General Purpose",
      desc: "Simple design suitable for all industries",
      color: "from-gray-700 to-gray-900",
      bgColor: "bg-gradient-to-br from-gray-50 to-gray-100",
      style: "minimal",
      icon: "✨",
    },
  ];

  const preview = {
    name: "John Doe",
    title: "Software Developer",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    summary: "Experienced developer with strong frontend & backend skills",
    education: "BS Computer Science",
    experience: "Frontend Developer – TechCorp",
    skills: "React, Node, MongoDB",
  };

  const selectTemplate = (id) => {
    localStorage.setItem("selectedTemplate", id);

    Swal.fire({
      icon: "success",
      title: "Template Selected",
      timer: 1500,
      showConfirmButton: false,
    });

    navigate("/create-resume");
  };

  const renderPreview = (t) => (
    <div className={`bg-white p-4 rounded-xl shadow ${t.bgColor}`}>
      <h3 className="text-xl font-bold text-gray-800">{preview.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{preview.title}</p>
      <p className="text-xs text-gray-500">{preview.summary}</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-10">
      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Choose Your Resume Template
        </h1>
        <p className="text-gray-600 mt-2">
          Professional & ATS-friendly designs
        </p>
      </div>

      {/* TEMPLATE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((t) => (
          <div
            key={t.id}
            className={`rounded-2xl overflow-hidden shadow-lg ${
              selected === t.id ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <div className={`p-6 ${t.bgColor}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{t.icon}</span>
                <span className="text-xs bg-white px-3 py-1 rounded-full">
                  {t.category}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-800">{t.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{t.desc}</p>

              <div className="h-40 overflow-hidden">
                {renderPreview(t)}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="bg-white p-4 flex gap-3">
              <button
                onClick={() => setSelected(t.id)}
                className="w-1/2 bg-gray-100 py-2 rounded-lg text-sm"
              >
                Select
              </button>

              <button
                onClick={() => selectTemplate(t.id)}
                className={`w-1/2 bg-gradient-to-r ${t.color} text-white py-2 rounded-lg text-sm font-semibold`}
              >
                Use
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* LARGE PREVIEW (HIDDEN ON SMALL SCREENS) */}
      <div className="hidden md:block mt-16 bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Preview: {templates.find(t => t.id === selected)?.name}
        </h2>

        <div className="max-w-xl mx-auto mb-6">
          {renderPreview(templates.find(t => t.id === selected))}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setSelected(selected > 1 ? selected - 1 : 3)}
            className="px-4 py-2 bg-gray-100 rounded-lg"
          >
            Previous
          </button>

          <button
            onClick={() => selectTemplate(selected)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold"
          >
            Use This Template
          </button>

          <button
            onClick={() => setSelected(selected < 3 ? selected + 1 : 1)}
            className="px-4 py-2 bg-gray-100 rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
