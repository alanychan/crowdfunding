import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard(props) {
  const { projectData } = props;

  return (
    <>
    <div className="wrapper">
    <div className="grids top">
      <div className="grid-10 grid">
        <div className="slides">
            <img src={projectData.image} />
            <h2>{projectData.title}</h2>
            <p>{projectData.description}</p>
          <Link to={`/project/${projectData.id}`}> 
            Click here to pledge your support
          </Link>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}

export default ProjectCard;