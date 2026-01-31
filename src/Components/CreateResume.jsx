import React, { useState } from 'react';
import { ref, push, set } from 'firebase/database'; 
import { jsPDF } from 'jspdf';
import Swal from 'sweetalert2';
import { db } from '../firebase';

export default function CreateResume() {
  // Form state
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '',
    education: '', experience: '', skills: '', summary: ''
  });

  // Handle input change
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

 const saveResume = async (e) => {
  e.preventDefault();
  
  // Check database
  if (!db) {
    Swal.fire({
      icon: 'error',
      title: 'Database Error',
      text: 'Database not connected!'
    });
    return;
  }
  
  try {
    // Save to Firebase
    const resumesRef = ref(db, 'resumes');
    const newRef = push(resumesRef);
    await set(newRef, form);
    
    // Success alert
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Resume saved successfully!',
      timer: 2000
    });
    
  } catch (error) {
    // Error alert
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: error.message
    });
  }
};

  // Create PDF
  const makePDF = () => {
    if (!form.name.trim()) {
      Swal.fire('Warning', 'Enter your name first', 'warning');
      return;
    }

    const pdf = new jsPDF();
    
    pdf.setFontSize(24);
    pdf.setTextColor(30, 64, 175);
    pdf.text('RESUME', 105, 20, { align: 'center' });
    
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    
    // Personal info
    pdf.setFont(undefined, 'bold');
    pdf.text('PERSONAL INFORMATION', 20, 35);
    pdf.setFont(undefined, 'normal');
    pdf.text(`Name: ${form.name}`, 20, 45);
    pdf.text(`Email: ${form.email}`, 20, 55);
    pdf.text(`Phone: ${form.phone}`, 20, 65);
    pdf.text(`Address: ${form.address}`, 20, 75);
    
    // Education
    pdf.setFont(undefined, 'bold');
    pdf.text('EDUCATION', 20, 90);
    pdf.setFont(undefined, 'normal');
    const eduLines = pdf.splitTextToSize(form.education || 'Not specified', 170);
    pdf.text(eduLines, 20, 100);
    
    // Experience
    pdf.setFont(undefined, 'bold');
    pdf.text('EXPERIENCE', 20, 130);
    pdf.setFont(undefined, 'normal');
    const expLines = pdf.splitTextToSize(form.experience || 'Not specified', 170);
    pdf.text(expLines, 20, 140);
    
    // Skills
    pdf.setFont(undefined, 'bold');
    pdf.text('SKILLS', 20, 180);
    pdf.setFont(undefined, 'normal');
    const skillLines = pdf.splitTextToSize(form.skills || 'Not specified', 170);
    pdf.text(skillLines, 20, 190);
    
    pdf.save(`${form.name.replace(/\s+/g, '_')}_Resume.pdf`);
  };

  // Clear form
  const clearForm = () => {
    setForm({
      name: '', email: '', phone: '', address: '',
      education: '', experience: '', skills: '', summary: ''
    });
  };

  // Form fields config
  const fields = [
    { name: 'name', label: 'Full Name *', type: 'text', placeholder: 'John Doe', required: true, cols: 1 },
    { name: 'email', label: 'Email *', type: 'email', placeholder: 'john@example.com', required: true, cols: 2 },
    { name: 'phone', label: 'Phone *', type: 'tel', placeholder: '+91 9876543210', required: true, cols: 2 },
    { name: 'address', label: 'Address', type: 'textarea', placeholder: 'City, State, Country', rows: 2, cols: 1 },
    { name: 'education', label: 'Education *', type: 'textarea', placeholder: 'Degree, University, Year, CGPA', rows: 3, required: true, cols: 1 },
    { name: 'experience', label: 'Work Experience *', type: 'textarea', placeholder: 'Company, Position, Duration', rows: 3, required: true, cols: 1 },
    { name: 'skills', label: 'Skills *', type: 'textarea', placeholder: 'List your skills separated by commas', rows: 3, required: true, cols: 1 },
    { name: 'summary', label: 'Professional Summary', type: 'textarea', placeholder: 'Brief about your career objectives', rows: 3, cols: 1 }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Your Resume</h1>
      <p className="text-center text-gray-600 mb-8">Fill in your details and download as PDF</p>
      
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Form Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <form onSubmit={saveResume} className="space-y-6">
            {fields.map((field) => (
              <div key={field.name} className={field.cols === 2 ? 'grid md:grid-cols-2 gap-4' : ''}>
                {field.cols === 2 ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleInput}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows={field.rows}
                        placeholder={field.placeholder}
                        required={field.required}
                      />
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleInput}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder={field.placeholder}
                        required={field.required}
                      />
                    )}
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleInput}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows={field.rows}
                        placeholder={field.placeholder}
                        required={field.required}
                      />
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleInput}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder={field.placeholder}
                        required={field.required}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}

            <div className="flex flex-wrap gap-4 pt-4">
              <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition flex-1 min-w-[140px]">
                Save Resume
              </button>
              <button type="button" onClick={makePDF} className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition flex-1 min-w-[140px]">
                Download PDF
              </button>
              <button type="button" onClick={clearForm} className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition flex-1 min-w-[140px]">
                Clear Form
              </button>
            </div>
          </form>
        </div>

        {/* Preview Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Live Preview</h2>
          
          <div className="p-6 border-2 border-dashed border-gray-200 rounded-lg min-h-[600px]">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-blue-700 mb-2">{form.name || 'Your Name Here'}</h1>
                <div className="text-gray-600 space-y-1">
                  <p>{form.email || 'email@example.com'}</p>
                  <p>{form.phone || '+91 9876543210'}</p>
                  <p>{form.address || 'City, State, Country'}</p>
                </div>
              </div>

              <div className="pt-4">
                <h2 className="text-xl font-bold text-gray-800 border-b pb-1 mb-3">EDUCATION</h2>
                <p className="text-gray-700 whitespace-pre-line">{form.education || 'Your educational background'}</p>
              </div>

              <div className="pt-4">
                <h2 className="text-xl font-bold text-gray-800 border-b pb-1 mb-3">EXPERIENCE</h2>
                <p className="text-gray-700 whitespace-pre-line">{form.experience || 'Your work experience'}</p>
              </div>

              <div className="pt-4">
                <h2 className="text-xl font-bold text-gray-800 border-b pb-1 mb-3">SKILLS</h2>
                <p className="text-gray-700 whitespace-pre-line">{form.skills || 'Your skills'}</p>
              </div>

              {form.summary && (
                <div className="pt-4">
                  <h2 className="text-xl font-bold text-gray-800 border-b pb-1 mb-3">SUMMARY</h2>
                  <p className="text-gray-700 whitespace-pre-line">{form.summary}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Tip:</span> Fill form to see preview. Click "Download PDF" for resume.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}