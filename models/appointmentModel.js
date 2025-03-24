const db = require('../config/db');

const appointment = {
  create: async (data) => {
    const sql = 'INSERT INTO appointment (userId, userName, fees, status, treatmentId, timing, email, phone, date, message,  created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';
    try {
      const [results] = await db.execute(sql, [data.userId,data.userName,data.fees,data.status,data.treatmentId,data.timing,data.email,data.phone,data.date,data.message,]);
      
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
      const [results] = await db.execute(`
        SELECT 
          a.*, 
          t.name AS treatmentName
        FROM 
          appointment a
        LEFT JOIN 
          treatments t ON a.treatmentId = t.id
        ORDER BY 
          a.created_at DESC
      `);
  
      let dataJSON = {
        status: 'success',
        data: results
      };
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },  

  getAllByPage: async (limit, pageNo, searchtxt) => {
    try {
      const offset = (pageNo - 1) * limit;
  
      let query = `
        SELECT 
          a.*, 
          t.name AS treatmentName
        FROM 
          appointment a
        LEFT JOIN 
          treatments t ON a.treatmentId = t.id
      `;
      let queryParams = [];
  
      if (searchtxt) {
        const columns = ['a.userName']; // Make sure the columns are from the 'appointment' table
        const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
        query += ` WHERE ${searchConditions}`;
        queryParams = columns.map(() => `%${searchtxt}%`);
      }
  
      query += ' ORDER BY a.created_at DESC LIMIT ? OFFSET ?';
      queryParams.push(limit, offset);
  
      const [results] = await db.execute(query, queryParams);
  
      const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM appointment');
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
  
  getPendingByPage: async (limit, pageNo, searchtxt) => {
    try {
      const offset = (pageNo - 1) * limit;
  
      let query = `
        SELECT 
          a.*, 
          t.name AS treatmentName
        FROM 
          appointment a
        LEFT JOIN 
          treatments t ON a.treatmentId = t.id
      `;
      let queryParams = [];
  
      if (searchtxt) {
        const columns = ['a.userName']; // Make sure the columns are from the 'appointment' table
        const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
        query += ` WHERE ${searchConditions}`;
        queryParams = columns.map(() => `%${searchtxt}%`);
      }
  
      // Add the condition for status = 1
      if (searchtxt) {
        query += ' AND a.status = 1';
      } else {
        query += ' WHERE a.status = 1';
      }
  
      query += ' ORDER BY a.created_at DESC LIMIT ? OFFSET ?';
      queryParams.push(limit, offset);
  
      const [results] = await db.execute(query, queryParams);
  
      const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM appointment WHERE status = 2');
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
  
  getCompletedByPage: async (limit, pageNo, searchtxt) => {
    try {
      const offset = (pageNo - 1) * limit;
  
      let query = `
        SELECT 
          a.*, 
          t.name AS treatmentName
        FROM 
          appointment a
        LEFT JOIN 
          treatments t ON a.treatmentId = t.id
      `;
      let queryParams = [];
  
      if (searchtxt) {
        const columns = ['a.userName']; // Make sure the columns are from the 'appointment' table
        const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
        query += ` WHERE ${searchConditions}`;
        queryParams = columns.map(() => `%${searchtxt}%`);
      }
  
      // Add the condition for status = 2
      if (searchtxt) {
        query += ' AND a.status = 2';
      } else {
        query += ' WHERE a.status = 2';
      }
  
      query += ' ORDER BY a.created_at DESC LIMIT ? OFFSET ?';
      queryParams.push(limit, offset);
  
      const [results] = await db.execute(query, queryParams);
  
      const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM appointment WHERE status = 2');
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

  getById: async (id) => {
    try {
      const [results] = await db.execute('SELECT * FROM appointment WHERE id = ?', [id]);
      
      let dataJSON = {
        status: 'success',
        data: results
    }
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },

  getByUserId: async (id) => {
    try {
      const query = `
        SELECT 
          a.*, 
          t.name AS treatmentName
        FROM 
          appointment a
        LEFT JOIN 
          treatments t ON a.treatmentId = t.id
        WHERE 
          a.userId = ?
      `;
      
      const [results] = await db.execute(query, [id]);
  
      let dataJSON = {
        status: 'success',
        data: results
      };
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },  

  getByDate: async (date) => {
    try {
        const query = `
          SELECT 
            a.*, 
            t.name AS treatmentName
          FROM 
            appointment a
          LEFT JOIN 
            treatments t ON a.treatmentId = t.id
          WHERE 
            a.date = ?
        `;
      const [results] = await db.execute(query, [date]);
      
      let dataJSON = {
        status: 'success',
        data: results
    }
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },

  getByTreatment: async (treatmentId) => {
    try {
        const query = `
          SELECT 
            a.*, 
            t.name AS treatmentName
          FROM 
            appointment a
          LEFT JOIN 
            treatments t ON a.treatmentId = t.id
          WHERE 
            a.treatmentId = ?
        `;
      const [results] = await db.execute(query, [treatmentId]);
      
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
    const sql = 'UPDATE appointment SET userId = ?, userName = ?, fees = ?, status = ?, treatmentId = ?, timing = ?, email = ?, phone = ?, date = ?, message = ?, updated_at = NOW() WHERE id = ?';
    try {
      const [results] = await db.execute(sql, [data.userId, data.userName, data.fees, data.status, data.treatmentId, data.timing, data.email, data.phone, data.date, data.message, id]);
      
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
      const [results] = await db.execute('DELETE FROM appointment WHERE id = ?', [id]);
      
      return results;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = appointment;