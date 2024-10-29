import { Button,} from '@mui/joy';
import { useNavigate } from 'react-router-dom';
export default function Btn({name , path}){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(path);
    };


    return(
        <Button variant="solid" color="primary" onClick={handleClick} style={{ marginTop: '30px', width:'100%'}}>
                    {name}
                </Button>
    )
}