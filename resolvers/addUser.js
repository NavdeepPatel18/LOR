const { getDBInstance } = require("./operations");
const { createHash } = require("crypto");
const db = getDBInstance();

const generateHash = (text) => {
  const hash = createHash("sha512");
  return hash.update(text, "utf-8").digest("hex");
};

exports.addUser = async (userInfo) => {
  return new Promise((resolve, reject) => {
    db.execute(
      `INSERT INTO user(charusat_id, user_type, first_name, last_name, counsellor, hod, institute, department, mobile, email, password) 
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userInfo.charusat_id || null,
        userInfo.user_type || null,
        userInfo.first_name || null,
        userInfo.last_name || null,
        userInfo.counsellor || null,
        userInfo.hod || null,
        userInfo.institute || null,
        userInfo.department || null,
        userInfo.mobile || null,
        userInfo.email || null,
        generateHash(userInfo.password) || null,
      ],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result.length !== 0) {
            resolve("New User Added");
          } else {
            reject(new Error("Error! Can't add the user"));
          }
        }
      }
    );
  });
};
