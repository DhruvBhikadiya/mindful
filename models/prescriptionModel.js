const db = require('../config/db');

const prescription = {
  create: async (data) => {
    const sql = 'INSERT INTO prescription (appointmentId, title, detail, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())';
    try {
      const [results] = await db.execute(sql, [data.appointmentId, data.title, data.detail]);
      
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
      const [results] = await db.execute('SELECT * FROM prescription ORDER BY created_at DESC');
      
      let dataJSON = {
        status: 'success',
        data: results
    }
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },

  getAllByPage: async (limit, pageNo, searchtxt) => {
    try {
      const offset = (pageNo - 1) * limit;
  
      let query = 'SELECT * FROM prescription';
      let queryParams = [];
  
      if (searchtxt) {
        const columns = ['name', 'email', 'phone', 'message'];
        const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
        query += ` WHERE ${searchConditions}`;
        queryParams = columns.map(() => `%${searchtxt}%`);
      }
  
      query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
      queryParams.push(limit, offset);
  
      const [results] = await db.execute(query, queryParams);
  
      const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM prescription');
      const totalCount = totalCountResults[0].totalCount;
  
      return {
        status: 'success',
        data: results,
        totalCount: totalCount
      };
    } catch (err) {
      throw err;
    }
  },
  
  getByappointmentId: async (id) => {
    try {
      const [results] = await db.execute('SELECT * FROM prescription WHERE appointmentId = ?', [id]);
      
      let dataJSON = {
        status: 'success',
        data: results
    }
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },

  update: async (id, data) => {
    const sql = 'UPDATE prescription SET appointmentId = ?, title = ?, detail = ?, updated_at = NOW() WHERE id = ?';
    try {
      const [results] = await db.execute(sql, [data.appointmentId, data.title, data.detail, id]);
      
      let dataJson = {
        status: 'success',
        data: results
    }
      return dataJson;
    } catch (err) {
      throw err;
    }
  },

  delete: async (id) => {
    try {
      const [results] = await db.execute('DELETE FROM prescription WHERE id = ?', [id]);
      
      return results;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = prescription;