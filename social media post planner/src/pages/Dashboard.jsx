import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  const getDataFromApi = async (token) => {
    let myEndpoint = "http://localhost:5000/api/get_profile";

    try {
      let dataFetched = await fetch(myEndpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!dataFetched.ok) {
        throw new Error("Failed to fetch data");
      }

      let parsedData = await dataFetched.json();
      console.log("Parsed data from backend:", parsedData);

      if (parsedData.message !== "OK") {
        alert("Invalid or expired session. Please login again!");
        window.location.replace("/login/");
        return;
      }

      setUserEmail(parsedData.userData.email);
      setUserName(parsedData.userData.name);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      alert("Please register or login first!");
      window.location.replace("/login/");
    } else {
      getDataFromApi(token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    alert("You have been logged out!");
    window.location.replace("/login/");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-200 via-purple-50 to-yellow-50 text-gray-900 pt-15 mt-23 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center px-10 mb-15">
        <h1 className="text-5xl font-extrabold text-purple-800 drop-shadow-md text-center md:text-left">
          Welcome {userName ? `, ${userName}!` : ""}
        </h1>
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-yellow-500 to-orange-400 text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg mt-6 md:mt-0"
        >
          Logout
        </button>
      </div>

      {/* Create Post Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-10 py-16 bg-white backdrop-blur-md shadow-2xl rounded-3xl m-8 border border-purple-100">
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
          <img
            src="/images/createpost.png"
            alt="Create Post Illustration"
            className="w-80 h-80 object-contain drop-shadow-lg"
          />
        </div>

        <div className="md:w-1/2 space-y-6 pr-10">
          <h2 className="text-4xl font-bold text-purple-800">✍️ Create Post</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Design and share your social media posts effortlessly. Use our easy
            editor to create engaging content with hashtags, captions, and
            scheduling options — all in one place.
          </p>
          <Link
            to="/create-post"
            className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform shadow-md"
          >
            Go to Create Post
          </Link>
        </div>
      </div>

      {/* Hashtag Planner Section */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-between px-10 py-16 bg-yellow-50 shadow-2xl rounded-3xl m-8 border border-yellow-200">
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
          <img
            src="/images/hashtag.png"
            alt="Hashtag Planner Illustration"
            className="w-80 h-80 object-contain drop-shadow-lg"
          />
        </div>

        <div className="md:w-1/2 space-y-6 pl-10">
          <h2 className="text-4xl font-bold text-yellow-700">#️⃣ Hashtag Planner</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Optimize your post reach using our smart hashtag planner. Discover
            trending hashtags and mix them perfectly to attract the right
            audience.
          </p>
          <Link
            to="/hashtag-planner"
            className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform shadow-md"
          >
            Explore Hashtags
          </Link>
        </div>
      </div>

      {/* Automatic Posting Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-10 py-16 bg-gradient-to-r from-white via-purple-100 to-purple-200 shadow-2xl rounded-3xl m-8 border border-purple-200">
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
          <img
            src="/images/automatic.png"
            alt="Auto Posting Illustration"
            className="w-80 h-80 object-contain drop-shadow-lg"
          />
        </div>
        <div className="md:w-1/2 space-y-6 pr-10">
          <h2 className="text-4xl font-bold text-purple-900">🤖 Automatic Posting</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Schedule and automate your posts with ease. Our system handles
            posting across platforms — saving your time and keeping your social
            media active 24/7.
          </p>
          <Link
            to="/auto-posting"
            className="inline-block bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform shadow-md"
          >
            Set Auto Posting
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
