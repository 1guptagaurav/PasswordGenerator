import { useState,useCallback, useEffect, useRef} from 'react'

import './App.css'

function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef= useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(characterAllowed) str += "!@#$%^&*()_+:;<>?/"
    for(let i=0 ; i<length ; i++){
      let index = Math.floor(Math.random()*str.length)
      pass+=str[index]
    }
    setPassword(pass)
  },[length,numberAllowed,characterAllowed])

  const copyToClipboard= useCallback( () => {
    console.log("Rerendered");
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)}
    ,[password])


  useEffect(()=>{passwordGenerator()},[length,numberAllowed,characterAllowed])

  
  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 py-12'>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type='text' value={password} className='outline-none w-full py-none px-3 rounded-l-lg' placeholder='password' ref={passwordRef} readOnly />
        <button className='bg-blue-700 rounded-r-xl px-3 py-1' onClick={()=>{copyToClipboard()}}>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div classname='flex items-center gap-x-1'>
          <input type='range' min={8} max={24} value={length} className='cursor-pointer' onChange={(e)=> setLength(e.target.value)}/>
          <label>Length: {length}</label>
          <div className='flex items-center gap-x-1'>
          <input type='checkbox'  defaultChecked={numberAllowed} id='numberInput' onChange={()=> (setNumberAllowed((prev) => !prev))}/>
          <label htmlFor='numberInput'>Numbers</label></div> 
          <div className='flex items-center gap-x-1'>
          <input type='checkbox'  defaultChecked={characterAllowed} id='characterInput' onChange={()=> (setCharacterAllowed((prev) => !prev))}/>
          <label htmlFor='characterInput'>Characters</label></div> 
        </div>
      </div>
     </div>
    </>
  )
}
export default App
