import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Card } from 'react-bootstrap';
import BankAccountModal from './BankAccountModal'; // Assurez-vous d'avoir le bon nom du composant modal d'ajout
import UpdateBankAccountModal from './UpdateBankAccountModal'; // Assurez-vous d'avoir le bon nom du composant modal de mise à jour

function BankAccount() {
    const [bankAccounts, setBankAccounts] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);
    const [minBalance, setMinBalance] = useState(0);
    const [maxBalance, setMaxBalance] = useState(0);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [initialFormValues, setInitialFormValues] = useState(null);
    const [selectedBankAccountId, setSelectedBankAccountId] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedBankAccount, setSelectedBankAccount] = useState(null);

    const fetchBankAccounts = () => {
        axios.get('http://localhost:8081/')
            .then(res => {
                setBankAccounts(res.data.clients);
                setTotalBalance(res.data.totalBalance);
                setMinBalance(res.data.minBalance);
                setMaxBalance(res.data.maxBalance);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchBankAccounts();
    }, []);

    const handleOpenFormModal = () => {
        setInitialFormValues(null);
        setSelectedBankAccount(null);
        setIsFormModalOpen(true);
    };

    const handleCloseFormModal = () => {
        setIsFormModalOpen(false);
        setSelectedBankAccount(null);
        fetchBankAccounts();
    };

    const handleDeleteBankAccount = (bankAccountId) => {
        setSelectedBankAccountId(bankAccountId);
        setShowConfirmModal(true);
    };

    const handleOpenUpdateModal = (data) => {
        setSelectedBankAccount(data);
        setShowUpdateModal(true);
    };

    const confirmDeleteBankAccount = () => {
        axios.delete(`http://localhost:8081/${selectedBankAccountId}`)
            .then(res => {
                console.log(res.data);
                setShowConfirmModal(false);
                fetchBankAccounts();
            })
            .catch(err => console.error(err));
    };

    const cancelDeleteBankAccount = () => {
        setShowConfirmModal(false);
    };

    return (
        <div style={{backgroundColor: '#AEF78E'}} className='d-flex vh-100 justify-content-center align-items-center'>
            <div className='w-75 bg-white rounded p-3'>
                <Button className='btn btn-success' onClick={handleOpenFormModal}> Ajouter </Button>
                <table className='table mt-3'>
                    <thead>
                        <tr>
                            <th>Numéro de compte</th>
                            <th>Nom</th>
                            <th>Solde</th>
                            <th>Observation</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bankAccounts.map((data, i) => (
                                <tr key={i}>
                                    <td>{data.num_compte}</td>
                                    <td>{data.nom}</td>
                                    <td>{data.solde} Ariary</td>
                                    <td>{data.obs}</td>
                                    <td className="d-flex align-items-center">
                                        <button className='btn btn-info me-2' onClick={() => handleOpenUpdateModal(data)}>Modifier</button>
                                        <button className='btn btn-warning' onClick={() => handleDeleteBankAccount(data.num_compte)}>Supprimer</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <div className="row mt-3">
                    <div className="col-md-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>Total</Card.Title>
                                <Card.Text>
                                    {totalBalance} Ariary
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>Minimum</Card.Title>
                                <Card.Text>
                                    {minBalance}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>Maximum</Card.Title>
                                <Card.Text>
                                    {maxBalance}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>

                <BankAccountModal show={isFormModalOpen} handleClose={handleCloseFormModal} />
                
                {selectedBankAccount && (
                    <UpdateBankAccountModal 
                        show={showUpdateModal} 
                        handleClose={() => {setShowUpdateModal(false); setSelectedBankAccount(null);fetchBankAccounts();}} 
                        initialFormValues={selectedBankAccount} 
                    />
                )}

                <Modal show={showConfirmModal} onHide={cancelDeleteBankAccount}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation de suppression</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Êtes-vous sûr de vouloir supprimer ce compte bancaire ?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={cancelDeleteBankAccount}>Annuler</Button>
                        <Button variant="danger" onClick={confirmDeleteBankAccount}>Supprimer</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default BankAccount;
