import { useState, useEffect } from "react";

// Components
import ProjectCard from "../components/ProjectCard/ProjectCard";

// Data
// import { allProjects } from "../data";

function HomePage() {
  //State
  //projectList stores the variables
  //setProjectList set the state
  const [projectList, setProjectList] = useState([]);

  // useEffect(() => {
  //   //const baseURL = import.meta.env.VITE_API_URL; 
  //   //fetch(`${baseURL}projects`)

  //   fetch(`${import.meta.env.VITE_API_URL}projects`)
  //   .then((results) => {
  //       return results.json(); //turn the results into json
  //     })
  //     .then((data) => {
  //     setProjectList(data); //asynchronous code
  //     });
  // }, []);


  useEffect( () => {
    const fetchProjectList = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}projects`
        );
        console.log(res);
        const data = await res.json();
        setProjectList(data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchProjectList();
  }, []);


  return (
      <div>
        <h1>Crowdfund for our future!</h1>
        <div id="project-list">
          {projectList.map((project, key) => {
            return <ProjectCard key={key} projectData={project} />;
          })}
        </div>
      </div>
  );
}

export default HomePage;