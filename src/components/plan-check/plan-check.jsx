import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '@/services/auth.service';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


const PlanCheck = ({ }) => {

    const [Message, setMessage] = useState('');
    const dispatch = useDispatch();

    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        // Check if user is authenticated and email is not verified
        if (auth.isLoggedIn && auth.user && auth.user.isOnPlan == false) {
            setMessage(`Vous êtes en abonnement d'essai.`);
        } else {
            setMessage('');
        }
    }, [auth]);

    return (
        <>

            {Message && (
                <div className="alert alert-danger" role="alert">
                    <div>
                        <h5>{Message}</h5>
                        <Link
                            className="ud-btn btn-dark"
                            to="/pricing"
                        >
                            Passer à la version Pro
                        </Link>
                    </div>
                </div>
            )}

        </>
    );
};

export default PlanCheck;
