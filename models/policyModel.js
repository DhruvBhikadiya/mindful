
const db = require('../config/db');

const policy = {
    create: async (data) => {
        const sql = 'INSERT INTO policy (privacypolicy, termscondition, created_at, updated_at) VALUES (?, ?, NOW(), NOW())';
        try {
            const [results] = await db.execute(sql, [data.privacypolicy, data.termscondition]);

            let dataJSON = {
                status: 'success',
                data: results
            }

            return dataJSON;
        } catch (err) {
            throw err;
        }
    },

    getAll: async () => {
        try {
            const [results] = await db.execute(`SELECT * FROM policy`);

            let dataJSON = {
                status: 'success',
                data: results
            };

            return dataJSON;
        } catch (err) {
            throw err;
        }
    },
    update: async (id, data) => {
        const sqlUpdate = 'UPDATE policy SET privacypolicy = ?, termscondition = ?, updated_at = NOW() WHERE id = ?';
        try {
            const [results] = await db.execute(sqlUpdate, [data.privacypolicy, data.termscondition, id]);
            
            let dataJSON = {
                status: 'success',
                data: results
            }
    
            return dataJSON;
        } catch (err) {
            throw err;
        }
    },

    delete: async (id) => {
        try {
            const [results] = await db.execute('DELETE FROM policy WHERE id = ?', [id]);
            return results;
        } catch (err) {
            throw err;
        }
    },  
};

module.exports = policy;