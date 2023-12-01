import  { useState } from "react";


function PopupForm({ onNameChange }) {
    const [isOpen, setIsOpen] = useState(true);
    const [name, setName] = useState('');

    const handleSubmit = (event) => {
      event.preventDefault();
      // Hier können Sie den Namen an Ihre Backend-API senden
      console.log("name", name)
      onNameChange(name)
      setIsOpen(false);
    };

    

    if (!isOpen) {
        return null
    }

    return (
      <div className="fixed inset-0 bg-gray-900 opacity-70 z-50 flex items-center justify-center">
        <div className="bg-slate-50 p-20 rounded-lg w-[800px]">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
            
              <input
                className="text-4xl border border-gray-400 p-6 w-full rounded-lg"
                placeholder="Enter your Name"
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <button
              className="w-full text-2xl bg-blue-500 text-white p-5 rounded-3xl hover:bg-blue-600"
              type="submit"
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    );
  }

  export default PopupForm;