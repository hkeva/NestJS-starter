import { useEffect, useState } from "react"
import { useGetPostsQuery } from "../../redux/post/postService"
import background from "../../assets/images/capture.jpg"
import "./index.scss"
import { BlogPost } from "../../components/blogPost"
import { Button } from "../../components/button"
import { TextInput } from "../../components/textInput"
import Spinner from "../../components/spinner"

export interface HomepageProps {}

export const Homepage: React.FC<HomepageProps> = ({}) => {
  const { data: postData, isLoading, isSuccess } = useGetPostsQuery({})
  const [data, setData] = useState<any[]>([])
  const [visible, setVisible] = useState(3)

  useEffect(() => {
    isSuccess && setData(postData)
  }, [isSuccess])

  const showMoreItems = () => {
    setVisible((prev) => prev + 3)
  }

  const getSearchedData = (val: string) => {
    if (postData) {
      const tempData = [...postData]
      const searchedData = tempData.filter((op) =>
        op.title.toLowerCase().trim().includes(val.toLowerCase().trim())
      )
      setData(searchedData)
    }
  }

  return (
    <div className="homepage">
      <div className="homepage__background">
        <img src={background} alt="background-image" />
      </div>

      {isLoading && <Spinner />}

      <div className="homepage__bodyHeader">
        <div className="homepage__bodyHeaderTitle">Latest posts</div>
        <TextInput
          placeholder="Search here..."
          setValue={(val: string) => {
            getSearchedData(val)
          }}
        />
      </div>

      {data &&
        data.slice(0, visible).map((singlePost: any) => {
          return (
            <BlogPost
              title={singlePost.title}
              imagePath={singlePost.imageFile}
              details={singlePost.text}
              date={singlePost.createdAt}
            />
          )
        })}

      <div className="homepage__loadMore">
        {data && data.length > visible && (
          <Button buttonTitle="Load more content" handleClick={showMoreItems} />
        )}
      </div>
    </div>
  )
}
