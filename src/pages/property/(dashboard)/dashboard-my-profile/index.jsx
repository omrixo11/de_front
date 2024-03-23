import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import ChangePasswordForm from "@/components/property/dashboard/dashboard-profile/ChangePasswordForm";
import PersonalInfo from "@/components/property/dashboard/dashboard-profile/PersonalInfo";
import ProfileBox from "@/components/property/dashboard/dashboard-profile/ProfileBox";
import SocialField from "@/components/property/dashboard/dashboard-profile/SocialField";
import authService from "@/services/auth.service";
import { updateUserField } from "@/redux/slices/authSlice";
import MetaData from "@/components/common/MetaData";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { updateUser } from "@/redux/slices/authSlice";

const metaInformation = {
  title: "Dessa dashboard - Mon compte",
  description: "Gérez votre compte sur Dessa facilement. Mettez à jour vos informations personnelles, modifiez votre mot de passe, et connectez vos réseaux sociaux pour optimiser votre profil."

};

const DashboardMyProfile = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);
  const token = useSelector((state) => state?.auth?.user?.token);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [changementMessage, setChangementMessage] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isProfileImageUpdated, setIsProfileImageUpdated] = useState(false);


  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    phoneNumber: user.phoneNumber || '',
    companyName: user.companyName || '',
    address: user.address || '',
    aboutMe: user.aboutMe || '',
    instagramUrl: user.instagramUrl || '',
    facebookUrl: user.facebookUrl || '',
    twitterUrl: user.twitterUrl || '',
    websiteUrl: user.websiteUrl || '',
    currentPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    // Capitalize the first letter if the field is firstName or lastName
    if (name === 'firstName' || name === 'lastName') {
      updatedValue = value.charAt(0).toUpperCase() + value.slice(1);
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: updatedValue,
    }));
  };


  const checkForChanges = () => {
    // Check if any form data has changed
    const hasFormDataChanges = Object.keys(formData).some(key => {
      // Ignore currentPassword for comparison
      if (key === 'currentPassword') return false;
      return formData[key] !== user[key];
    });

    // Return true if there are form data changes or if the profile image has been updated
    return hasFormDataChanges || isProfileImageUpdated;
  };

  const handleUpdate = async (currentPassword) => {
    if (!user || !user._id) {
      console.log("user:", user);
      console.error("User ID is undefined.");
      return;
    }

    if (!token) {
      console.error("Authentication token is undefined or not available.");
      return;
    }

    if (!checkForChanges() && !isProfileImageUpdated) {
      setChangementMessage('Aucun changement détecté');
      setErrorMessage('');
      setSuccessMessage('');
    } else {
      try {
        const updatedFormData = { ...formData, currentPassword };
        // Ensure authService.updateUser is implemented to handle these parameters correctly
        const responseUser = await authService.updateUser(user._id, formData, currentPassword, profileImage, token, dispatch);

        setIsProfileImageUpdated(false); // Resetting the flag after update

        // Merge the existing user data with the updated data received from the backend
        const updatedUser = { ...user, ...responseUser };

        dispatch(updateUser(updatedUser)); // Assuming updateUser is a correctly defined action

        setSuccessMessage('Mise à jour réussie ! Vos informations sont désormais à jour.');
        setErrorMessage('');
        setChangementMessage('');
      } catch (error) {

        setErrorMessage("Mot de passe incorecte !");
        setSuccessMessage('');
        setChangementMessage('');

      }
    }
  };

  return (
    <>
      <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <DashboardHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* dashboard_content_wrapper */}
      <div className="dashboard_content_wrapper">
        <div className="dashboard dashboard_wrapper pr30 pr0-xl">
          <SidebarDashboard />
          {/* End .dashboard__sidebar */}

          <div className="dashboard__main pl0-md">
            <div className="dashboard__content bgc-f7">
              <div className="row pb40">
                <div className="col-lg-12">
                  <DboardMobileNavigation />
                </div>
                {/* End .col-12 */}
              </div>
              {/* End .row */}

              <div className="row align-items-center pb40">
                <div className="col-lg-12">
                  <div className="dashboard_title_area">
                    <h2>Mon compte</h2>
                    <p className="text">Nous sommes heureux de vous revoir!</p>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row">
                <div className="col-xl-12">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <div className="col-xl-7">

                      <ProfileBox
                        setProfileImage={setProfileImage}
                        onProfileImageChange={() => setIsProfileImageUpdated(true)}
                        onProfileImageDeleted={() => setIsProfileImageUpdated(true)} // New prop to handle deletion
                      />
                    </div>
                    {/* End ProfileBox */}

                    <div className="col-lg-12">
                      <PersonalInfo
                        formData={formData}
                        handleChange={handleChange}
                        handleUpdate={handleUpdate}
                        errorMessage={errorMessage}
                        successMessage={successMessage}
                        changementMessage={changementMessage}
                      />
                    </div>
                    {/* End PersonalInfo */}
                  </div>
                  {/* End .ps-widget */}

                  {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <h4 className="title fz17 mb30">Réseaux sociaux</h4>
                    <SocialField />
                  </div> */}
                  {/* End .ps-widget */}

                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <h4 className="title fz17 mb30">Changer le mot de passe</h4>
                    <ChangePasswordForm />
                  </div>
                  {/* End .ps-widget */}
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .dashboard__content */}

            <Footer />
          </div>
          {/* End .dashboard__main */}
        </div>
      </div>
      {/* dashboard_content_wrapper */}
    </>
  );
};

export default DashboardMyProfile;
