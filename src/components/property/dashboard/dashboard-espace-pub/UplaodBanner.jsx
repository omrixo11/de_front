import Select from "react-select";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import propertyService from "@/services/property.service";
import boostService from "@/services/boost.service";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import adsBannersService from "@/services/adsBanners.service";
import userService from "@/services/user.service";


const UploadBanner = () => {

    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [uploadedImage, setUploadedImage] = useState('');
    const [selectedDuration, setSelectedDuration] = useState(null);
    const [validation, setValidation] = useState({
        selectedDuration: true,
        image: true // Add image validation flag
    });
    const [priceHT, setPriceHT] = useState(0);
    const [priceTTC, setPriceTTC] = useState(0);
    const [VAT, setVAT] = useState(0);
    const [link, setLink] = useState('');
    const userId = useSelector((state) => state.auth?.user?._id);

    const VAT_RATE = 0.19; // 19% VAT
    const PRICE_PER_DAY = 2.4;

    useEffect(() => {
        if (selectedDuration) {
            const durationDays = Number(selectedDuration.value);
            const newPriceHT = PRICE_PER_DAY * durationDays;
            const newVAT = newPriceHT * VAT_RATE;
            const newPriceTTC = newPriceHT + newVAT;

            setPriceHT(newPriceHT);
            setVAT(newVAT);
            setPriceTTC(newPriceTTC);
        }
    }, [selectedDuration]);

    const handleUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setUploadedImage(e.target.result);
            setValidation({ ...validation, image: true }); // Reset image validation when an image is uploaded
        };
        reader.readAsDataURL(file);
        setErrorMessage('');
    };

    const handleDelete = () => {
        setUploadedImage('');
        fileInputRef.current.value = '';
        setValidation({ ...validation, image: false }); // Update validation state when image is deleted
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleDurationChange = (selectedOption) => {
        setSelectedDuration(selectedOption);
        setValidation({ ...validation, selectedDuration: true }); // Reset duration validation when changed
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Update validation state based on current form state
        const isImageUploaded = uploadedImage !== '';
        const isDurationSelected = selectedDuration !== null;
        setValidation({ selectedDuration: isDurationSelected, image: isImageUploaded });

        // Prevent form submission if validation fails
        if (!isImageUploaded || !isDurationSelected) {
            return;
        }

        if (!userId) {
            navigate('/login');
            return;
        }

        const formData = new FormData();
        formData.append('image', fileInputRef.current.files[0]);
        formData.append('link', link);
        formData.append('duration', selectedDuration.value);
        formData.append('price', priceTTC);

        try {
            await adsBannersService.initiateAdsBannerPurchase(userId, formData);
            navigate('/bank-infos', { state: { message: "Votre commande a été placée avec succès. Veuillez procéder au paiement." } });
            // Handle success (e.g., clear form, show success message)
        } catch (error) {
            console.error("Error uploading banner:", error);
            // Handle error (e.g., show error message)
        }
    };

    return (

        <form className="form-style1" onSubmit={handleSubmit}>
            <div className="row">

                <div className="col-md-4 col-xl-6">
                    <div className="upload-img position-relative overflow-hidden bdrs12 text-center mb30 px-2"
                        onClick={handleButtonClick}>
                        <div className="icon mb30">
                            <span className="flaticon-upload" />
                        </div>
                        <h4 className="title fz17 mb10">Déposez votre bannière ici</h4>
                        <p className="text mb25">
                        Ajoutez une bannière de haute qualité pour valoriser davantage votre publicité.</p>
                        <button className="ud-btn btn-white" type="button">Télécharger une bannière</button>
                        {!validation.image && <div style={{ color: 'red', marginTop: '10px' }}>Veuillez télécharger une image.</div>}

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={(e) => handleUpload(e.target.files[0])}
                            style={{ display: "none" }}
                        />
                    </div>                </div>

                <div className="col-sm-12 col-xl-6">
                    <p className="text mb3">La bannière doit être au format JPEG ou PNG <strong>(2416px 402px)</strong></p>
                    <a href="https://www.dessa.tn/pdf-files/template-banner-dessa.pdf"
                        download="template-banner-dessa.pdf"
                        className="ud-btn2 ">
                        Télécharger le modèle PDF
                        <span className="far fa-cloud-download ml10" />
                    </a>
                    <p className="text mb-3" style={{ color: 'orange', fontSize:12 }}>Les bannières avec un format incorrect ne seront pas acceptées.</p>
                    <div className="profile-box position-relative d-md-flex align-items-center mt15">
                        {uploadedImage && (
                            <div className="profile-box position-relative d-md-flex align-items-center mt15">
                                <div className="mb-2">
                                    <img
                                        className="w-100 bdrs12 cover"
                                        src={uploadedImage}
                                        alt={`Uploaded Banner`}
                                    />
                                    <button
                                        style={{ border: "none" }}
                                        className="tag-del"
                                        title="Delete Banner"
                                        onClick={handleDelete}
                                        type="button"
                                    >
                                        <span className="fas fa-trash-can" />
                                    </button>
                                </div>
                            </div>
                        )}
                        {errorMessage && <p className="text mb-3" style={{ color: 'red' }}>{errorMessage}</p>}

                    </div>

                    <div className="mb10 mt10">
                        <label className="heading-color ff-heading fw600 mb10">
                            Choisir la durée
                        </label>
                        <Select
                            className={`select-custom ${validation.selectedDuration ? "" : "error"}`} // Apply error class if validation fails
                            classNamePrefix="select"
                            placeholder="Choisir une durée..."
                            options={[
                                { value: '1', label: '1 Jour' },
                                { value: '7', label: '7 Jours' },
                                { value: '15', label: '15 Jours' },
                                { value: '30', label: '1 Mois' },
                                { value: '60', label: '2 Mois' },,
                                { value: '90', label: '3 Mois' }
                            ]}
                            onChange={handleDurationChange}
                            value={selectedDuration}
                            noOptionsMessage={() => "Aucune option disponible"}
                        />
                        {!validation.selectedDuration && <div style={{ color: 'red', marginTop: '10px' }}>Veuillez choisir une durée.</div>}
                    </div>

                    <div className="mb40">
                        <label className="heading-color ff-heading fw600 mb10">
                            Lien
                            <span className="text-muted ml10">(facultatif)</span>

                        </label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="https://www.exemple.com/exemple"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                        />
                        <span className="text-muted mt1">Optionnel. Utilisez-le pour diriger vers une page spécifique.</span>

                    </div>

                </div>

                <div className="col-md-12">
                    <div className="pricing-summary">
                        <div className="pricing-details">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    1 Jour = 2.4 DT
                                    <span className="text-muted ml10">(Votre bannière publicitaire sera mise en avant au sommet de notre site)</span>
                                </li>
                            </ul>
                        </div>
                        <div className="summary-item mt20">
                            <span className="item-label">Total H.T.V.A</span>
                            <span className="item-value">{priceHT.toFixed(2)} DT</span>
                        </div>
                        <div className="summary-item">
                            <span className="item-label">Montant T.V.A 19%</span>
                            <span className="item-value">{VAT.toFixed(2)} DT</span>
                        </div>
                        <div className="summary-item total">
                            <span className="item-label">Montant T.T.C</span>
                            <span className="item-value">{priceTTC.toFixed(2)} DT</span>
                        </div>

                    </div>
                </div>

                <div className="col-md-12">
                    <div className="text-start">
                    </div>
                    <div className="text-end">
                        <button type="submit" className="ud-btn btn-dark">
                            Valider
                            <i className="fal fa-arrow-right-long" />
                        </button>
                    </div>
                </div>
                {/* End .col */}
            </div>
        </form>
    )
};
export default UploadBanner;