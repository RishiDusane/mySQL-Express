const db = require('../utils/db-connection');


const addEntries = (req, res) => {
    const { name, email } = req.body;
    const insertQuery = `INSERT INTO Students (name, email) VALUES (?, ?)`;

    console.log("Inserting student into database");
    db.execute(insertQuery, [name, email], (err, result) => {
        if (err) {
            console.log("Error in inserting data:", err.message);
            res.status(500).send("Error in inserting data");
            return;
        }
        console.log(`Student inserted successfully with id ${result.insertId}`);
        res.status(201).json({
            id: result.insertId,
            message: `Student with name ${name} successfully added.`
        });
    });
};

const updateEntries = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const updates = [];
    const values = [];

    if (name !== undefined) {
        updates.push("name = ?");
        values.push(name);
    }
    if (email !== undefined) {
        updates.push("email = ?");
        values.push(email);
    }
    if (updates.length === 0) {
        res.status(400).send("Provide a name or email to update.");
        return;
    }

    values.push(id);
    const updateQuery = `UPDATE Students SET ${updates.join(", ")} WHERE id = ?`;

    console.log(`Updating student with id ${id}`);
    db.execute(updateQuery, values, (err, result) => {
        if (err) {
            console.log("Error in updating data:", err.message);
            res.status(500).send("Error in updating data");
            return;
        }
        if (result.affectedRows === 0) {
            // A matching row with unchanged values may also report zero affected rows.
            db.execute("SELECT id FROM Students WHERE id = ?", [id], (selectErr, rows) => {
                if (selectErr) {
                    console.log("Error checking student after update:", selectErr.message);
                    res.status(500).send("Error in updating data");
                    return;
                }
                if (rows.length === 0) {
                    res.status(404).send(`Student with id ${id} not found.`);
                    return;
                }
                console.log(`Student with id ${id} updated successfully`);
                res.status(200).send(`Student with id ${id} successfully updated.`);
            });
            return;
        }
        console.log(`Student with id ${id} updated successfully`);
        res.status(200).send(`Student with id ${id} successfully updated.`);
    });
};

const getEntries = (req, res) => {
    const selectQuery = `SELECT * FROM Students`;

    db.execute(selectQuery, (err, result) => {
        if (err) {
            console.log("Error in retrieving data:", err.message);
            res.status(500).send("Error in retrieving data");
            return;
        }
        res.status(200).json(result);
    });
};

const getEntryById = (req, res) => {
    const { id } = req.params;
    const selectQuery = `SELECT * FROM Students WHERE id = ?`;

    db.execute(selectQuery, [id], (err, result) => {
        if (err) {
            console.log("Error in retrieving data:", err.message);
            res.status(500).send("Error in retrieving data");
            return;
        }
        if (result.length === 0) {
            res.status(404).send(`Student with id ${id} not found.`);
            return;
        }
        res.status(200).json(result[0]);
    });
};

const deleteEntries = (req, res) => {
    const { id } = req.params;
    const deleteQuery = `DELETE FROM Students WHERE id = ?`;

    console.log(`Deleting student with id ${id}`);
    db.execute(deleteQuery, [id], (err, result) => {
        if (err) {
            console.log("Error in deleting data:", err.message);
            res.status(500).send("Error in deleting data");
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send(`Student with id ${id} not found.`);
            return;
        }
        console.log(`Student with id ${id} deleted successfully`);
        res.status(200).send(`Student with id ${id} successfully deleted.`);
    });
};

module.exports = {
    addEntries,
    updateEntries,
    getEntries,
    getEntryById,
    deleteEntries
};