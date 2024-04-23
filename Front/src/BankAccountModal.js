import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const BankAccountModal = ({ show, handleClose }) => {
    const [formData, setFormData] = useState({
        num_compte: '',
        nom: '',
        solde: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        axios.post('http://localhost:8081/', formData)
            .then(response => {
                console.log(response.data);
                // Gérer la réussite de l'ajout ici
                handleClose();
            })
            .catch(error => {
                console.error(error);
                // Gérer les erreurs ici
            });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ajouter un compte bancaire</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="num_compte">
                        <Form.Label>Numéro de compte</Form.Label>
                        <Form.Control type="text" name="num_compte" value={formData.num_compte} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="nom">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control type="text" name="nom" value={formData.nom} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="solde">
                        <Form.Label>Solde</Form.Label>
                        <Form.Control type="number" name="solde" value={formData.solde} onChange={handleChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Fermer</Button>
                <Button variant="primary" onClick={handleSubmit}>Ajouter</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BankAccountModal;
