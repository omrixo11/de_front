import Select from "react-select";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import propertyService from "@/services/property.service";
import boostService from "@/services/boost.service";
import { useNavigate } from "react-router-dom";
import { FaCreditCard, FaUniversity } from "react-icons/fa";

const SponsoringWindow = () => {

    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null); // State to hold the selected article
    const [selectedBoostType, setSelectedBoostType] = useState(null); // State to hold the selected boost type
    const [selectedDuration, setSelectedDuration] = useState(null); // State to hold the selected duration
    const [totalCostHTVA, setTotalCostHTVA] = useState(0); // H.T.V.A
    const [vatAmount, setVatAmount] = useState(0); // VAT Amount
    const [totalCostTTC, setTotalCostTTC] = useState(0); // T.T.C
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('virement');

    const auth = useSelector((state) => state.auth);


    const [validation, setValidation] = useState({
        selectedArticle: true,
        selectedBoostType: true,
        selectedDuration: true
    });

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submit action

        // Reset error message
        setErrorMessage('');

        // Check if all required fields have been selected
        const isValid = {
            selectedArticle: !!selectedArticle,
            selectedBoostType: !!selectedBoostType,
            selectedDuration: !!selectedDuration
        };

        setValidation(isValid);

        if (isValid.selectedArticle && isValid.selectedBoostType && isValid.selectedDuration) {
            try {
                // Assuming you have a way to get the user's token
                const token = auth.user.token; // Update according to how you're storing tokens
                const articleId = selectedArticle.value; // Extract the articleId from the selected article
                const boostData = {
                    userId: auth.user._id, // Or however you get the userId
                    duration: selectedDuration.value,
                    price: totalCostHTVA, // Or however you decide to calculate the price
                    type: selectedBoostType.value,
                    articleId: articleId,
                };

                // Call your BoostService to create the boost
                await boostService.purchaseBoost(selectedArticle.value, boostData, token);
                navigate('/bank-infos', { state: { message: "Votre commande a été placée avec succès. Veuillez procéder au paiement." } });

            } catch (error) {
                console.error('Error submitting the boost:', error);
                // Set an error message to display to the user
                setErrorMessage('Failed to submit the boost. Please try again.');
            }
        } else {
            console.log('Validation failed');
            // Optionally set an error message about missing selections
            setErrorMessage('Please make sure all fields are selected.');
        }
    };

    useEffect(() => {
        fetchArticles();
    }, [auth.user]); // Re-fetch articles if the auth.user changes

    useEffect(() => {
        calculateCosts();
    }, [selectedBoostType, selectedDuration]);

    const fetchArticles = async () => {
        try {
            const userId = auth.user._id;
            const authToken = auth.user.token;

            const fetchedUserArticles = await propertyService.getUserArticles(userId, authToken);
            console.log('Fetched User Articles:', fetchedUserArticles);
            setArticles(fetchedUserArticles.map(article => ({
                value: article._id, // Assuming each article has a unique _id
                label: article.title // Assuming each article has a title
            })));
        } catch (error) {
            console.error('Error fetching user articles:', error);
        }
    };

    const handleArticleChange = (selectedOption) => {
        setSelectedArticle(selectedOption);
        console.log('Selected article:', selectedOption);
    };

    const handleBoostTypeChange = (selectedOption) => {
        setSelectedBoostType(selectedOption);
        console.log('Selected boost type:', selectedOption);
    };

    const handleDurationChange = (selectedOption) => {
        setSelectedDuration(selectedOption);
        console.log('Selected duration:', selectedOption);
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    // Define the boost type options
    const boostTypeOptions = [
        { value: 'carousel', label: 'À la une' },
        { value: 'classic', label: 'Classique' },
        { value: 'super', label: 'Super Boost' },
    ];

    // Define the duration options
    const durationOptions = [
        { value: 1, label: '1 jour' },
        { value: 7, label: '7 jours' },
        { value: 15, label: '15 jours' },
        { value: 30, label: '30 jours' },
    ];

    const calculateCosts = () => {
        if (!selectedBoostType || !selectedDuration) {
            setTotalCostHTVA(0);
            setVatAmount(0);
            setTotalCostTTC(0);
            return;
        }

        const costPerDay = {
            'carousel': 0.8,
            'classic': 0.7,
            'super': 1.3
        };

        const dailyCost = costPerDay[selectedBoostType.value] || 0;
        const calculatedCostHTVA = dailyCost * selectedDuration.value;
        const calculatedVATAmount = calculatedCostHTVA * 0.19;
        const calculatedCostTTC = calculatedCostHTVA + calculatedVATAmount;

        setTotalCostHTVA(calculatedCostHTVA);
        setVatAmount(calculatedVATAmount);
        setTotalCostTTC(calculatedCostTTC);
    };

    return (

        <form className="form-style1" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-sm-6 col-xl-4">
                    <div className="mb20">
                        <label className="heading-color ff-heading fw600 mb10">
                            Selectionner une annonces
                        </label>
                        <Select
                            className={`select-custom ${validation.selectedArticle ? "" : "error"}`}
                            classNamePrefix="select"
                            value={selectedArticle}
                            onChange={handleArticleChange}
                            options={articles}
                            placeholder="Choisir..."
                        />
                    </div>
                </div>
                {/* End .col */}
                <div className="col-sm-6 col-xl-4">
                    <div className="mb20">
                        <label className="heading-color ff-heading fw600 mb10">
                            Selectionner type de Boost
                        </label>
                        <Select
                            className={`select-custom ${validation.selectedBoostType ? "" : "error"}`}
                            classNamePrefix="select"
                            value={selectedBoostType}
                            onChange={handleBoostTypeChange}
                            options={boostTypeOptions}
                            placeholder="Choisir..."
                        />
                    </div>
                </div>
                {/* End .col */}

                <div className="col-sm-6 col-xl-4">
                    <div className="mb20">
                        <label className="heading-color ff-heading fw600 mb10">
                            Choisir la durée
                        </label>
                        <Select
                            className={`select-custom ${validation.selectedDuration ? "" : "error"}`}
                            classNamePrefix="select"
                            value={selectedDuration}
                            onChange={handleDurationChange}
                            options={durationOptions}
                            placeholder="Choisir..."
                        />
                    </div>
                </div>
                {/* End .col */}


                {/* <div className="col-sm-6 col-xl-4">
                    <div className="mb20">
                        <label className="heading-color ff-heading fw600 mb10">
                            Date start
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            placeholder="Your Name"
                            required
                        />
                    </div>
                </div> */}

                {/* End .col */}
                <div className="col-md-12">
                    <div className="pricing-summary">
                        <div className="pricing-details">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    1 jour Classique = 0.7 DT
                                    <span className="text-muted ml10">(Assure une position privilégiée en haut de la page lors des recherches)</span>
                                </li>
                                <li className="list-group-item">
                                    1 jour À la une = 0.8 DT
                                    <span className="text-muted ml10">(Visibilité accrue sur tous les carrousels 'À la une')</span>
                                </li>
                                <li className="list-group-item">
                                    1 jour Super Boost = 1.3 DT 
                                    <span className="text-muted ml10">(Combine à la fois Boost 'À la une' et Boost 'Classique' pour une exposition maximale)</span>
                                </li>
                            </ul>
                        </div>
                        <div className="summary-item mt20">
                            <span className="item-label">Total H.T.V.A</span>
                            <span className="item-value">{totalCostHTVA.toFixed(2)} DT</span>
                        </div>
                        <div className="summary-item">
                            <span className="item-label">Montant T.V.A 19%</span>
                            <span className="item-value">{vatAmount.toFixed(2)} DT</span>
                        </div>
                        <div className="summary-item total">
                            <span className="item-label">Montant T.T.C</span>
                            <span className="item-value">{totalCostTTC.toFixed(2)} DT</span>
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
export default SponsoringWindow;