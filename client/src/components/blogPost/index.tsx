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
      <div className="blogPost__posts">
        <div className="blogPost__image">
          <img src={`${process.env.REACT_APP_BACKEND_URL}${imagePath}`} />
        </div>

        <div className="blogPost__content">
          <div className="blogPost__title">{title}</div>
          <div className="blogPost__details">{details}</div>
          <div className="blogPost__date">Created at - {date}</div>
        </div>
      </div>
    </div>
  )
}
