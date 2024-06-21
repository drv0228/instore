import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./EditStore.scss";
import arrowBack from "../../assets/images/arrow_back-24px.svg";
import axios from "axios";

function EditStore() {
  const { idFromParams } = useParams();

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
        .put(
          `http://localhost:5050/api/warehouses/` + idFromParams,
          storeData
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          //log errors that occurr during data submision
          console.log(err);
        });
      alert("Updated store details successfully!");
      window.location.replace("/");
    } else {
      alert(
        "Failed to update the store details, there was at least one error in the form."
      );
    }
  };


  return (
    <>
      <main className="edit-store">
        <section className="edit-store__page">
          <div className="edit-store__header">
            <Link to="/">
              <img
                className="edit-store__img"
                src={arrowBack}
                alt="Arrow back"
              />
            </Link>
            <h1 className="edit-store__title">Edit Store</h1>
          </div>
          <form
            noValidate
            onSubmit={handleSubmit}
            className="edit-store__form"
          >
            <div className="edit-store__details">
              <h2 className="edit-store__subheading">Store Details</h2>
              <label htmlFor="name" className="edit-store__label">
                Store Name
                <input
                  type="text"
                  name="store_name"
                  id="name"
                  placeholder="Washington"
                  value={warehouse_name}
                  onChange={(e) => setName(e.target.value)}
                  className={`edit-store__input ${
                    hasError("store_name")
                      ? "edit-store__input--error"
                      : ""
                  }`}
                />
                {hasError("store_name") ? (
                  <span className="edit-store__error-message">
                    {`This field is required`}
                  </span>
                ) : (
                  <span></span>
                )}
              </label>

              <label htmlFor="address" className="edit-store__label">
                Street Address
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="33 Pearl Street SW"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`edit-store__input ${
                    hasError("address") ? "edit-store__input--error" : ""
                  }`}
                />
                {hasError("address") ? (
                  <span className="edit-store__error-message">
                    {`This field is required`}
                  </span>
                ) : (
                  <span></span>
                )}
              </label>

              <label htmlFor="city" className="edit-store__label">
                City
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="Washington"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={`edit-store__input ${
                    hasError("city") ? "edit-store__input--error" : ""
                  }`}
                />
                {hasError("city") ? (
                  <span className="edit-store__error-message">
                    {`This field is required`}
                  </span>
                ) : (
                  <span></span>
                )}
              </label>

              <label htmlFor="country" className="edit-store__label">
                Country
                <input
                  type="text"
                  name="country"
                  id="country"
                  placeholder="USA"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={`edit-store__input ${
                    hasError("country") ? "edit-store__input--error" : ""
                  }`}
                />
                {hasError("country") ? (
                  <span className="edit-store__error-message">
                    {`This field is required`}
                  </span>
                ) : (
                  <span></span>
                )}
              </label>
            </div>

            <div className="edit-store__details edit-store__details--border ">
              <h2 className="edit-store__subheading">Contact Details</h2>
              <label htmlFor="contact" className="edit-store__label">
                Contact Name
                <input
                  type="text"
                  name="contact_name"
                  id="contact"
                  value={contact_name}
                  placeholder="Graeme Lyon"
                  onChange={(e) => setContact(e.target.value)}
                  className={`edit-store__input ${
                    hasError("contact_name")
                      ? "edit-store__input--error"
                      : ""
                  }`}
                />
                {hasError("contact_name") ? (
                  <span className="edit-store__error-message">
                    {`This field is required`}
                  </span>
                ) : (
                  <span></span>
                )}
              </label>

              <label htmlFor="position" className="edit-store__label">
                Position
                <input
                  type="text"
                  name="contact_position"
                  id="position"
                  placeholder="Store Manager"
                  value={contact_position}
                  onChange={(e) => setPosition(e.target.value)}
                  className={`edit-store__input ${
                    hasError("contact_position")
                      ? "edit-store__input--error"
                      : ""
                  }`}
                />
                {hasError("contact_position") ? (
                  <span className="edit-store__error-message">
                    {`This field is required`}
                  </span>
                ) : (
                  <span></span>
                )}
              </label>

              <label htmlFor="contact_phone" className="edit-store__label">
                Phone Number
                <input
                  type="tel"
                  name="contact_phone"
                  id="contact_phone"
                  value={contact_phone}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1 (647) 504-0911"
                  className={`edit-store__input ${
                    hasError("contact_phone")
                      ? "edit-store__input--error"
                      : ""
                  }`}
                />
                {hasError("contact_phone") ? (
                  <span className="edit-store__error-message">
                    {`This field is required`}
                  </span>
                ) : (
                  <span></span>
                )}
              </label>

              <label htmlFor="contact_email" className="edit-store__label">
                Email
                <input
                  type="email"
                  name="contact_email"
                  id="contact_email"
                  value={contact_email}
                  placeholder="glyon@instock.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className={`edit-store__input ${
                    hasError("contact_email")
                      ? "edit-store__input--error"
                      : ""
                  }`}
                />
                {hasError("contact_email") ? (
                  <span className="edit-store__error-message">
                    {`This field is required`}
                  </span>
                ) : (
                  <span></span>
                )}
              </label>
            </div>
          </form>

          <div className="edit-store__buttons">
            <Link to="/" className="edit-store__link">
              <button className="edit-store__button-cancel">Cancel</button>
            </Link>
            <button
              className="edit-store__button-save"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default EditStore;
