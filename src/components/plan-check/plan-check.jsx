import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '@/services/auth.service';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


const PlanCheck = ({ }) => {

    const [Message, setMessage] = useState('');
    const [maxMessage, setMaxMessage] = useState('');
    const dispatch = useDispatch();

    const auth = useSelector((state) => state.auth);

    useEffect(() => {

        console.log(auth?.user);
        console.log("articleCount",auth?.user?.articleCount);

        if (auth?.isLoggedIn && auth?.user) {

            if (!auth.user?.isOnPlan) {
                setMessage(`Vous êtes en abonnement d'essai. Vous avez le droit de publier uniquement 3 annonces.`);
                if (auth?.user?.articleCount >= 2) {
                    setMaxMessage(`Vous êtes en abonnement d'essai et avez atteint le nombre maximal de 2 articles.`);
                }
            }
            else if (auth?.user?.articleCount >= auth.user.plan?.maxPosts) {
                setMessage(`Vous avez atteint le nombre maximal de publications pour votre plan.`);

            } else {
                setMessage('');
            }
        }
    }, [auth]);

    return (
        <>

            {Message && (
                <div className="alert alert-danger" role="alert">
                    <div>
                        <h5>{Message}</h5>
                        <p className="text">{maxMessage}</p>

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
