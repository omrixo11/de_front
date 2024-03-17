import React, { useState, useEffect } from "react";
import propertyService from "@/services/property.service";
import { useSelector } from "react-redux";

const TopStateBlock = () => {

  const [totalViews, setTotalViews] = useState("0");
  const [totalProperties, setTotalProperties] = useState("0");
  const userId = useSelector((state) => state.auth?.user?._id);
  const token = useSelector((state) => state.auth.token);

  const [favoriteCount, setFavoriteCount] = useState("0");

  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    const fetchTotalViews = async () => {
      try {
        const totalViewsCount = await propertyService.getTotalViewsCountForUser(userId, token);
        const totalPropertiesCount = await propertyService.countUserArticles(userId, token);
        const favoriteArticlesCount = await propertyService.countUserFavoriteArticles(userId, token);


        setTotalViews(totalViewsCount);
        setTotalProperties(totalPropertiesCount);
        setFavoriteCount(favoriteArticlesCount)
      } catch (error) {
        console.error("Error fetching total views count:", error);
      }
    };

    fetchTotalViews();
  }, []);

  return (
    <>
      <div className="col-sm-6 col-xxl-3">
        <div className="d-flex justify-content-between statistics_funfact">
          <div className="details">
            <div className="text fz25">Tous mes biens</div>
            <div className="title">{totalProperties}</div>
          </div>
          <div className="icon text-center">
            <i className="flaticon-home" />
          </div>
        </div>
      </div>

      <div className="col-sm-6 col-xxl-3">
        <div className="d-flex justify-content-between statistics_funfact">
          <div className="details">
            <div className="text fz25">Favoris</div>
            <div className="title">{favoriteCount}</div>
          </div>
          <div className="icon text-center">
            <i className="flaticon-like-empty" />
          </div>
        </div>
      </div>

      <div className="col-sm-6 col-xxl-3">
        <div className="d-flex justify-content-between statistics_funfact">
          <div className="details">
            <div className="text fz25">Mes Vues</div>
            <div className="title">{user?.isOnPlan ? totalViews : <h6>Exclusif<br></br>aux abonnés</h6>}</div>
          </div>
          <div className="icon text-center">
            <i className="flaticon-search-chart" />
          </div>
        </div>
      </div>

      <div className="col-sm-6 col-xxl-3">
        <div className="d-flex justify-content-between statistics_funfact">
          <div className="details">
            <p className="mb-0">Abonnement</p>
            {user?.plan ? (
              <>
                <h6 className="mb-0">{user?.plan?.planName}</h6>
                <p className="mb-0">Encore {Math.max(0, user?.plan?.maxPosts - parseInt(totalProperties, 10))} Annonce(s)</p>
              </>
            ) : (
              <p className="mb-0">Aucun abonnement</p>
            )}
          </div>
          <div className="icon text-center">
            <i className="flaticon-user" />
          </div>
        </div>
      </div>
    </>
  );
};

export default TopStateBlock;
