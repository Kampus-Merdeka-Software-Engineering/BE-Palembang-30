import express from 'express'

//Daftar Semua Dokter
export const get = ("/:No", (request, response) => {

    const { NIP } = request.params;
    const { Name } = request.query;
    const { Agency, Spesialisasi} = request.body;

        
    response.json({
        NIP,
        Name,
        Agency,
        Spesialisasi,
    });
});

//Pendaftaran Dokter
export const post = ("/", (request, response) => {

    const newDoctor = request.body;
    response.json({
        message: "Data has been registered", data: newDoctor
    });
});


