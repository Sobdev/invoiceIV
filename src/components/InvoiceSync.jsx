// src/components/InvoiceSync.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const InvoiceSync = ({ authResponse }) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const listFiles = async () => {
            gapi.client.load('drive', 'v3', () => {
                gapi.client.drive.files.list({
                    q: "mimeType='application/pdf'",
                    fields: 'files(id, name)',
                }).then((response) => {
                    setFiles(response.result.files);
                }, (error) => {
                    console.error('Error listing files: ', error);
                });
            });
        };

        if (authResponse) {
            listFiles();
        }
    }, [authResponse]);

    const syncInvoices = async (fileId) => {
        // Aquí puedes manejar la sincronización de las facturas
    };

    return (
        <div>
            <h1>Invoice Sync</h1>
            <ul>
                {files.map((file) => (
                    <li key={file.id}>
                        {file.name}
                        <button onClick={() => syncInvoices(file.id)}>Sync</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

InvoiceSync.propTypes = {
    authResponse: PropTypes.shape({
        access_token: PropTypes.string.isRequired,
    }).isRequired,
};

export default InvoiceSync;
