import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef()
  const passRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passArray, setpassArray] = useState([])

  useEffect(() => {
    let pass = localStorage.getItem("pass")
    if (pass) {
      setpassArray(JSON.parse(pass))
    }
  }, [])

  const textCopy = (text) => {
    toast('Copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    });
    navigator.clipboard.writeText(text);
  }
  const showPass = () => {
    passRef.current.type = "text"
    if (ref.current.src.includes("icons/eye-off.svg")) {
      ref.current.src = "icons/eye.svg"
      passRef.current.type = "text"
    }
    else {
      ref.current.src = "icons/eye-off.svg"
      passRef.current.type = "password"
    }

  }

  const savePass = () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      setpassArray([...passArray, { ...form, id: uuidv4() }])
      localStorage.setItem("pass", JSON.stringify([...passArray, { ...form, id: uuidv4() }]))
      setform({ site: "", username: "", password: "" })
      toast('Password saved successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
    }
    else {
      toast('Password not saved !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
    }
  }
  const deletePass = (id) => {
    let c = confirm("Do you really want to delete this password?")
    if (c) {
      setpassArray(passArray.filter(item => item.id !== id))
      localStorage.setItem("pass", JSON.stringify(passArray.filter(item => item.id !== id)))
      toast('Password deleted!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
    }
  }
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  const editPass = (id) => {
    setform(passArray.filter(i => i.id === id)[0])
    setpassArray(passArray.filter(item => item.id !== id))
  }



  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce" />
      <ToastContainer />

      <div className="absolute top-0 z-[-2] h-screen w-screen bg-green-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className=" p-3 md:my-cont min-h-[84.2vh]">
        <h1 className='text-4xl font-bold text-center'> <span className='text-green-500'>  &lt;</span>
          Pass
          <span className='text-green-500'>OP/&gt;</span></h1>
        <p className='text-center text-lg text-green-900'>Your own password Manager</p>

        <div className="flex flex-col p-4 text-black gap-8 items-center  ">
          <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="site" id="site" />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8 ">
            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="username" id="username" />
            <div className="relative">
              <input ref={passRef} value={form.password} onChange={handleChange} placeholder='Enter Password ' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name="password" id="password"  />
              <span className='absolute right-[3px] top-[4px] cursor-pointer ' onClick={showPass}>
                <img ref={ref} className='p-1' width={26} src="./icons/eye.svg" alt="eye" />
              </span>
            </div>
          </div>
          <button onClick={savePass} className='flex justify-center items-center gap-2  bg-green-400  hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900 '>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover">
            </lord-icon>Save Password</button>
        </div>
        <div className="passwords">
          <h2 className='py-4 font-bold text-2xl'>Your Passwords</h2>
          {passArray.length === 0 && <div>No Passowrds to show</div>}
          {passArray.length != 0 && <table className=" table-auto w-full rounded-md overflow-hidden mb-10  ">
            <thead className='bg-green-800 text-white'>
              <tr>
                <th className='py-2 '>Site</th>
                <th className='py-2 '>Username</th>
                <th className='py-2 '>Passowrd</th>
                <th className='py-2 '>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-green-200 '>
              {passArray.map((item, index) => {
                return <tr key={index}>
                  <td className='  py-2 border border-white text-center'>
                    <div className=' flex items-center justify-center'>
                      <a href={item.site} target='_blank'>{item.site}</a>
                      <div className='lordiconcopy h-2 cursor-pointer rounded-full flex justify-center items-center' onClick={() => { textCopy(item.site) }}>
                        <lord-icon className={"cursor-pointer h-2"}
                          src="https://cdn.lordicon.com/depeqmsz.json"
                          style={{ "width": "25px", "height": "25px" }}
                          trigger="hover">
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className=' py-2 border border-white text-center '>
                    <div className=' flex items-center justify-center'>
                      <span>{item.username}</span>
                      <div className='lordiconcopy h-2 cursor-pointer rounded-full flex justify-center items-center' onClick={() => { textCopy(item.username) }}>
                        <lord-icon className={"cursor-pointer h-2"}
                          src="https://cdn.lordicon.com/depeqmsz.json"
                          style={{ "width": "25px", "height": "25px" }}
                          trigger="hover">
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='  py-2  border border-white text-center '>
                    <div className=' flex items-center justify-center'>
                      <span>{item.password}</span>
                      <div className='lordiconcopy h-2 cursor-pointer rounded-full flex justify-center items-center' onClick={() => { textCopy(item.password) }}>
                        <lord-icon className={"cursor-pointer h-2"}
                          src="https://cdn.lordicon.com/depeqmsz.json"
                          style={{ "width": "25px", "height": "25px" }}
                          trigger="hover">
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='  flex items-center justify-center py-2  border border-white text-center '>
                    <span className='cursor-pointer' onClick={() => { editPass(item.id) }}>
                      <lord-icon className={"cursor-pointer h-2"}
                        src="https://cdn.lordicon.com/gwlusjdu.json"
                        style={{ "width": "25px", "height": "25px" }}
                        trigger="hover">
                      </lord-icon>
                    </span>
                    <span className='cursor-pointer' onClick={() => { deletePass(item.id) }}>
                      <lord-icon className={"cursor-pointer h-2"}
                        src="https://cdn.lordicon.com/skkahier.json"
                        style={{ "width": "25px", "height": "25px" }}
                        trigger="hover">
                      </lord-icon>
                    </span>
                  </td>

                </tr>
              })}

            </tbody>
          </table>}
        </div>
      </div>
    </>

  )
}

export default Manager
