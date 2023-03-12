import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PledgeForm from "../components/PledgeForm/PledgeForm"; //Import pledge form in here


//Dummy Data
// import { oneProject } from "../data";

function ProjectPage() {
  //State
  const [project, setProject] = useState({ pledges: []});
  
  //Hooks
  const { id } = useParams();

  //Effects
  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_API_URL}projects/${id}`)
  //   .then((results) => {
  //     return results.json();
  //   })
  //   .then((data) => {
  //     setProject(data);
  //   });
  // }, []);

  const capitalizeFirstLowercaseRest = str => {
    return (
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    );
  };

  const capitalizeFirst = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect( () => {
    const fetchProject = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}projects/${id}`
        );
        //console.log(res);
        const data = await res.json();
        setProject(data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchProject();
  }, []);

  const date = new Date(project.date_created);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  // console.log(projectData.pledges)

  return (
    <>
    <div className="wrapper">
      <div className="grids top">
      <div className="grid-6 grid">
          <div className="slides">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <img src={project.image} />
            <p>Project owner: {project.owner} on {date.toLocaleDateString(undefined, options)}</p>
            {/* <h3>{`Status: ${project.is_open}`}</h3> */}
          </div>
        </div>
        <div className="grid-10 grid">
          <div className="slides">
            <h2>Pledges:</h2>
            <ul>
              {project.pledges.map((pledgeData, key) => {
                return (
                  <li key={key}>
                  {pledgeData.amount} from  {capitalizeFirst(pledgeData.supporter ? pledgeData.supporter : "Anonymous")}
                  </li>
                );
              })}
            </ul>
            <PledgeForm projectId={project.id}/>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default ProjectPage;