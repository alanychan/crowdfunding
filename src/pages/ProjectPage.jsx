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
    <div>
      <h2>Created by: {project.owner}</h2>
      <h2>{project.title}</h2>
      <h3>{project.description}</h3>
      <h3>Created at: {date.toLocaleDateString(undefined, options)}</h3>
      <h3>{`Status: ${project.is_open}`}</h3>
      <h3>Pledges:</h3>
      <ul>
        {project.pledges.map((pledgeData, key) => {
          return (
            <li key={key}>
             {pledgeData.amount} from  {pledgeData.supporter ? pledgeData.supporter : "Anonymous"}
            </li>
          );
        })}
      </ul>
      <PledgeForm projectId={project.id}/>
    </div>
  );
}

export default ProjectPage;