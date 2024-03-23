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
                setMessage(` Vous êtes actuellement en période d'essai. Vous avez le droit de publier jusqu'à 4 annonces. Profitez-en !`);
                if (auth?.user?.articleCount >= 3) {
                    setMaxMessage(`Vous êtes en abonnement d'essai et avez atteint le nombre maximal de 4 annonces.`);
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
                            Découvrir nos abonnements
                        </Link>
                    </div>
                </div>
            )}

        </>
    );
};

export default PlanCheck;
