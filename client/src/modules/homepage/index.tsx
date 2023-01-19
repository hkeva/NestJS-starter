import { useEffect } from "react"
import { useGetPostsQuery } from "../../redux/post/postService"
import background from "../../assets/images/capture.jpg"
import "./index.scss"
import { BlogPost } from "../../components/blogPost"

export interface HomepageProps {}

export const Homepage: React.FC<HomepageProps> = ({}) => {
  const { data: postData, isLoading } = useGetPostsQuery({})

  return (
    <div className="homepage">
      <div className="homepage__background">
        <img src={background} alt="background-image" />
      </div>

      {isLoading && "Loading data please wait..."}

      {postData &&
        postData.map((singlePost: any) => {
          return (
            <BlogPost
              title={singlePost.title}
              imagePath={singlePost.imageFile}
              details={singlePost.text}
              date={singlePost.createdAt}
            />
          )
        })}
    </div>
  )
}
