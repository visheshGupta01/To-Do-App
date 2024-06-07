// All imports here
import React, { useEffect, useState } from "react";
import { auth } from "../firebaseconfig";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

const Todomain = () => {
  // State Variables Defined
  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState({
    text: "",
    completed: "False",
  });
  const [userID, setUserId] = useState(0);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [tasks, setTasks] = useState([]);

  // Function on page-load
  useEffect(() => {
    //Check if user if logged-in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        //If user logged-in
        setUser(user);

        //Fetching user-id from api
        const url = new URL(
          "https://6662cf3862966e20ef0a1976.mockapi.io/users"
        );
        url.searchParams.append("emailID", user.email);
        fetch(url, {
          method: "GET",
          headers: { "content-type": "application/json" },
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .then((data) => {
            if (data && data.length > 0) {
              setUserId(data[0].id);

              // Fetching Tasks
              fetch(url, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Network response was not ok");
                  }
                  return response.json();
                })
                .then((userData) => {
                  setTasks(userData[0].tasks);
                });
            }
          });
      } else {
        // If user not logged-in
        navigate("/login");
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Function on adding tasks
  const addTask = () => {
    const fetchUrl =
      "https://6662cf3862966e20ef0a1976.mockapi.io/users/" + userID;

      // Fetching previous tasks
    fetch(fetchUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((userData) => {


        // Add the new task to the existing tasks
        const updatedTasks = [...userData.tasks, newTask];
        const updatedUserData = { ...userData, tasks: updatedTasks };

        // Post the updated user data
        fetch(fetchUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setNewTask({ text: "", completed: "False" });
            setTasks(data.tasks); // Update the state with the new tasks
          })
      })
  };


  // Change data in api on checkbox change
  const handleCheckboxChange = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;

    // Update the state with the new tasks array
    setTasks(updatedTasks);

    // Send the updated task to the server
    const fetchUrl =
      "https://6662cf3862966e20ef0a1976.mockapi.io/users/" + userID;
    fetch(fetchUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tasks: updatedTasks }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })

  };

  // Delete task
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);

    setTasks(updatedTasks);

    const fetchUrl =
      "https://6662cf3862966e20ef0a1976.mockapi.io/users/" + userID;
    fetch(fetchUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tasks: updatedTasks }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
  };


  //Clear Tasks
  const handleClearTasks = () => {
    setTasks([]);

    const fetchUrl =
      "https://6662cf3862966e20ef0a1976.mockapi.io/users/" + userID;
    fetch(fetchUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tasks: [] }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
  };
  return (
    <>
      <header class="text-gray-500 body-font">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span class="ml-3 text-xl">
              {user ? <p>Welcome, {user.email}</p> : <p>Please sign in</p>}
            </span>
          </a>
        </div>
      </header>
      <div className="w-full h-screen bg-gray-100 pt-2">
        <div className="bg-white p-3 max-w-md mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold">ToDo App </h1>
            <div className="mt-4 flex">
              <input
                className="w-80 border-b-2 border-gray-500 text-black"
                type="text"
                placeholder="Enter your task here"
                onChange={(e) => {
                  setNewTask({ text: e.target.value, completed: false });
                }}
                value={newTask.text}
              />
              <button
                onClick={addTask}
                type="submit"
                className="ml-2 border-2 border-green-500 p-2 text-green-500 hover:text-white hover:bg-green-500 rounded-lg flex"
              >
                <svg
                  className="h-6 w-6"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <circle cx="12" cy="12" r="9" />{" "}
                  <line x1="9" y1="12" x2="15" y2="12" />{" "}
                  <line x1="12" y1="9" x2="12" y2="15" />
                </svg>
                <span>Add</span>
              </button>
            </div>
          </div>
          <div className="mt-8">
            <ul>
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <li className="p-2 rounded-lg">
                    <div className="flex align-middle flex-row justify-between">
                      <div className="p-2">
                        <input
                          type="checkbox"
                          className="h-6 w-6 "
                          checked={task.completed === true}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      </div>
                      <div className="p-2">
                        <p
                          className={`text-lg text-black ${
                            task.completed ? "line-through" : ""
                          }`}
                        >
                          {task.text}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteTask(index)}
                        className="flex text-red-500 border-2 border-red-500 p-2 rounded-lg"
                      >
                        <svg
                          className="h-6 w-6 text-red-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          {" "}
                          <circle cx="12" cy="12" r="10" />{" "}
                          <line x1="15" y1="9" x2="9" y2="15" />{" "}
                          <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                        <span>Remove</span>
                      </button>
                    </div>
                    <hr className="mt-2" />
                  </li>
                ))
              ) : (
                <div className="bold">No Tasks Found</div>
              )}
            </ul>
          </div>
          <div className="mt-8 flex items-center justify-center pr-4">
            <button
              onClick={handleClearTasks}
              className="border-2 border-indigo-500 p-2 text-indigo-500 ml-4 "
            >
              Clear Todo List
            </button>
          </div>
        </div>
        <Logout />
      </div>
    </>
  );
};
export default Todomain;
