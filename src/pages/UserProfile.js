import styles from '../styles/settings.module.css';
import {useToasts} from 'react-toast-notifications';
import {useLocation, useParams, useNavigate} from 'react-router-dom';
import {useAuth} from '../hooks';
import {useEffect, useState} from 'react';
import { addFriend, fetchUserProfile, removeFriend } from '../api';
import { Loader } from '../components';


const UserProfile = () => {
    // const location = useLocation();
    // const { user = {}} = location.state;
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [requestInProgress, setRequestInProgress] = useState(false);
    const {userId} = useParams();
    const {addToast} = useToasts();
    const history = useNavigate();
    const auth = useAuth();

    useEffect(() => {
    const getUser = async () => {
        const response = await fetchUserProfile(userId);

        if(response.success){
            setUser(response.data.user);
        } else{
           addToast(response.message, {
              appearance: 'error'
           });
           return history.push('/');
        }
    }
    getUser();
    }, [userId, history, addToast])

    if(loading){
        return <Loader/>
    }

    const CheckIfUserIsAFriend = () => {
        const friends = auth.user.friends;

        const friendIds = friends.map(friend => friend.to_user._id);
        const index = friendIds.indexOf(userId);

        if(index !== -1){
            return true;
        }

        return false;
    }

    const showAddFriendsBtn = CheckIfUserIsAFriend();

    const handleAddFriendClick = async () =>{
        setRequestInProgress(true);

        const response = await addFriend(userId);

        if(response.success){
           const {friendship} =response.data;

           auth.updateUserFriends(true, friendship);

           addToast('Friend added successfully', {
             appearance: 'success',
           });

        } else {
            addToast(response.message, {
                appearance: 'error',
              });
        }

        setRequestInProgress(false);
    }

    const handleRemoveFriendClick = async () => {
        setRequestInProgress(true);

        const response = await removeFriend(userId);

        if(response.success){
           const friendship = auth.user.friends.filter(
            (friend) => friend.to_user._id !== userId
           );

           auth.updateUserFriends(false, friendship[0]);

           addToast('Friend removed successfully', {
             appearance: 'success',
           });

        } else {
            addToast(response.message, {
                appearance: 'error',
              });
        }

        setRequestInProgress(false);
    }

    return (
        <div className={styles.settings}>
            <div className={styles.imgContainer}>
                <img
                  src='https://cdn-icons-png.flaticon.com/128/3177/3177440.png'
                  alt=''
                />
            </div>
            <div className={styles.fields}>
               <div className={styles.fieldLabel}>Email</div>
               <div className={styles.fieldValue}>{user.email}</div>
            </div>
            <div className={styles.fields}>
               <div className={styles.fieldLabel}>Name</div>
               <div className={styles.fieldValue}>{user.name}</div>
            </div>
            
            <div className={styles.btnGrp}>
                    {showAddFriendsBtn? 
                    (<button className={`button ${styles.saveBtn}`} onClick = {handleRemoveFriendClick} >
                         {requestInProgress? 'Removing friend...' : 'Remove friend'}
                    </button>)
                    :
                    (<button className={`button ${styles.saveBtn}`}
                        onClick = {handleAddFriendClick} 
                        disabled={requestInProgress}>
                        {requestInProgress? 'Adding friend...' : 'Add friend'}
                    </button>)}
                    
                    
            </div>
        </div>
    );
}

export default UserProfile;







































