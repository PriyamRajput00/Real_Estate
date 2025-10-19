import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/userSlice'
import { useNavigate} from'react-router-dom'


const OAuth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            
            // Force account selection popup
            provider.setCustomParameters({
                prompt: 'select_account'
            })
            
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider)
            
            const res = await fetch('/api/auth/google', {
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body : JSON.stringify({
                    name: result.user.displayName,  email: result.user.email, photo: result.user.photoURL
                }),
            })
            const data = await res.json();
            dispatch(signInSuccess(data))
            navigate('/');
        } catch (error) {
            console.log('Error signing in with Google', error.message)
        }
    }
  return (
    <button onClick={handleGoogleClick} type='button' className='bg-red-700 text-white p-3 rounded-lg hover:opacity-95'>CONTINUE WITH GOOGLE</button>
  )
}

export default OAuth