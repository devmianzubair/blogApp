import React, { useState, useEffect } from 'react'
import { Avatar, Card, Button } from 'antd';
import firebase from "../../firebase/config"
import { useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom"
import { UserOutlined } from '@ant-design/icons';
const ViewProfile = () => {
    const [userDetails, setUserDetails] = useState()
    const auth = useSelector(state => state.userAuth)
    const history = useHistory()
    useEffect(() => {
        firebase.firestore().collection("users")
            .doc(auth.userId)
            .get()
            .then(snapshot => setUserDetails(snapshot.data()))

    }, [])

    if (auth.userId) {
        return (
            <div className="profile">
                {userDetails ? (
                    <Card hoverable style={{
                        textAlign: 'center',
                        backgroundColor: '#f8f8f8'
                    }}>
                        <Avatar size={100}
                            icon={<img src={userDetails.imageUrl} alt="profile_pic" />}
                        />

                        <Card
                            hoverable
                            style={{ marginTop: '10px', backgroundColor: 'white' }}
                        >
                            <p>{userDetails.name}</p>
                            <p>{userDetails.email}</p>
                            <p>{userDetails.phone}</p>
                        </Card>
                    </Card>
                ) : (
                    <Card hoverable style={{
                        textAlign: 'center',
                        backgroundColor: '#f8f8f8'
                    }}>
                        <Avatar size={100}
                            icon={<UserOutlined />}
                        />

                        <Card
                            hoverable
                            style={{ marginTop: '10px', backgroundColor: 'white' }}
                        >
                            <Button type="primary" onClick={() => history.push(`/user/edit/profile/${auth.userId}`)}>
                                Update Profile First
                            </Button>
                            {/* <p>Update Profile First </p> */}
                        </Card>
                    </Card>
                )}

            </div>
        )

    } else {
        return (
            <Redirect to="/signin" />
        )

    }

}

export default ViewProfile
