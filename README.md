import logoImage from "../../assets/teamsync-log.png";
import React from 'react';
import { 
  RiTaskLine, 
  RiTeamLine, 
  RiCalendar2Line, 
  RiBarChart2Line,
  RiArrowRightLine 
} from 'react-icons/ri';
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen font-sans bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-8">
              <img 
                src={logoImage} 
                alt="TeamSync Logo" 
                className="h-14 w-auto"
              />
              <div className="hidden md:flex items-center space-x-6">
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium">
                  Features
                </a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium">
                  Pricing
                </a>
                <a href="#docs" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium">
                  Docs
                </a>
              </div>
            </div>
            <Link to="/login" className="flex items-center">
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition-colors duration-200 text-sm font-medium">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Side - Description and CTA */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                Manage projects, simply and powerfully
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                TeamSync helps teams organize tasks, track progress, and collaborate seamlessly in one place.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-all duration-200 flex items-center text-sm font-medium shadow-sm hover:shadow-md">
                  Start Free Trial <RiArrowRightLine className="ml-2" />
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md">
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Right Side - Dashboard Preview */}
            <div className="flex-1 w-full">
              <div className="bg-white rounded-xl shadow-lg p-4 transform hover:scale-[1.01] transition-transform duration-200">
                <img 
                  src="https://placehold.co/800x500?text=Dashboard+Preview" 
                  alt="TeamSync Dashboard"
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16 tracking-tight">
            Everything you need to manage projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-200">
              <RiTaskLine className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Task Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Create, assign, and track tasks with ease. Add due dates, priorities, and dependencies.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-200">
              <RiTeamLine className="text-4xl text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Team Collaboration</h3>
              <p className="text-gray-600 leading-relaxed">
                Comment on tasks, share files, and keep everyone in sync with real-time updates.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-200">
              <RiCalendar2Line className="text-4xl text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Timeline View</h3>
              <p className="text-gray-600 leading-relaxed">
                Visualize project timelines and milestones in a clear, interactive Gantt chart.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-200">
              <RiBarChart2Line className="text-4xl text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Get insights into team performance, project progress, and resource allocation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16 tracking-tight">
            Perfect for every team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center gap-6 hover:bg-white p-4 rounded-xl transition-all duration-200">
              <img 
                src="https://placehold.co/300x200?text=Software+Development"
                alt="Software Development"
                className="w-1/2 rounded-lg shadow-sm"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Software Development</h3>
                <p className="text-gray-600 leading-relaxed">
                  Manage sprints, track bugs, and release features faster with integrated workflows.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 hover:bg-white p-4 rounded-xl transition-all duration-200">
              <img 
                src="https://placehold.co/300x200?text=Marketing+Teams"
                alt="Marketing Teams"
                className="w-1/2 rounded-lg shadow-sm"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Marketing Teams</h3>
                <p className="text-gray-600 leading-relaxed">
                  Plan campaigns, manage content calendars, and track deliverables in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            Ready to streamline your projects?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Join thousands of teams using TeamSync to deliver projects on time.
          </p>
          <button className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200 flex items-center mx-auto text-sm font-medium shadow-sm hover:shadow-md">
            Get Started Free <RiArrowRightLine className="ml-2" />
          </button>
        </div>
      </section>

   
    </div>
  );
};

export default LandingPage;