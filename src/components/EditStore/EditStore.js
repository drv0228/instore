import "./EditStore.scss";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import arrowBack from "../../assets/images/arrow_back-24px.svg";
import axios from "axios";

function EditStore() {
  const { idFromParams } = useParams();

  return (
    <>
      <main className="edit-store"></main>
    </>
  );
}

export default EditStore;
