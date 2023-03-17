import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard(props) {
  const { projectData } = props;

  return (
    <>
    <div>
        <div className="project-card">
            <img src={projectData.image} />
            <h2>{projectData.title}</h2>
            <p>{projectData.description}</p>
          <Link to={`/project/${projectData.id}`}> 
            Click here to pledge your support
          </Link>
        </div>
      </div>
    </>
  );
}

export default ProjectCard;