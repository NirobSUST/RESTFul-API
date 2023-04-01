const Contact = require('../models/Contact')

const getAllContactController = (req, res, next) => {
    Contact.find()
        .then(contacts => {
            res.status(200).json({
                message: "All contacts",
                contacts
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error Occured',
                error: err
            })
        })
}

const postNewContactController = (req, res, next) => {
    const contact = new Contact({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    })

    contact.save()
        .then(data => {
            res.status(201).json({
                message: 'Contact Added',
                contact: data
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error Occured',
                error: err
            })
        })
}

const getSingleContactController = (req, res, next) => {
    let id = req.params.id

    Contact.findById(id)
        .then(contact => {
            res.status(200).json({
                contact
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error Occured',
                error: err
            })
        })
}

const editContactController = (req, res, next) => {
    let id = req.params.id

    let updatedContact = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    }

    Contact.findByIdAndUpdate(id, { $set: updatedContact })
        .then(contact => {
            Contact.findById(contact.__id)
                .then(newContact => {
                    res.json({
                        message: "Updated Successfully",
                        contact
                    })
                })

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error Occured',
                error: err
            })
        })
}

const deleteContactController = (req, res, next) => {
    let id = req.params.id

    Contact.findByIdAndRemove(id)
        .then(result => {
            res.json({
                message: 'Contact deleted',
                result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error Occured',
                error: err
            })
        })
}
module.exports = {
    getAllContactController,
    postNewContactController,
    getSingleContactController,
    deleteContactController,
    editContactController
}