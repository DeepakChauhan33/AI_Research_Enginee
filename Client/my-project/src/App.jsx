import { useState } from 'react'


function App() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>

      <section className='h-screen bg-gray-200/50 flex justify-center items-center'>

        <form className=' border text-center p-10' onSubmit={handleSubmit}>

          <div>
            <h2 className='text-3xl font-semibold'>Practice From</h2>
          </div>

          <div className="border flex flex-col gap-3 mt-5" >
            <label className='text-start' htmlFor="name">Name</label>
            <input className='h-12 border' type="text" name="name" placeholder='Enter your name' onChange={handleChange} />
          </div>


          <div className="border flex flex-col gap-3 mt-5">
            <label className='text-start' htmlFor="email">E-mail</label>
            <input className='h-12 border' type="email" name="email" placeholder='Enter your email' onChange={handleChange} />
          </div>


          <div className="border flex flex-col gap-3 mt-5">
            <label className='text-start' htmlFor="password">Password</label>
            <input className='h-12 border' type="password" name="password" placeholder='Enter your Password' onChange={handleChange} />
          </div>


          <button type='submit'
            className='px-6 py-3 mt-7 bg-green-200 hover:bg-green-400'>
            Submit
          </button>
        </form>

      </section>
    </>
  )
}

export default App
