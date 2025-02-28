import React from "react";
import { NavLink } from "react-router-dom";
import {
  Brain,
  MessageCircle,
  BarChart2,
  ListChecks,
  BookOpen,
  LogIn,
  UserPlus,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useNavigate } from "react-router-dom";
export function Navbar() {
  const token = localStorage.getItem("token") || "null";
  const navigate = useNavigate();
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-semibold">MindfulAI</span>
            </NavLink>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                {token !== "null" ? (
                  <NavLink
                    to="/chat"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors ${
                        isActive
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`
                    }
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat</span>
                  </NavLink>
                ) : (
                  ""
                )}
                {token !== "null" ? (
                  <NavLink
                    to="/mood-tracker"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors ${
                        isActive
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`
                    }
                  >
                    <BarChart2 className="w-4 h-4" />
                    <span>Mood Tracker</span>
                  </NavLink>
                ) : (
                  ""
                )}
                {token !== "null" ? (
                  <NavLink
                    to="/wellbeing-plan"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors ${
                        isActive
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`
                    }
                  >
                    <ListChecks className="w-4 h-4" />
                    <span>Wellbeing Plan</span>
                  </NavLink>
                ) : (
                  ""
                )}
                <NavLink
                  to="/resources"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors ${
                      isActive
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Resources</span>
                </NavLink>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {token == "null" ? (
              <NavLink
                to="/auth/login"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors ${
                    isActive
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </NavLink>
            ) : (
              ""
            )}
            {token == "null" ? (
              <NavLink
                to="/auth/signup"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors bg-blue-600 text-white hover:bg-blue-700`
                }
              >
                <UserPlus className="w-4 h-4" />
                <span>Sign Up</span>
              </NavLink>
            ) : (
              ""
            )}
            {token == "null" ? (
              ""
            ) : (
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors bg-blue-600 text-white hover:bg-blue-700`
                }
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/auth/login");
                }}
              >
                <UserPlus className="w-4 h-4" />
                <span>Logout</span>
              </NavLink>
            )}
            <ThemeToggle />
            <div className="md:hidden ml-4">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function MobileMenu() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-16 right-0 left-0 bg-white dark:bg-gray-800 shadow-md p-4 z-20">
          <div className="flex flex-col space-y-2">
            <NavLink
              to="/chat"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat</span>
            </NavLink>
            <NavLink
              to="/mood-tracker"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <BarChart2 className="w-4 h-4" />
              <span>Mood Tracker</span>
            </NavLink>
            <NavLink
              to="/wellbeing-plan"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <ListChecks className="w-4 h-4" />
              <span>Wellbeing Plan</span>
            </NavLink>
            <NavLink
              to="/resources"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <BookOpen className="w-4 h-4" />
              <span>Resources</span>
            </NavLink>
            <NavLink
              to="/auth/login"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </NavLink>
            <NavLink
              to="/auth/signup"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 bg-blue-600 text-white hover:bg-blue-700`
              }
              onClick={() => setIsOpen(false)}
            >
              <UserPlus className="w-4 h-4" />
              <span>Sign Up</span>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileMenu;
