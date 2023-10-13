import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';
import "./NotFoundPage.scss"
const NotFoundPage = () => {
  const navigate = useNavigate()
  const backLoginFunction = () => {
    navigate("/")
  }

  return  (<Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button className='ofa__notfound__btn' onClick={backLoginFunction} type="primary">Back Home</Button>}
  />)
  }
export default NotFoundPage;