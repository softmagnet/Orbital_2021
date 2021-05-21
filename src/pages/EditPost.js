import usePostFetch from '../components/usePostFetch'
import PostChange from './PostChange'

export default function EditPost({ id }) {

  const { data, pending, error } = usePostFetch(id)

  return (
    <div>
        { pending && <div>Loading...</div> }
        { error && <div>{ error } </div> }
        { data && <PostChange data={data}/> }
    </div>    
  )
}
