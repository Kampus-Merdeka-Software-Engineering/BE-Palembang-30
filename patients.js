import express from 'express'

//Daftar Semua Pasien
export const get = ("/:No", (request, response) => {

    const { No } = request.params;
    const { Name } = request.query;
    const { Age, Gender, Diagnosis} = request.body;
        
    response.json({
        No,
        Name,
        Age,
        Gender,
        Diagnosis,
    });
});

//Pendaftaran Pasien
export const post = ("/", (request, response) => {

    const newPatients = request.body;
    response.json({
        message: "Data has been registered", data: newPatients
    });
});


