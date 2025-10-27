import { useEffect, useState } from 'react'
import './App.css'
import CodeReView from './components/codeReView'
import 'prismjs/themes/prism-tomorrow.css';
import Prism from 'prismjs';
import Editor from 'react-simple-code-editor'
import axios from 'axios';

function App() {
  const [code, setCode] = useState(`
//sample example code

function main() {
  console.log("Hello, world!");
}
  `);

  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const URL = import.meta.env.VITE_BACKED_URL;

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const handleReviewBtn = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${URL}/ai/getResponse`, { code });
      setReview(data);
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("Failed to load review.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col md:flex-row py-2 bg-gray-900 text-white font-sans">
      
      {/* Code Editor Panel */}
      <div className="md:w-1/2 w-full p-4 h-150 mx-2 flex flex-col bg-gray-800 rounded-sm border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-200">Code Editor</h2>
          <button
            onClick={handleReviewBtn}
            className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 rounded transition duration-200"
          >
            Review Code
          </button>
        </div>
        
   <div className="flex-1 max-h-[calc(100vh-10px)] custom-scrollbar  overflow-auto rounded-md">
  <Editor
    value={code}
    onValueChange={setCode}
    highlight={code =>
      Prism.highlight(code, Prism.languages.javascript, 'javascript')
    }
    padding={20}
    className="w-full h-130 font-mono text-sm bg-gray-900 text-white rounded-md outline-none"
  />
    </div>

      </div>

      {/* Review Panel */}
    <div className="md:w-1/2 w-full h-[37.3rem] p-4 bg-gray-850 bg-white/5">
  <h2 className="text-lg font-semibold text-gray-200 mb-4">AI Review</h2>
  
  <div className="h-[32.5rem] overflow-auto bg-gray-800 p-4 rounded-md border border-gray-700 custom-scrollbar">
    {loading ? (
      <p className="text-blue-400 animate-pulse">Reviewing your code...</p>
    ) : (
      <CodeReView review={review} />
    )}
  </div>
    </div>

    </div>
  );
}

export default App;
