import axios from 'axios';
import { Highlight, themes } from 'prism-react-renderer';
import React, { useState, useRef } from 'react';
import { SecurityAnalysisLoader } from '../components/SecurityAnalysisLoader';
import { jsPDF } from 'jspdf';

export default function SecurityAnalysis() {
  const [repoUrl, setRepoUrl] = useState('');
  const [projectOwner, setProjectOwner] = useState('');
  const [outputType, setOutputType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState(
    `🚀 Astronauts are ready to explore your world!\n🧪 We'll bring back the sample and notify if contagious! 🦠`
  );
  const outputRef = useRef(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/analyze', {
        repoUrl: repoUrl + '.git',
        projectOwner: projectOwner,
      });
      setOutputType('📜 Your planet is found to be bio-friendly!');
      setOutput(response.data);
      setRepoUrl('');
      setIsLoading(false);
    } catch (error) {
      setOutputType('🦠 Something contagious being roams around your base!');
      setOutput(error?.response.data);
      setRepoUrl('');
      setIsLoading(false);
    }
  };

  const downloadPDF = () => {
    const pdf = new jsPDF();
    const content = outputRef.current.innerText;

    pdf.setFontSize(10);
    const lines = pdf.splitTextToSize(content, 180);
    pdf.text(10, 10, lines);

    pdf.save('output.pdf');
  };

  return (
    <div className='py-3 mt-5'>
      <div className='flex items-start gap-10 mt-2'>
        <div className='shadow-xl border-2 p-3 pb-5 px-5 border-gray-500 rounded-lg flex-1'>
          <h1 className='text-md font-semibold text-2xl'>🕷️ Detector</h1>
          <p className='mb-4 text-sm text-gray-600 font-medium'>
            Spidey will auto detect if it's Ethereum or Starknet's smart
            contract.
          </p>
          <p className='text-md font-medium'>
            Enter <i className='ri-github-fill'></i> Reposity URL:
          </p>
          <input
            type='text'
            className='border-b-2 focus:outline-none py-1 p-2 border-gray-500 w-[100%] bg-transparent'
            placeholder='https://github.com/username/repo.git'
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
          />

          <p className='mt-5 text-md font-medium'>
            Set project owner (default: it's you!)
          </p>
          <input
            type='text'
            className='border-b-2 focus:outline-none py-1 p-2 border-gray-500 w-[100%] bg-transparent'
            placeholder='0x00A...0000'
            value={projectOwner}
            onChange={(e) => setProjectOwner(e.target.value)}
          />
          <p className='text-sm mt-1 font-medium text-[#ff7675]'>
            Note: Make sure your repo visibility is public.
          </p>
          <SecurityAnalysisLoader fetchData={fetchData} isLoading={isLoading} />
        </div>
        <div className='shadow-xl border-2 p-3 pb-5 px-5 border-gray-500 rounded-lg flex-1 transition-all ease-in-out max-w-[30vw]'>
          <h1 className='text-md font-semibold text-2xl'>🐞 Printer</h1>
          <p className='text-sm text-gray-600 font-medium'>
            Try importing your repository, let's see if something's broken!
          </p>

          <div ref={outputRef}>
            <p className='text-md font-medium mt-4'>
              Build Output: {outputType}
            </p>
            <Highlight theme={themes.github} code={output} language='bash'>
              {({ tokens, getLineProps, getTokenProps }) => (
                <pre className='text-sm border-2 p-1 px-2 overflow-scroll my-1 font-semibold font_code max-h-[40vh]'>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
          <button
            onClick={downloadPDF}
            className='bg-gray-700 text-white mt-5 py-2 px-3 rounded-md text-sm font-semibold ease-in-out transition-all cursor-pointer hover:bg-gray-500'
          >
            Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
}
