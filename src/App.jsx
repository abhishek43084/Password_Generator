import { useState, useEffect, useRef } from "react";
import { RefreshCcw } from "lucide-react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charactorAllowed, setCharactorAllowed] = useState(false);
  const [count, setCount] = useState(0);

  const passwordGenerator = () => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "1234567890";
    if (charactorAllowed) str += "`~!@#$%^&*{}[]?/':;";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  };

  useEffect(() => {
    passwordGenerator();
  }, []);

  const passwordRef = useRef(null);

  const passCopyToClipboard = () => {
    passwordRef.current?.select();
    // alert(passwordRef.current.value);
    // console.log("passwordRef.current", passwordRef.current);
    window.navigator.clipboard.writeText(password);
  };

  return (
    <>
      <div className="max-w-3xl px-14 py-5 mx-auto mt-10 shadow-2xl rounded-lg bg-gray-800 text-center">
        <h1 className="text-teal-400 text-3xl mb-3">Password Generator</h1>
        <div className="flex rounded-xl overflow-hidden shadow-sm">
          <input
            type="text"
            id="inputPass"
            placeholder="Password"
            value={password}
            readOnly
            ref={passwordRef}
            className="flex-1 bg-white px-2 text-2xl outline-none"
          />
          <button
            onClick={passCopyToClipboard}
            className="bg-emerald-500 text-2xl outline-none hover:bg-emerald-400 cursor-pointer text-white py-4 px-2 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex justify-center gap-x-6 mt-5 text-lg">
          <div className="flex items-center ">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer"
            />
            <label className="ml-2 text-teal-400">Length: {length}</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="NumAllowed"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="NumAllowed" className="ml-1 text-teal-400">
              Numbers
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="charAllowed"
              checked={charactorAllowed}
              onChange={() => setCharactorAllowed((prev) => !prev)}
            />
            <label htmlFor="charAllowed" className="ml-1 text-teal-400">
              Special Charactors
            </label>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={passwordGenerator}
            className="flex items-center gap-2 text-2xl outline-none bg-indigo-600 hover:bg-indigo-500 cursor-pointer text-white py-3 px-2 mt-5 rounded-2xl transition-all"
          >
            <RefreshCcw className="w-6 h-6" />
            Generate
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
