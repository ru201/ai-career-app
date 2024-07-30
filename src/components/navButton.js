import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function NavButton ({ variant, style, route, text }) {
    const navigate = useNavigate();

    return (
        <Button variant={variant} sx={style} onClick={() => navigate(route)}>{text}</Button>
    );
}
