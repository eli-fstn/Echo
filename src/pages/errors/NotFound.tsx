import error from "../../assets/errors/error-404.svg"
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-6">
      <img src={error} alt="Error 404" className="w-70 mb-6"/>
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800">ERROR: 404</h1>
      <p className="text-gray-500 mt-4 text-xs md:text-lg">We couldn’t find the page you’re looking for. It may have been moved or doesn't exist.</p>
      <Link to="/" className="text-blue-600 hover:underline">Back to home.</Link>
    </div>
  )
}

export default NotFound;