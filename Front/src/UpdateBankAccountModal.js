import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function UpdateBankAccountModal({ show, handleClose, initialFormValues }) {
    const [formData, setFormData] = useState(initialFormValues);

    useEffect(() => {
        // Effectuer une requête GET pour récupérer les détails du compte bancaire à partir de l'API
        axios.get(`http://localhost:8081/${initialFormValues.num_compte}`)
            .then(res => {
                setFormData(res.data[0]); // Mettre à jour les données du formulaire avec les détails récupérés
                console.log(res.data[0]);
            })
            .catch(err => console.error(err));
    }, [initialFormValues.num_compte]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        axios.put(`http://localhost:8081/${formData.num_compte}`, formData)
            .then(res => {
                console.log(res.data);
                handleClose();
            })
            .catch(err => console.error(err));
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modifier le compte bancaire</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label htmlFor="num_compte" className="form-label">Numéro de compte</label>
                        <input type="text" className="form-control" id="num_compte" name="num_compte" value={formData.num_compte} onChange={handleChange} readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nom" className="form-label">Nom</label>
                        <input type="text" className="form-control" id="nom" name="nom" value={formData.nom} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="solde" className="form-label">Solde</label>
                        <input type="text" className="form-control" id="solde" name="solde" value={formData.solde} onChange={handleChange} />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Annuler
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Enregistrer
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateBankAccountModal;
