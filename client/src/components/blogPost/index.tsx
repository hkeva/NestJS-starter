import "./index.scss"

export interface BlogPostProps {
  title: string
  imagePath: string
  details: string
  date: string
}

export const BlogPost: React.FC<BlogPostProps> = ({
  title,
  imagePath,
  details,
  date,
}) => {
  return (
    <div className="blogPost">
      <div>
        <div className="blogPost__info">
          <div className="blogPost__title">{title}</div>
          <div className="blogPost__date">{date}</div>
        </div>
        <div className="blogPost__body">
          <div className="blogPost__image">
            <img src={`http://localhost:5000/${imagePath}`} />
          </div>

          <div className="blogPost__details">{details}</div>
        </div>
      </div>
    </div>
  )
}
