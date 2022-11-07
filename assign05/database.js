const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    user: 'kwebyoung',
    password: '02193437',
    database: 'kweb_db',
});

const runQuery = async sql =>{
    const conn = await pool.getConnection();
    try{
        const [result] = await conn.query(sql);
        return result;
    } finally{
        conn.release();
    }
};

module.exports = {runQuery};