import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

function App() {
  const [quotes, setQuotes] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchQuote = async () => {
    setIsLoading(true)
    const response = await fetch(`https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`)
    const data = await response.json()
    const value = data.quotes

    const randomIndex = () => {
      return Math.floor(Math.random() * value.length)
    }

    setQuotes(value[randomIndex()]) 
    setIsLoading(false)
  }

  useEffect(() => {
    fetchQuote()
    console.log(quotes)
    }, [])

  return (
    <div className="flex justify-center items-center min-h-screen  flex-col"  >
      { isLoading ? 
          <ThreeDots color='black' width='50' height='100' />
        :
        <div className="bg-gray-700 text-white p-4 m-4 rounded-md shadow-lg w-11/12 sm:w-2/3 sm:p-6 lg:w-2/5 lg:p-8">
          <h1 className="text-xl sm:text-2xl">{quotes.quote}</h1>
          <p className="text-gray-400 text-right mt-6">~{quotes.author} </p>
        </div>
      }
      <button onClick={fetchQuote} className='bg-green-600 text-white px-2 py-1 mt-8 rounded-sm hover:bg-green-700 hover:shadow-lg' >New Quote</button>
    </div>
  );
}

export default App;
