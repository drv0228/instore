import "./AddNewStore.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import arrowBack from "../../assets/images/arrow_back-24px.svg";
import axios from "axios";

function AddNewStore() {

  const [warehouse_name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [contact_name, setContact] = useState("");
  const [contact_position, setPosition] = useState("");
  const [contact_phone, setPhoneNumber] = useState("");
  const [contact_email, setEmail] = useState("");

  const [errors, setErrors] = useState({});

  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let regexTel = /^\+\d{1,2}\s\(\d{3}\)\s\d{3}-\d{4}$/;

  //function that checks whether there is an error associated with a particular form field.
  const hasError = (field) => {
    return errors[field] !== undefined; //If it's not undefined it is because there is an error message that exists for that field and returns true
  };

  //function that validates the form input fields, returns true or false.
  const isFormValid = () => {
    const newErrors = {}; //empty object to store validation error messages for all the different form fields.

    //Check if the fields are all filled (non-empty)
    if (!warehouse_name) newErrors.store_name = "This field is required";
    if (!address) newErrors.address = "This field is required";
    if (!city) newErrors.city = "This field is required";
    if (!country) newErrors.country = "This field is required";
    if (!contact_name) newErrors.contact_name = "This field is required";
    if (!contact_position)
      newErrors.contact_position = "This field is required";
    if (!contact_phone) newErrors.contact_phone = "This field is required";
    if (!contact_email) newErrors.contact_email = "This field is required";

    //  For Phone Number and Email fields validate correct phone number and email. Front-End validation needs to be custom and cannot use default HTML5 form validation.
    if (!regexTel.test(contact_phone))
      newErrors.contact_phone = "Telephone format is invalid";
    if (!regexEmail.test(contact_email))
      newErrors.contact_email = "Email format is invalid";

    setErrors(newErrors); //updates the errors state with the new generated error messages.

    // Return true if there are no error messages, otherwise false
    return Object.keys(newErrors).length === 0;
  };

  //handles form submission, validates the form data, sends it to the server for updating, and provides
  //user feedback based on the outcome of the submission and validation process.
  const handleSubmit = (e) => {
    e.preventDefault(); // prevents default form submission behavior

    if (isFormValid()) {
      // Prepare data submission - sending to database (server)
      const storeData = {
        warehouse_name,
        address,
        city,
        country,
        contact_name,
        contact_position,
        contact_phone,
        contact_email,
      };
      //Send the data to the server using the axios library's PUT method to update data on the server
      axios
        .post(`http://localhost:5050/api/warehouses/`, storeData)
        .then((response) => {
          alert("Updated new warehouse details successfully!");
          setName("");
          setAddress("");
          setCity("");
          setCountry("");
          setContact("");
          setPosition("");
          setPhoneNumber("");
          setEmail("");
          window.location.replace("/");
        })
        .catch((err) => {
          //log errors that occurr during data submision
          console.log(err);
        });
    } else {
      alert(
        "Failed to update the new store details, there was at least one error in the form."
      );
    }
  };

  // function to handle the Cancel button click, takes the user to warehouse list page
  const handleCancel = () => {
    // refresh the form by resetting all the state values to empty
    setName("");
    setAddress("");
    setCity("");
    setCountry("");
    setContact("");
    setPosition("");
    setPhoneNumber("");
    setEmail("");
  };

  return (
    <>
      <main className="add-store">
        <section className="add-store__page">
          <div className="add-store__header">
            <Link to="/">
              <img
                className="add-store__img"
                src={arrowBack}
                alt="Arrow back"
              />
            </Link>
            <h1 className="add-store__title">Add New Warehouse</h1>
          </div>
          <form
            noValidate
            onSubmit={handleSubmit}
            className="add-store__form"
          >
            <div className="add-store__details">
              <h2 className="add-store__subheading">Store Details</h2>
              <label htmlFor="name" className="add-store__label">
                Store Name
                <input
                  type="text"
                  name="store_name"
                  id="name"
                  placeholder="Store Name"
                  value={warehouse_name}
                  onChange={(e) => setName(e.target.value)}
                  className={`add-store__input ${
                    hasError("store_name")
                      ? "add-store__input--error"
                      : ""
                  }`}
                />
                {hasError("store_name") ? (
                  <span className="add-store__error-message">
                    {`This field is required`}
                  </span>
                ) : (
                  <span></span>
                )}
              </label>

              <label htmlFor="address" className="add-store__label">
                Street Address
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Street Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`add-store__input ${
                    hasError("address") ? "add-store__input--error" : ""
                  }`}
                />
                {hasError("address") ? (
                  <span className="add-store__error-message">
                    {`This field is required`}
                  </span>
                ) : (
                  <span></span>
                )}
              </label>

              <label htmlFor="city" className="add-store__label">
                City
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={`add-store__input ${
                    hasError("city") ? "add-store__input--error" : ""
                  }`}
                />
                {hasError("city") ? (
                  <span className="add-store__error-message">
                    {`This field is required`}
                  </span>
                ) : (
                  <span></span>
                )}
              </label>

              <label htmlFor="country" className="add-store__label">
                Country
                <input
                  type="text"
                  name="country"
                  id="country"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={`add-store__input ${
                    hasError("country") ? "add-store__input--error" : ""
                  }`}
                />
                {hasError("country") ? (
                  <span className="add-store__error-message">
                    {`This field is required`}
                  </span>
                ) : (
                  <span></span>
                )}
              </label>
            </div>
            <div className="add-store__details add-store__details--border ">
              <h2 className="add-store__subheading">Contact Details</h2>
              <label htmlFor="contact" className="add-store__label">
                Contact Name
                <input
                  type="text"
                  name="contact_name"
                  id="contact"
                  value={contact_name}
                  placeholder="Contact Name"
                  onChange={(e) => setContact(e.target.value)}
                  className={`add-store__input ${
                    hasError("contact_name")
                      ? "add-store__input--error"
                      : ""
                  }`}
                />
                {hasError("contact_name") ? (
                  <span className="add-store__error-message">
                    {`This field is required`}
                  </span>
                ) : (
                  <span></span>
                )}
              </label>

              <label htmlFor="position" className="add-store__label">
                Position
                <input
                  type="text"
                  name="contact_position"
                  id="position"
                  placeholder="Position"
                  value={contact_position}
                  onChange={(e) => setPosition(e.target.value)}
                  className={`add-store__input ${
                    hasError("contact_position")
                      ? "add-store__input--error"
                      : ""
                  }`}
                />
                {hasError("contact_position") ? (
                  <span className="add-store__error-message">
                    {`This field is required`}
                  </span>
                ) : (
                  <span></span>
                )}
              </label>

              <label htmlFor="contact_phone" className="add-store__label">
                Phone Number
                <input
                  type="tel"
                  name="contact_phone"
                  id="contact_phone"
                  value={contact_phone}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone Number"
                  className={`add-store__input ${
                    hasError("contact_phone")
                      ? "add-store__input--error"
                      : ""
                  }`}
                />
                {hasError("contact_phone") ? (
                  <span className="add-store__error-message">
                    {`This field is required`}
                  </span>
                ) : (
                  <span></span>
                )}
              </label>

              <label htmlFor="contact_email" className="add-store__label">
                Email
                <input
                  type="email"
                  name="contact_email"
                  id="contact_email"
                  value={contact_email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className={`add-store__input ${
                    hasError("contact_email")
                      ? "add-store__input--error"
                      : ""
                  }`}
                />
                {hasError("contact_email") ? (
                  <span className="add-store__error-message">
                    {`This field is required`}
                  </span>
                ) : (
                  <span></span>
                )}
              </label>
            </div>
          </form>
          <div className="add-store__buttons">
            <Link to="/">
              <button
                className="add-store__button-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </Link>
            <button
              className="add-store__button-add"
              onClick={handleSubmit}
            >
              + Add Store
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default AddNewStore;